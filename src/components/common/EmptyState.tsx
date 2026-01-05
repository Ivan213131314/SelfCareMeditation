import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';
import { Button } from './Button';

interface EmptyStateProps {
    title?: string;
    message?: string;
    emoji?: string;
    actionLabel?: string;
    onAction?: () => void;
    style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title = 'Пусто',
    message,
    emoji = '🌿',
    actionLabel,
    onAction,
    style,
}) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.emoji}>{emoji}</Text>
            <Text style={styles.title}>{title}</Text>
            {message && <Text style={styles.message}>{message}</Text>}
            {actionLabel && onAction && (
                <Button
                    title={actionLabel}
                    onPress={onAction}
                    style={styles.button}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    emoji: {
        fontSize: 64,
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
        textAlign: 'center',
        marginBottom: 8,
    },
    message: {
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: 24,
    },
    button: {
        minWidth: 180,
    },
});
