import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterScreen from '../src/app/auth/register';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';

// --- Mocks ---
jest.mock('expo-router', () => ({
    router: {
        replace: jest.fn(),
    },
}));

jest.mock('@/hooks/useAuth', () => ({
    useAuth: jest.fn(),
}));

jest.mock('@expo/vector-icons', () => ({
    MaterialIcons: 'MaterialIcons',
}));

describe('RegisterScreen Behavioral Contract', () => {
    const mockSignUp = jest.fn();
    const mockClearError = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useAuth as jest.Mock).mockReturnValue({
            signUp: mockSignUp,
            isLoading: false,
            error: null,
            clearError: mockClearError,
        });
    });

    describe('Validation Logic', () => {
        it('should fail if passwords do not match', () => {
            const { getByPlaceholderText, getByText } = render(<RegisterScreen />);

            fireEvent.changeText(getByPlaceholderText('name@example.com'), 'new@user.com');
            fireEvent.changeText(getByPlaceholderText('Min 6 characters'), 'password123');
            fireEvent.changeText(getByPlaceholderText('Repeat password'), 'different');

            fireEvent.press(getByText('Sign Up'));

            expect(getByText('Пароли не совпадают')).toBeTruthy();
            expect(mockSignUp).not.toHaveBeenCalled();
        });

        it('should fail if confirm password is missing', () => {
            const { getByPlaceholderText, getByText } = render(<RegisterScreen />);

            fireEvent.changeText(getByPlaceholderText('name@example.com'), 'new@user.com');
            fireEvent.changeText(getByPlaceholderText('Min 6 characters'), 'password123');
            // Confirm password left empty

            fireEvent.press(getByText('Sign Up'));

            expect(getByText('Подтвердите пароль')).toBeTruthy();
            expect(mockSignUp).not.toHaveBeenCalled();
        });
    });

    describe('Registration Flow', () => {
        it('should call signUp and navigate on success', async () => {
            mockSignUp.mockResolvedValue(true);
            const { getByPlaceholderText, getByText } = render(<RegisterScreen />);

            fireEvent.changeText(getByPlaceholderText('name@example.com'), 'new@user.com');
            fireEvent.changeText(getByPlaceholderText('Min 6 characters'), 'password123');
            fireEvent.changeText(getByPlaceholderText('Repeat password'), 'password123');

            fireEvent.press(getByText('Sign Up'));

            await waitFor(() => {
                expect(mockClearError).toHaveBeenCalled();
                expect(mockSignUp).toHaveBeenCalledWith('new@user.com', 'password123');
                expect(router.replace).toHaveBeenCalledWith('/(tabs)/catalog');
            });
        });

        it('should NOT navigate if registration fails', async () => {
            mockSignUp.mockResolvedValue(false); // Registration failed at service level
            const { getByPlaceholderText, getByText } = render(<RegisterScreen />);

            fireEvent.changeText(getByPlaceholderText('name@example.com'), 'fail@user.com');
            fireEvent.changeText(getByPlaceholderText('Min 6 characters'), 'password123');
            fireEvent.changeText(getByPlaceholderText('Repeat password'), 'password123');

            fireEvent.press(getByText('Sign Up'));

            await waitFor(() => {
                expect(mockSignUp).toHaveBeenCalled();
                expect(router.replace).not.toHaveBeenCalled();
            });
        });
    });

    describe('Navigation', () => {
        it('should navigate to login screen on "Log in" click', () => {
            const { getByText } = render(<RegisterScreen />);

            fireEvent.press(getByText('Log in'));

            expect(router.replace).toHaveBeenCalledWith('/auth/login');
        });
    });
});
