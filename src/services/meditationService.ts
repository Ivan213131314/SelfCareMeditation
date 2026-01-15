/**
 * Сервис для управления медитативными сессиями
 * Отвечает за загрузку практик, управление аудио-плеером и синхронизацию с Redux
 */

import { Audio, AVPlaybackStatus } from 'expo-av';
import { store } from '@/store';
import { setSession, updateProgress, setPlaying, clearSession } from '@/store/slices/sessionSlice';
import { catalogService } from './catalogService';
import { DEFAULT_PRACTICE, SILENT_PRACTICE, getDefaultPracticeAudio } from '@/constants/defaultPractice';
import type { Practice } from '@/types/models';
import type { DefaultPracticeConfig } from '@/constants/defaultPractice';

class MeditationService {
    private sound: Audio.Sound | null = null;
    private progressInterval: NodeJS.Timeout | null = null;
    private isStarting: boolean = false;

    /**
     * Запуск сессии медитации
     * @param practiceId - ID практики из каталога (если null - загружается дефолтная)
     */
    async startSession(practiceId: string | null = null): Promise<void> {
        // Защита от параллельных вызовов
        if (this.isStarting) {
            console.log('[MeditationService] Session start already in progress, skipping');
            return;
        }

        this.isStarting = true;

        try {
            console.log('[MeditationService] Starting session with practiceId:', practiceId);

            // Принудительно очищаем предыдущий таймер
            if (this.progressInterval) {
                clearInterval(this.progressInterval);
                this.progressInterval = null;
            }

            // Сбрасываем счётчик прогресса для аудио
            this.lastProgressSecond = -1;

            // Останавливаем предыдущую сессию, если есть
            await this.endSession();

            let practice: Practice | DefaultPracticeConfig;
            let audioSource: string | number | null = null;

            // Загружаем практику
            if (practiceId) {
                // Загрузка из Supabase
                console.log('[MeditationService] Fetching practice from catalog...');
                const catalogPractice = await catalogService.getPracticeById(practiceId);
                if (!catalogPractice) {
                    throw new Error('Practice not found');
                }
                practice = catalogPractice;
                audioSource = catalogPractice.audio_url;
                console.log('[MeditationService] Practice loaded:', {
                    title: catalogPractice.title,
                    duration: catalogPractice.duration,
                    audio_url: catalogPractice.audio_url
                });
            } else {
                // Загрузка дефолтной практики
                console.log('[MeditationService] Loading default practice');
                audioSource = getDefaultPracticeAudio();
                practice = audioSource ? DEFAULT_PRACTICE : SILENT_PRACTICE;
            }

            // Инициализируем состояние в Redux
            // Practice имеет duration в минутах, DefaultPracticeConfig — в секундах
            // Проверяем наличие audio_url для определения типа (есть только в Practice)
            const durationInSeconds = 'audio_url' in practice
                ? practice.duration * 60  // Practice: конвертируем минуты в секунды
                : practice.duration;       // DefaultPracticeConfig: уже в секундах

            console.log('[MeditationService] Session config:', {
                practiceTitle: practice.title,
                durationInSeconds,
                hasAudio: !!audioSource
            });

            store.dispatch(setSession({
                practice,
                duration: durationInSeconds,
            }));

            // Загружаем и воспроизводим аудио (если есть)
            if (audioSource) {
                console.log('[MeditationService] Loading audio from:', audioSource);
                await this.loadAndPlayAudio(audioSource, durationInSeconds);
            } else {
                // Запускаем таймер тишины
                console.log('[MeditationService] No audio, starting silent timer');
                this.startSilentTimer(durationInSeconds);
            }
        } catch (error) {
            console.error('Failed to start session:', error);
            throw error;
        } finally {
            this.isStarting = false;
        }
    }

    /**
     * Загрузка и воспроизведение аудио
     */
    private async loadAndPlayAudio(audioSource: string | number, duration: number): Promise<void> {
        try {
            // Очистка предыдущего звука перед загрузкой нового
            if (this.sound) {
                try {
                    await this.sound.stopAsync();
                    await this.sound.unloadAsync();
                } catch (e) {
                    // Игнорируем ошибки очистки
                }
                this.sound = null;
            }

            // Настройка аудио режима
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
            });

