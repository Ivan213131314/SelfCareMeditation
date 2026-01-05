import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../src/app/auth/login';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';

// --- Mocks ---
jest.mock('expo-router', () => ({
    router: {
        replace: jest.fn(),
        push: jest.fn(),
    },
}));

jest.mock('@/hooks/useAuth', () => ({
    useAuth: jest.fn(),
}));

jest.mock('@expo/vector-icons', () => ({
    MaterialIcons: 'MaterialIcons',
}));

describe('LoginScreen Behavioral Contract', () => {
    const mockSignIn = jest.fn();
    const mockClearError = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useAuth as jest.Mock).mockReturnValue({
            signIn: mockSignIn,
            isLoading: false,
            error: null,
            clearError: mockClearError,
        });
    });

    describe('Validation Logic', () => {
        it('should show errors for empty fields on submit', () => {
            const { getByText } = render(<LoginScreen />);
            const submitBtn = getByText('Continue');

            fireEvent.press(submitBtn);

            expect(getByText('Введите email')).toBeTruthy();
            expect(getByText('Введите пароль')).toBeTruthy();
            expect(mockSignIn).not.toHaveBeenCalled();
        });

        it('should show error for invalid email format', () => {
            const { getByPlaceholderText, getByText } = render(<LoginScreen />);

            fireEvent.changeText(getByPlaceholderText('name@example.com'), 'bad-email');
            fireEvent.changeText(getByPlaceholderText('Your password'), 'password123');
            fireEvent.press(getByText('Continue'));

            expect(getByText('Неверный формат email')).toBeTruthy();
            expect(mockSignIn).not.toHaveBeenCalled();
        });

        it('should show error for short password', () => {
            const { getByPlaceholderText, getByText } = render(<LoginScreen />);

            fireEvent.changeText(getByPlaceholderText('name@example.com'), 'valid@email.com');
            fireEvent.changeText(getByPlaceholderText('Your password'), '12345'); // < 6 chars
            fireEvent.press(getByText('Continue'));

            expect(getByText('Пароль должен быть не менее 6 символов')).toBeTruthy();
            expect(mockSignIn).not.toHaveBeenCalled();
        });
    });

    describe('Authentication Flow', () => {
        it('should call signIn with correct credentials when validation passes', async () => {
            mockSignIn.mockResolvedValue(true);
            const { getByPlaceholderText, getByText } = render(<LoginScreen />);

            fireEvent.changeText(getByPlaceholderText('name@example.com'), 'test@example.com');
            fireEvent.changeText(getByPlaceholderText('Your password'), 'secret123');
            fireEvent.press(getByText('Continue'));

            await waitFor(() => {
                expect(mockClearError).toHaveBeenCalled();
                expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'secret123');
            });
        });

        it('should navigate to catalog on successful login', async () => {
            mockSignIn.mockResolvedValue(true);
            const { getByPlaceholderText, getByText } = render(<LoginScreen />);

            fireEvent.changeText(getByPlaceholderText('name@example.com'), 'test@example.com');
            fireEvent.changeText(getByPlaceholderText('Your password'), 'secret123');
            fireEvent.press(getByText('Continue'));

            await waitFor(() => {
                expect(router.replace).toHaveBeenCalledWith('/(tabs)/catalog');
            });
        });

        it('should NOT navigate if login fails', async () => {
            mockSignIn.mockResolvedValue(false); // Auth failed
            const { getByPlaceholderText, getByText } = render(<LoginScreen />);

            fireEvent.changeText(getByPlaceholderText('name@example.com'), 'test@example.com');
            fireEvent.changeText(getByPlaceholderText('Your password'), 'secret123');
            fireEvent.press(getByText('Continue'));

            await waitFor(() => {
                expect(mockSignIn).toHaveBeenCalled();
                expect(router.replace).not.toHaveBeenCalled();
            });
        });
    });

    describe('Navigation', () => {
        // Note: The text in the component is "Sign up" inside a nested Text structure
        // We search for it.
        it('should navigate to register screen on "Sign up" click', () => {
            const { getByText } = render(<LoginScreen />);

            fireEvent.press(getByText('Sign up'));

            expect(router.push).toHaveBeenCalledWith('/auth/register');
        });
    });
});
