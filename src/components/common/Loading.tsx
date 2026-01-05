import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';

interface LoadingProps {
    message?: string;
    size?: 'small' | 'large';
    style?: ViewStyle;
}

export const Loading: React.FC<LoadingProps> = ({
    message,
    size = 'large',
    style,
}) => {
    return (
        <View style={[styles.container, style]}>
            <ActivityIndicator size={size} color={Colors.primary} />
            {message && <Text style={styles.message}>{message}</Text>}
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
    message: {
        marginTop: 12,
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'center',
    },
});
