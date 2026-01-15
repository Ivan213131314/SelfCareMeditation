import React from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '@/constants/colors';

interface PlayPauseButtonProps {
    isPlaying: boolean;
    onPress: () => void;
}

/**
 * Кнопка воспроизведения/паузы медитации
 * Переключается между иконками play и pause
 */
export default function PlayPauseButton({ isPlaying, onPress }: PlayPauseButtonProps) {
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        // Анимация нажатия
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

        onPress();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                style={styles.button}
                onPress={handlePress}
                activeOpacity={0.8}
            >
                <Ionicons
                    name={isPlaying ? 'pause' : 'play'}
                    size={32}
                    color={colors.text.primary}
                />
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.background.elevated,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
});
