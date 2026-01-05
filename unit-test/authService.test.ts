import { authService } from '../src/services/authService';
import { supabase } from '../src/services/supabase';

// Mock the supabase client wrapper
jest.mock('../src/services/supabase', () => ({
    supabase: {
        auth: {
            signUp: jest.fn(),
            signInWithPassword: jest.fn(),
            signOut: jest.fn(),
            getUser: jest.fn(),
            getSession: jest.fn(),
            onAuthStateChange: jest.fn(),
        },
        from: jest.fn(),
    },
}));

describe('authService', () => {
    // Reset mocks before each test to ensure determinism
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('signUp', () => {
        it('should return user and create profile on successful sign up', async () => {
            // GIVEN
            const mockUser = { id: 'user-123', email: 'test@example.com' };
            (supabase.auth.signUp as jest.Mock).mockResolvedValue({
                data: { user: mockUser },
                error: null,
            });

            const mockInsert = jest.fn().mockResolvedValue({ error: null });
            const mockFrom = jest.fn().mockReturnValue({ insert: mockInsert });
            (supabase.from as jest.Mock).mockImplementation(mockFrom);

            // WHEN
            const result = await authService.signUp('test@example.com', 'password');

            // THEN
            expect(result.user).toEqual(mockUser);
            expect(result.error).toBeNull();
            expect(supabase.auth.signUp).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password',
            });
            // Verify profile creation attempt
            expect(supabase.from).toHaveBeenCalledWith('profiles');
            expect(mockInsert).toHaveBeenCalledWith({
                id: 'user-123',
                email: 'test@example.com',
            });
        });

        it('should return error and NOT create profile if auth fails', async () => {
            // GIVEN
            (supabase.auth.signUp as jest.Mock).mockResolvedValue({
                data: { user: null },
                error: { message: 'Invalid email' },
            });

            // WHEN
            const result = await authService.signUp('bad-email', 'password');

            // THEN
            expect(result.user).toBeNull();
            expect(result.error).toBe('Invalid email');
            expect(supabase.from).not.toHaveBeenCalled();
        });

        it('should return user but log error if profile creation fails (partial success)', async () => {
            // GIVEN
            const mockUser = { id: 'user-123', email: 'test@example.com' };
            (supabase.auth.signUp as jest.Mock).mockResolvedValue({
                data: { user: mockUser },
                error: null,
            });

            const mockInsert = jest.fn().mockResolvedValue({ error: { message: 'DB Error' } });
            const mockFrom = jest.fn().mockReturnValue({ insert: mockInsert });
            (supabase.from as jest.Mock).mockImplementation(mockFrom);

            // Spy on console.error to suppress output during test and verify behavior
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

            // WHEN
            const result = await authService.signUp('test@example.com', 'password');

            // THEN
            expect(result.user).toEqual(mockUser);
            expect(result.error).toBeNull(); // Auth was successful locally
            expect(consoleSpy).toHaveBeenCalledWith('Ошибка создания профиля:', { message: 'DB Error' });

            consoleSpy.mockRestore();
        });
    });

    describe('signIn', () => {
        it('should return user on successful sign in', async () => {
            // GIVEN
            const mockUser = { id: 'user-123' };
            (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
                data: { user: mockUser },
                error: null,
            });

            // WHEN
            const result = await authService.signIn('test@example.com', 'password');

            // THEN
            expect(result.user).toEqual(mockUser);
            expect(result.error).toBeNull();
            expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password',
            });
        });

        it('should return error on failed sign in', async () => {
            // GIVEN
            (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
                data: { user: null },
                error: { message: 'Invalid credentials' },
            });

            // WHEN
            const result = await authService.signIn('test@example.com', 'wrongfish');

            // THEN
            expect(result.user).toBeNull();
            expect(result.error).toBe('Invalid credentials');
        });
    });

    describe('signOut', () => {
        it('should return null error on success', async () => {
            // GIVEN
            (supabase.auth.signOut as jest.Mock).mockResolvedValue({ error: null });

            // WHEN
            const result = await authService.signOut();

            // THEN
            expect(result.error).toBeNull();
        });

        it('should return error message on failure', async () => {
            // GIVEN
            (supabase.auth.signOut as jest.Mock).mockResolvedValue({ error: { message: 'Network error' } });

            // WHEN
            const result = await authService.signOut();

            // THEN
            expect(result.error).toBe('Network error');
        });
    });

    describe('getCurrentUser', () => {
        it('should return user from session', async () => {
            // GIVEN
            const mockUser = { id: 'user-123' };
            (supabase.auth.getUser as jest.Mock).mockResolvedValue({
                data: { user: mockUser },
            });

            // WHEN
            const user = await authService.getCurrentUser();

            // THEN
            expect(user).toEqual(mockUser);
        });
    });

    describe('getSession', () => {
        it('should return current session', async () => {
            // GIVEN
            const mockSession = { access_token: 'token' };
            (supabase.auth.getSession as jest.Mock).mockResolvedValue({
                data: { session: mockSession },
            });

            // WHEN
            const session = await authService.getSession();

            // THEN
            expect(session).toEqual(mockSession);
        });
    });

    describe('onAuthStateChange', () => {
        it('should subscribe to auth changes', () => {
            // GIVEN
            const mockSubscription = { unsubscribe: jest.fn() };
            const mockCallback = jest.fn();
            (supabase.auth.onAuthStateChange as jest.Mock).mockReturnValue({
                data: { subscription: mockSubscription },
            });

            // WHEN
            const subscription = authService.onAuthStateChange(mockCallback);

            // THEN
            expect(supabase.auth.onAuthStateChange).toHaveBeenCalledWith(mockCallback);
            expect(subscription).toBe(mockSubscription);
        });
    });

    describe('getProfile', () => {
        it('should return profile data on success', async () => {
            // GIVEN
            const mockData = { id: 'user-123', email: 'test@example.com' };

            // Chain mocks: from -> select -> eq -> single
            const mockSingle = jest.fn().mockResolvedValue({ data: mockData, error: null });
            const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
            const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
            const mockFrom = jest.fn().mockReturnValue({ select: mockSelect });

            (supabase.from as jest.Mock).mockImplementation(mockFrom);

            // WHEN
            const result = await authService.getProfile('user-123');

            // THEN
            expect(result).toEqual(mockData);
            expect(supabase.from).toHaveBeenCalledWith('profiles');
            expect(mockSelect).toHaveBeenCalledWith('*');
            expect(mockEq).toHaveBeenCalledWith('id', 'user-123');
        });

        it('should log error and return null on failure', async () => {
            // GIVEN
            // Chain mocks
            const mockSingle = jest.fn().mockResolvedValue({
                data: null,
                error: { message: 'Not found' }
            });
            const mockEq = jest.fn().mockReturnValue({ single: mockSingle });
            const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
            const mockFrom = jest.fn().mockReturnValue({ select: mockSelect });

            (supabase.from as jest.Mock).mockImplementation(mockFrom);

            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

            // WHEN
            const result = await authService.getProfile('user-123');

            // THEN
            expect(result).toBeNull();
            expect(consoleSpy).toHaveBeenCalledWith('Ошибка получения профиля:', { message: 'Not found' });

            consoleSpy.mockRestore();
        });
    });
});
