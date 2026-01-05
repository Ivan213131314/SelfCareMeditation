import React from 'react';
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    TextInputProps,
} from 'react-native';
import { Colors } from '@/constants/colors';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    containerStyle,
    inputStyle,
    ...textInputProps
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[
                    styles.input,
                    !!error && styles.inputError,
                    inputStyle,
                ]}
                placeholderTextColor={Colors.textSecondary}
                {...textInputProps}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.text,
        marginBottom: 8,
    },
    input: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        color: Colors.text,
    },
    inputError: {
        borderColor: Colors.error,
    },
    errorText: {
        fontSize: 12,
        color: Colors.error,
        marginTop: 4,
    },
});