            // Создаем Sound объект
            const { sound } = typeof audioSource === 'string'
                ? await Audio.Sound.createAsync({ uri: audioSource })
                : await Audio.Sound.createAsync(audioSource);

            this.sound = sound;

            // Подписка на обновления статуса воспроизведения
            this.sound.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate.bind(this));

            // Запускаем воспроизведение
            await this.sound.playAsync();
            store.dispatch(setPlaying(true));
        } catch (error) {
            console.error('Failed to load audio:', error);
            // Очищаем sound при ошибке
            this.sound = null;
            // Если не удалось загрузить аудио, запускаем таймер тишины
            this.startSilentTimer(duration);
        }
    }

    /**
     * Обработчик обновления статуса воспроизведения
     */
    private lastProgressSecond: number = -1;

    private onPlaybackStatusUpdate(status: AVPlaybackStatus): void {
        if (!status.isLoaded) return;

        // Обновляем прогресс в Redux только при изменении секунды
        const progressInSeconds = Math.floor(status.positionMillis / 1000);
        if (progressInSeconds !== this.lastProgressSecond) {
            this.lastProgressSecond = progressInSeconds;
            store.dispatch(updateProgress(progressInSeconds));
        }

        // Автоматическая остановка при завершении
        if (status.didJustFinish) {
            this.endSession();
        }
    }

    /**
     * Таймер для медитации без аудио
     */
    private startSilentTimer(duration: number): void {
        // Очищаем предыдущий таймер, если есть
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }

        let elapsed = 0;

        this.progressInterval = setInterval(() => {
            elapsed += 1;
            store.dispatch(updateProgress(elapsed));

            if (elapsed >= duration) {
                this.endSession();
            }
        }, 1000);

        // Отмечаем как "играет"
        store.dispatch(setPlaying(true));
    }

    /**
     * Пауза сессии
     */
    async pauseSession(): Promise<void> {
        try {
            // Останавливаем аудио, если есть
            if (this.sound) {
                await this.sound.pauseAsync();
            }

            // Останавливаем таймер тишины, если есть
            if (this.progressInterval) {
                clearInterval(this.progressInterval);
                this.progressInterval = null;
            }

            store.dispatch(setPlaying(false));
        } catch (error) {
            console.error('Failed to pause session:', error);
        }
    }

    /**
     * Возобновление сессии
     */
    async resumeSession(): Promise<void> {
        try {
            const state = store.getState().session;

            if (this.sound) {
                await this.sound.playAsync();
                store.dispatch(setPlaying(true));
            } else if (!this.progressInterval && state.currentPractice) {
                // Возобновляем таймер тишины
                const remainingTime = state.duration - state.progress;
                let elapsed = state.progress;

                this.progressInterval = setInterval(() => {
                    elapsed += 1;
                    store.dispatch(updateProgress(elapsed));

                    if (elapsed >= state.duration) {
                        this.endSession();
                    }
                }, 1000);

                store.dispatch(setPlaying(true));
            }
        } catch (error) {
            console.error('Failed to resume session:', error);
        }
    }

    /**
     * Завершение сессии
     */
    async endSession(): Promise<void> {
        try {
            // Останавливаем аудио
            if (this.sound) {
                await this.sound.stopAsync();
                await this.sound.unloadAsync();
                this.sound = null;
            }

            // Останавливаем таймер
            if (this.progressInterval) {
                clearInterval(this.progressInterval);
                this.progressInterval = null;
            }

            // Очищаем состояние Redux
            store.dispatch(clearSession());
        } catch (error) {
            console.error('Failed to end session:', error);
        }
    }

    /**
     * Получение текущего прогресса сессии
     */
    getSessionProgress(): number {
        return store.getState().session.progress;
    }

    /**
     * Переключение play/pause
     */
    async togglePlayPause(): Promise<void> {
        const isPlaying = store.getState().session.isPlaying;
        if (isPlaying) {
            await this.pauseSession();
        } else {
            await this.resumeSession();
        }
    }
}

export const meditationService = new MeditationService();
