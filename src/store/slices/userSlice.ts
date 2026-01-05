import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface UserState {
    id: string | null;
    email: string | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    id: null,
    email: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ id: string; email: string }>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.id = null;
            state.email = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

// Селекторы
export const selectCurrentUser = (state: RootState) => ({
    id: state.user.id,
    email: state.user.email,
});

export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;

export default userSlice.reducer;

