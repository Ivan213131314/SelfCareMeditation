import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '@/constants/colors';

interface SessionTimerProps {
    remainingSeconds: number;
}

/**
 * Компонент таймера сессии медитации
 * Отображает оставшееся время в формате MM:SS
 */
export default function SessionTimer({ remainingSeconds }: SessionTimerProps) {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return (
        <>
            <Text style={styles.timer}>{timeString}</Text>
            <Text style={styles.label}>REMAINING</Text>
        </>
    );
}

const styles = StyleSheet.create({
    timer: {
        fontSize: 48,
        fontWeight: '300',
        color: colors.text.primary,
        fontVariant: ['tabular-nums'],
        letterSpacing: -1,
    },
    label: {
        fontSize: 11,
        fontWeight: '500',
        color: colors.text.tertiary,
        textTransform: 'uppercase',
        letterSpacing: 3,
        marginTop: 4,
    },
});
