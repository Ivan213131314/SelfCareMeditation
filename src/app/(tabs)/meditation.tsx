import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';

import { meditationService } from '@/services/meditationService';
import {
    selectCurrentPractice,
    selectIsPlaying,
    selectSessionProgress,
    selectSessionDuration
} from '@/store/slices/sessionSlice';

import ProgressRing from '@/components/meditation/ProgressRing';
import SessionTimer from '@/components/meditation/SessionTimer';
import PlayPauseButton from '@/components/meditation/PlayPauseButton';
import colors from '@/constants/colors';

const { width } = Dimensions.get('window');

export default function MeditationScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const currentPractice = useSelector(selectCurrentPractice);
    const isPlaying = useSelector(selectIsPlaying);
    const progress = useSelector(selectSessionProgress);
    const duration = useSelector(selectSessionDuration);

    // Запуск сессии при монтировании или изменении practiceId
    useEffect(() => {
        const practiceId = params.practiceId as string | undefined;
        console.log('[MeditationScreen] useEffect triggered, practiceId:', practiceId);

        // Запускаем сессию с выбранной практикой или дефолтной
        meditationService.startSession(practiceId || null);

        // Cleanup при размонтировании
        return () => {
            // Не останавливаем сессию при переключении вкладок
            // meditationService.endSession();
        };
    }, [params.practiceId]);

    const handlePlayPause = async () => {
        await meditationService.togglePlayPause();
    };

    const handleClose = async () => {
        await meditationService.endSession();
        router.back();
    };

    const handleShareFeelings = () => {
        router.push({
            pathname: '/(tabs)/journal',
            params: { practiceId: currentPractice?.id || 'default' },
        });
    };

    const remainingSeconds = duration - progress;
    const progressPercent = duration > 0 ? progress / duration : 0;

    // Получаем название практики
    const practiceTitle = currentPractice?.title || 'Медитация';

    // Получаем фоновое изображение практики (только для Practice, не для DefaultPracticeConfig)
    const backgroundImage = currentPractice && 'image_url' in currentPractice && currentPractice.image_url
        ? { uri: currentPractice.image_url }
        : null;

    return (
        <View style={styles.container}>
            {/* Фоновый blur эффект */}
            <View style={styles.blurBackground} />

            {/* Прогресс-бар вверху */}
            <View style={styles.progressBarContainer}>
                <View style={styles.progressBarTrack}>
                    <View
                        style={[
                            styles.progressBarFill,
                            { width: `${progressPercent * 100}%` }
                        ]}
                    />
                </View>
            </View>

            {/* Кнопка закрытия */}
            <View style={styles.header}>
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleClose}
                >
                    <MaterialIcons name="close" size={24} color={colors.text.secondary} />
                </TouchableOpacity>
            </View>

            {/* Центральная часть с прогресс-кольцом */}
            <View style={styles.centerContent}>
                <ProgressRing progress={progressPercent} size={256} backgroundImage={backgroundImage}>
                    <View style={styles.progressContent}>
                        <MaterialIcons
                            name="air"
                            size={32}
                            color={colors.primary + 'CC'}
                        />
                        <Text
                            style={styles.practiceTitle}
                            numberOfLines={2}
                            adjustsFontSizeToFit
                        >
                            {practiceTitle.toUpperCase()}
                        </Text>
                    </View>
                </ProgressRing>

                {/* Таймер */}
                <View style={styles.timerContainer}>
                    <SessionTimer remainingSeconds={remainingSeconds} />
                </View>
            </View>

            {/* Нижняя панель */}
            <View style={styles.bottomPanel}>
                {/* Кнопка Play/Pause */}
                <View style={styles.playButtonContainer}>
                    <PlayPauseButton
                        isPlaying={isPlaying}
                        onPress={handlePlayPause}
                    />
                </View>

                {/* Кнопка "Share how you feel" */}
                <TouchableOpacity
                    style={styles.shareButton}
                    onPress={handleShareFeelings}
                >
                    <MaterialIcons name="mood" size={20} color="#0a2e1e" />
                    <Text style={styles.shareButtonText}>Share how you feel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.default,
    },
    blurBackground: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        width: 500,
        height: 500,
        marginLeft: -250,
        marginTop: -250,
        backgroundColor: colors.primary + '0D', // 5% opacity
        borderRadius: 250,
        opacity: 0.6,
    },
    progressBarContainer: {
        paddingHorizontal: 24,
        paddingTop: 8,
    },
    progressBarTrack: {
        height: 4,
        backgroundColor: colors.border,
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 80,
    },
    progressContent: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        maxWidth: '100%',
    },
    practiceTitle: {
        fontSize: 18,
        fontWeight: '300',
        color: colors.text.primary,
        letterSpacing: 2,
        marginTop: 8,
        textAlign: 'center',
        maxWidth: 180,
    },
    timerContainer: {
        marginTop: 48,
        alignItems: 'center',
    },
    bottomPanel: {
        paddingHorizontal: 24,
        paddingBottom: 48,
        gap: 16,
    },
    playButtonContainer: {
        alignItems: 'center',
        marginBottom: 8,
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        backgroundColor: colors.primary,
        height: 56,
        borderRadius: 12,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
    shareButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0a2e1e',
    },
});
