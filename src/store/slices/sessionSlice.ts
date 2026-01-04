import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
    currentPracticeId: string | null;
    isPlaying: boolean;
    progress: number; // в секундах
    duration: number; // в секундах
}

const initialState: SessionState = {
    currentPracticeId: null,
    isPlaying: false,
    progress: 0,
    duration: 0,
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSession: (state, action: PayloadAction<{ practiceId: string; duration: number }>) => {
            state.currentPracticeId = action.payload.practiceId;
            state.duration = action.payload.duration;
            state.progress = 0;
            state.isPlaying = false;
        },
        updateProgress: (state, action: PayloadAction<number>) => {
            state.progress = action.payload;
        },
        togglePlay: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        clearSession: (state) => {
            state.currentPracticeId = null;
            state.isPlaying = false;
            state.progress = 0;
            state.duration = 0;
        },
    },
});

export const { setSession, updateProgress, togglePlay, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
