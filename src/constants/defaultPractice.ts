/**
 * Метаданные локальной дефолтной практики
 * Используется когда пользователь не выбрал практику из каталога
 */

export interface DefaultPracticeConfig {
    id: string;
    title: string;
    description: string;
    duration: number; // в секундах
}

export interface DefaultPracticeWithAudio extends DefaultPracticeConfig {
    audioSource: number; // require() возвращает number для локальных ресурсов
}

/**
 * Дефолтная практика с аудио
 * Примечание: аудиофайл должен существовать в assets/default-practice/default.mp3
 */
export const DEFAULT_PRACTICE: DefaultPracticeConfig = {
    id: 'default-practice',
    title: 'Спокойствие дыхания',
    description: 'Базовая практика осознанного дыхания для снятия напряжения',
    duration: 300, // 5 минут
};

/**
 * Резервная практика без аудио (для случаев когда аудиофайл отсутствует)
 * Используется с таймером тишины
 */
export const SILENT_PRACTICE: DefaultPracticeConfig = {
    id: 'silent-practice',
    title: 'Тихая медитация',
    description: 'Практика в тишине — сосредоточьтесь на дыхании',
    duration: 300, // 5 минут
};

/**
 * Функция для получения аудио-источника дефолтной практики
 * Возвращает null если файл не существует
 */
export function getDefaultPracticeAudio(): number | null {
    try {
        // Примечание: require должен быть статическим
        // Когда аудиофайл будет добавлен, раскомментировать:
        return require('../../assets/default-practice/default.mp3');
        // return null;
    } catch {
        return null;
    }
}
