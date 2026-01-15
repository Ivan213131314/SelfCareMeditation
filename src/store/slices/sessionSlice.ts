import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Practice } from '@/types/models';
import type { DefaultPracticeConfig } from '@/constants/defaultPractice';
import type { RootState } from '../index';

interface SessionState {
    currentPractice: Practice | DefaultPracticeConfig | null;
    isPlaying: boolean;
    progress: number; // в секундах
    duration: number; // в секундах
}

const initialState: SessionState = {
    currentPractice: null,
    isPlaying: false,
    progress: 0,
    duration: 0,
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSession: (state, action: PayloadAction<{ practice: Practice | DefaultPracticeConfig; duration: number }>) => {
            state.currentPractice = action.payload.practice;
            state.duration = action.payload.duration;
            state.progress = 0;
            state.isPlaying = false;
        },
        updateProgress: (state, action: PayloadAction<number>) => {
            state.progress = action.payload;
        },
        setPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        clearSession: (state) => {
            state.currentPractice = null;
            state.isPlaying = false;
            state.progress = 0;
            state.duration = 0;
        },
    },
});

export const { setSession, updateProgress, setPlaying, clearSession } = sessionSlice.actions;

// Селекторы
export const selectCurrentSession = (state: RootState) => state.session;
export const selectIsPlaying = (state: RootState) => state.session.isPlaying;
export const selectSessionProgress = (state: RootState) => state.session.progress;
export const selectSessionDuration = (state: RootState) => state.session.duration;
export const selectCurrentPractice = (state: RootState) => state.session.currentPractice;

export default sessionSlice.reducer;
