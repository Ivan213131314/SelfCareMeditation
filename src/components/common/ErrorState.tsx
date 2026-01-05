import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';
import { Button } from './Button';

interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
    style?: ViewStyle;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
    message = 'Произошла ошибка',
    onRetry,
    style,
}) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.emoji}>😔</Text>
            <Text style={styles.message}>{message}</Text>
            {onRetry && (
                <Button
                    title="Попробовать снова"
                    onPress={onRetry}
                    variant="outline"
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
        fontSize: 48,
        marginBottom: 16,
    },
    message: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: 24,
    },
    button: {
        minWidth: 180,
    },
});
