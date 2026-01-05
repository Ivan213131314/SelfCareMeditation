import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '@/services/authService';
import { setUser, clearUser } from '@/store/slices/userSlice';
import { RootState } from '@/store';

interface UseAuthReturn {
    isAuthenticated: boolean;
    isLoading: boolean;
    userId: string | null;
    email: string | null;
    error: string | null;
    signUp: (email: string, password: string) => Promise<boolean>;
    signIn: (email: string, password: string) => Promise<boolean>;
    signOut: () => Promise<void>;
    clearError: () => void;
}

/**
 * Хук для управления авторизацией
 * Инкапсулирует вызовы authService и синхронизирует состояние с Redux
 */
export const useAuth = (): UseAuthReturn => {
    const dispatch = useDispatch();
    const { id: userId, email, isAuthenticated } = useSelector(
        (state: RootState) => state.user
    );

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Инициализация: проверяем текущую сессию при монтировании
    useEffect(() => {
        const initAuth = async () => {
            try {
                const session = await authService.getSession();

                if (session?.user) {
                    dispatch(setUser({
                        id: session.user.id,
                        email: session.user.email || '',
                    }));
                }
            } catch (err) {
                console.error('Ошибка инициализации auth:', err);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();

        // Подписка на изменения состояния авторизации
        const subscription = authService.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                dispatch(setUser({
                    id: session.user.id,
                    email: session.user.email || '',
                }));
            } else if (event === 'SIGNED_OUT') {
                dispatch(clearUser());
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [dispatch]);

    /**
     * Регистрация нового пользователя
     */
    const signUp = useCallback(async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await authService.signUp(email, password);

            if (result.error) {
                setError(result.error);
                return false;
            }

            if (result.user) {
                dispatch(setUser({
                    id: result.user.id,
                    email: result.user.email || '',
                }));
            }

            return true;
        } catch (err) {
            setError('Произошла неожиданная ошибка');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    /**
     * Вход пользователя
     */
    const signIn = useCallback(async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await authService.signIn(email, password);

            if (result.error) {
                setError(result.error);
                return false;
            }

            if (result.user) {
                dispatch(setUser({
                    id: result.user.id,
                    email: result.user.email || '',
                }));
            }

            return true;
        } catch (err) {
            setError('Произошла неожиданная ошибка');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    /**
     * Выход из аккаунта
     */
    const signOut = useCallback(async (): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await authService.signOut();

            if (error) {
                setError(error);
            } else {
                dispatch(clearUser());
            }
        } catch (err) {
            setError('Произошла ошибка при выходе');
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    /**
     * Очистка ошибки
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        isAuthenticated,
        isLoading,
        userId,
        email,
        error,
        signUp,
        signIn,
        signOut,
        clearError,
    };
};
