import { supabase } from './supabase';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';

export interface AuthResult {
    user: User | null;
    error: string | null;
}

export interface ProfileData {
    id: string;
    email: string;
    created_at: string;
}

/**
 * Сервис авторизации
 * Отвечает за регистрацию, вход, выход и управление сессией пользователя
 */
export const authService = {
    /**
     * Регистрация нового пользователя
     */
    async signUp(email: string, password: string): Promise<AuthResult> {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            return { user: null, error: error.message };
        }

        // Создаём профиль пользователя после регистрации
        if (data.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                    id: data.user.id,
                    email: data.user.email,
                });

            if (profileError) {
                console.error('Ошибка создания профиля:', profileError);
                // Не возвращаем ошибку, т.к. пользователь уже создан
            }
        }

        return { user: data.user, error: null };
    },

    /**
     * Вход существующего пользователя
     */
    async signIn(email: string, password: string): Promise<AuthResult> {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return { user: null, error: error.message };
        }

        return { user: data.user, error: null };
    },

    /**
     * Выход из аккаунта
     */
    async signOut(): Promise<{ error: string | null }> {
        const { error } = await supabase.auth.signOut();

        if (error) {
            return { error: error.message };
        }

        return { error: null };
    },

    /**
     * Получение текущего пользователя
     */
    async getCurrentUser(): Promise<User | null> {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    },

    /**
     * Получение текущей сессии
     */
    async getSession(): Promise<Session | null> {
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    },

    /**
     * Подписка на изменения состояния авторизации
     */
    onAuthStateChange(
        callback: (event: AuthChangeEvent, session: Session | null) => void
    ) {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
        return subscription;
    },

    /**
     * Получение профиля пользователя
     */
    async getProfile(userId: string): Promise<ProfileData | null> {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Ошибка получения профиля:', error);
            return null;
        }

        return data;
    },
};
