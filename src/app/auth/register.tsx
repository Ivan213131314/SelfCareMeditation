import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/hooks/useAuth';

const { width } = Dimensions.get('window');

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
        // Use replace to switch modes without stacking
        router.replace('/auth/login');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/* Background Glows */}
            <View style={styles.backgroundDecor}>
                <View style={styles.glowTop} />
                <View style={styles.glowCenter} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.contentContainer}>
                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons name="person-add-alt-1" size={40} color={Colors.primary} />
                        </View>
                        <Text style={styles.title}>Create account</Text>
                        <Text style={styles.subtitle}>
                            Sign up to start your journey to mindfulness and peace.
                        </Text>
                    </View>

                    {/* Form Section */}
                    <View style={styles.formContainer}>
                        <Input
                            label="Email address"
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
                            rightIcon={
                                <MaterialIcons name="mail-outline" size={20} color={Colors.textSecondary} />
                            }
                        />

                        <Input
                            label="Password"
                            placeholder="Min 6 characters"
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                if (passwordError) validatePassword(text);
                            }}
                            error={passwordError}
                            secureTextEntry
                            rightIcon={
                                <MaterialIcons name="lock-outline" size={20} color={Colors.textSecondary} />
                            }
                        />

                        <Input
                            label="Confirm Password"
                            placeholder="Repeat password"
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                if (confirmPasswordError) validateConfirmPassword(text);
                            }}
                            error={confirmPasswordError}
                            secureTextEntry
                            rightIcon={
                                <MaterialIcons name="lock-outline" size={20} color={Colors.textSecondary} />
                            }
                        />

                        {error && (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        )}

                        <Button
                            title="Sign Up"
                            onPress={handleRegister}
                            loading={isLoading}
                            style={styles.registerButton}
                        />

                        <TouchableOpacity
                            onPress={navigateToLogin}
                            style={styles.loginLinkContainer}
                        >
                            <Text style={styles.loginText}>
                                Already have an account? <Text style={styles.loginLink}>Log in</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        We respect your peace. <Text style={styles.footerLink}>Privacy Policy</Text>
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F8F7',
    },
    backgroundDecor: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    glowTop: {
        position: 'absolute',
        top: -width * 0.5,
        left: -width * 0.2,
        width: width * 1.5,
        height: width * 1.5,
        borderRadius: 9999,
        backgroundColor: 'rgba(19, 236, 128, 0.03)',
    },
    glowCenter: {
        position: 'absolute',
        top: '30%',
        left: '10%',
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: 9999,
        backgroundColor: 'rgba(19, 236, 128, 0.05)',
        transform: [{ scale: 1.2 }],
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 60,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 28,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#111814',
        marginBottom: 12,
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 16,
    },
    formContainer: {
        width: '100%',
    },
    errorContainer: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        padding: 12,
        borderRadius: 12,
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
        shadowColor: 'rgba(19, 236, 128, 0.5)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,
    },
    loginLinkContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    loginText: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    loginLink: {
        fontWeight: '600',
        color: Colors.primary,
    },
    footer: {
        paddingTop: 24,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#94A3B8',
        textAlign: 'center',
    },
    footerLink: {
        textDecorationLine: 'underline',
    },
});
