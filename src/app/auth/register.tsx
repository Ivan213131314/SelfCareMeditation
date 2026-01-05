import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const { signUp, isLoading, error, clearError } = useAuth();

    const validateEmail = (value: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            setEmailError('Введите email');
            return false;
        }
        if (!emailRegex.test(value)) {
            setEmailError('Неверный формат email');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePassword = (value: string): boolean => {
        if (!value) {
            setPasswordError('Введите пароль');
            return false;
        }
        if (value.length < 6) {
            setPasswordError('Пароль должен быть не менее 6 символов');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const validateConfirmPassword = (value: string): boolean => {
        if (!value) {
            setConfirmPasswordError('Подтвердите пароль');
            return false;
        }
        if (value !== password) {
            setConfirmPasswordError('Пароли не совпадают');
            return false;
        }
        setConfirmPasswordError('');
        return true;
    };

    const handleRegister = async () => {
        clearError();

        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const isConfirmValid = validateConfirmPassword(confirmPassword);

        if (!isEmailValid || !isPasswordValid || !isConfirmValid) {
            return;
        }

        const success = await signUp(email, password);

        if (success) {
            router.replace('/(tabs)/catalog');
        }
    };

    const navigateToLogin = () => {
        router.back();
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* Декоративные фоновые элементы */}
            <View style={styles.backgroundDecor}>
                <View style={styles.blob1} />
                <View style={styles.blob2} />
                <View style={styles.blob3} />
            </View>

            {/* Кнопка назад */}
            <TouchableOpacity style={styles.backButton} onPress={navigateToLogin}>
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Лого */}
                <View style={styles.logoContainer}>
                    <View style={styles.logoBox}>
                        <Text style={styles.logoIcon}>🧘</Text>
                    </View>
                </View>

                {/* Заголовок */}
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Найди свой покой</Text>
                    <Text style={styles.subtitle}>
                        Введите email, чтобы сохранить прогресс и персонализировать ваш путь
                    </Text>
                </View>

                {/* Форма */}
                <View style={styles.formContainer}>
                    <Input
                        label="Email"
                        placeholder="name@example.com"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            if (emailError) validateEmail(text);
                        }}
                        error={emailError}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <Input
                        label="Пароль"
                        placeholder="Минимум 6 символов"
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            if (passwordError) validatePassword(text);
                        }}
                        error={passwordError}
                        secureTextEntry
                    />

                    <Input
                        label="Подтвердите пароль"
                        placeholder="Повторите пароль"
                        value={confirmPassword}
                        onChangeText={(text) => {
                            setConfirmPassword(text);
                            if (confirmPasswordError) validateConfirmPassword(text);
                        }}
                        error={confirmPasswordError}
                        secureTextEntry
                    />

                    {error && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    <Button
                        title="Продолжить"
                        onPress={handleRegister}
                        loading={isLoading}
                        style={styles.registerButton}
                    />

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Уже есть аккаунт? </Text>
                        <TouchableOpacity onPress={navigateToLogin}>
                            <Text style={styles.loginLink}>Войти</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Мы заботимся о вашем спокойствии.{' '}
                        <Text style={styles.footerLink}>Политика конфиденциальности</Text>
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    backgroundDecor: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    blob1: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(19, 236, 128, 0.1)',
    },
    blob2: {
        position: 'absolute',
        top: '40%',
        left: -80,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: 'rgba(96, 165, 250, 0.08)',
    },
    blob3: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(19, 236, 128, 0.05)',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 16,
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 24,
        color: Colors.text,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 24,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoBox: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    logoIcon: {
        fontSize: 40,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 32,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 8,
    },
    errorContainer: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    errorText: {
        color: Colors.error,
        fontSize: 14,
        textAlign: 'center',
    },
    registerButton: {
        marginTop: 8,
        height: 56,
        borderRadius: 28,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
    loginText: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    loginLink: {
        fontSize: 14,
        color: Colors.primary,
        fontWeight: '600',
    },
    footer: {
        paddingTop: 24,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: Colors.textMuted,
        textAlign: 'center',
    },
    footerLink: {
        textDecorationLine: 'underline',
    },
});
