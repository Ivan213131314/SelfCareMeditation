import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, Practice } from '@/types/models';

interface CatalogState {
    categories: Category[];
    practices: Practice[];
    lastFetch: number | null;
}

const initialState: CatalogState = {
    categories: [],
    practices: [],
    lastFetch: null,
};

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
        setPractices: (state, action: PayloadAction<Practice[]>) => {
            state.practices = action.payload;
        },
        setCatalogData: (state, action: PayloadAction<{ categories: Category[]; practices: Practice[] }>) => {
            state.categories = action.payload.categories;
            state.practices = action.payload.practices;
            state.lastFetch = Date.now();
        },
    },
});

export const { setCategories, setPractices, setCatalogData } = catalogSlice.actions;
export default catalogSlice.reducer;
