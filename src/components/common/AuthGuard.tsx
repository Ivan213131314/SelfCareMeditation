import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { router, useSegments, useRootNavigationState } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { Colors } from '@/constants/colors';

interface AuthGuardProps {
    children: React.ReactNode;
}

/**
 * Компонент защиты маршрутов
 * Редиректит неавторизованных пользователей на экран входа
 * и авторизованных из auth-экранов в приложение
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const segments = useSegments();
    const navigationState = useRootNavigationState();
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        // Ждём пока навигация будет готова
        if (!navigationState?.key) return;

        // Не выполняем редирект пока идёт загрузка или навигация
        if (isLoading || isNavigating) return;

        const inAuthGroup = segments[0] === 'auth';

        if (!isAuthenticated && !inAuthGroup) {
            // Пользователь не авторизован и не на auth-экране — редиректим на login
            setIsNavigating(true);
            router.replace('/auth/login');
            setTimeout(() => setIsNavigating(false), 100);
        } else if (isAuthenticated && inAuthGroup) {
            // Пользователь авторизован, но на auth-экране — редиректим в приложение
            setIsNavigating(true);
            router.replace('/(tabs)/catalog');
            setTimeout(() => setIsNavigating(false), 100);
        }
    }, [isAuthenticated, segments, navigationState?.key, isLoading, isNavigating]);

    // Показываем загрузку пока проверяем состояние авторизации
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return <>{children}</>;
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
});
