import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '@/constants/colors';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style,
    textStyle,
}) => {
    const isOutline = variant === 'outline';
    const isSecondary = variant === 'secondary';

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                isOutline && styles.outlineButton,
                isSecondary && styles.secondaryButton,
                disabled && styles.disabledButton,
                style,
            ]}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={isOutline ? Colors.primary : Colors.white} />
            ) : (
                <Text
                    style={[
                        styles.text,
                        isOutline && styles.outlineText,
                        textStyle,
                    ]}
                >
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 16, // Slightly taller
        paddingHorizontal: 32,
        borderRadius: 9999, // Pill shape
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 120,
        // Default shadow for depth
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    secondaryButton: {
        backgroundColor: Colors.primaryLight,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    disabledButton: {
        opacity: 0.5,
    },
    text: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    outlineText: {
        color: Colors.primary,
    },
});
