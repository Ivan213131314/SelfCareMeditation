import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ImageBackground, ImageSourcePropType } from 'react-native';
import colors from '@/constants/colors';

interface ProgressRingProps {
    progress: number; // от 0 до 1
    size?: number;
    strokeWidth?: number;
    backgroundImage?: ImageSourcePropType | null;
    children?: React.ReactNode;
}

/**
 * Круговой прогресс-бар для медитации
 * Реализован через View и анимации (без SVG)
 */
export default function ProgressRing({
    progress,
    size = 256,
    strokeWidth = 4,
    backgroundImage,
    children
}: ProgressRingProps) {
    const animatedProgress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedProgress, {
            toValue: progress,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [progress]);

    // Вычисляем угол для градиента
    const rotation = animatedProgress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            {/* Фоновое кольцо */}
            <View
                style={[
                    styles.ring,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        borderWidth: strokeWidth,
                    }
                ]}
            />

            {/* Прогресс (упрощенная визуализация через overlay) */}
            <Animated.View
                style={[
                    styles.progressOverlay,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        transform: [{ rotate: rotation }],
                        opacity: animatedProgress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.2, 1],
                        }),
                    },
                ]}
            />

            {/* Центральное содержимое */}
            {backgroundImage ? (
                <ImageBackground
                    source={backgroundImage}
                    style={[styles.content, { width: size - strokeWidth * 4, height: size - strokeWidth * 4 }]}
                    imageStyle={styles.contentImage}
                    resizeMode="cover"
                >
                    <View style={styles.contentOverlay}>
                        {children}
                    </View>
                </ImageBackground>
            ) : (
                <View style={[styles.content, { width: size - strokeWidth * 4, height: size - strokeWidth * 4 }]}>
                    {children}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    ring: {
        position: 'absolute',
        borderColor: colors.primary + '10', // 10% opacity
    },
    progressOverlay: {
        position: 'absolute',
        borderWidth: 0,
        backgroundColor: 'transparent',
        borderColor: colors.primary,
        // Примечание: это упрощенная визуализация
        // Для полноценного кольца нужен SVG или react-native-svg
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999,
        backgroundColor: colors.background.elevated,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.05,
        shadowRadius: 40,
        elevation: 8,
        overflow: 'hidden',
    },
    contentImage: {
        borderRadius: 999,
    },
    contentOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: '100%',
        height: '100%',
    },
});
