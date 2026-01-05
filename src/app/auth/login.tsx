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

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { signIn, isLoading, error, clearError } = useAuth();

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

    const handleLogin = async () => {
        clearError();

        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        const success = await signIn(email, password);

        if (success) {
            router.replace('/(tabs)/catalog');
        }
    };

    const navigateToRegister = () => {
        router.push('/auth/register');
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
                    <Text style={styles.title}>С возвращением</Text>
                    <Text style={styles.subtitle}>
                        Войдите, чтобы продолжить свой путь к гармонии
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
                        placeholder="Ваш пароль"
                        value={password}
                        onChangeText={(text) => {
                            setPassword(text);
                            if (passwordError) validatePassword(text);
                        }}
                        error={passwordError}
                        secureTextEntry
                    />

                    {error && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    <Button
                        title="Войти"
                        onPress={handleLogin}
                        loading={isLoading}
                        style={styles.loginButton}
                    />

                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Нет аккаунта? </Text>
                        <TouchableOpacity onPress={navigateToRegister}>
                            <Text style={styles.registerLink}>Зарегистрироваться</Text>
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
    loginButton: {
        marginTop: 8,
        height: 56,
        borderRadius: 28,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
    registerText: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    registerLink: {
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
