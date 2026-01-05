import { supabase } from './supabase';
import { Category, Practice } from '../types/models';

export const catalogService = {
    async getCategories(): Promise<Category[]> {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');

        if (error) {
            throw error;
        }
        return data as Category[];
    },

    async getPractices(): Promise<Practice[]> {
        const { data, error } = await supabase
            .from('practices')
            .select('*')
            .order('title');

        if (error) {
            throw error;
        }
        return data as Practice[];
    },

    async getPracticesByCategory(categoryId: string): Promise<Practice[]> {
        const { data, error } = await supabase
            .from('practices')
            .select('*')
            .eq('category_id', categoryId)
            .order('title');

        if (error) {
            throw error;
        }
        return data as Practice[];
    },

    async getPracticeById(id: string): Promise<Practice | null> {
        const { data, error } = await supabase
            .from('practices')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw error;
        }
        return data as Practice;
    }
};
