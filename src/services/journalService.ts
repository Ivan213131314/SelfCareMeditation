import { supabase } from './supabase';
import { JournalEntry, CreateJournalEntryDTO } from '@/types/models';

export const journalService = {
    async createEntry(data: CreateJournalEntryDTO): Promise<JournalEntry> {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        const { data: entry, error } = await supabase
            .from('journal_entries')
            .insert({
                user_id: userData.user.id,
                emoji: data.emoji,
                shortcuts: data.shortcuts,
                text: data.text,
                practice_id: data.practice_id,
            })
            .select() // Select to return the created object
            .single();

        if (error) throw error;
        return entry;
    },

    async getEntries(): Promise<JournalEntry[]> {
        const { data, error } = await supabase
            .from('journal_entries')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    async getEntryById(id: string): Promise<JournalEntry | null> {
        const { data, error } = await supabase
            .from('journal_entries')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async updateEntry(id: string, data: Partial<CreateJournalEntryDTO>): Promise<JournalEntry> {
        const { data: entry, error } = await supabase
            .from('journal_entries')
            .update(data)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return entry;
    },

    async deleteEntry(id: string): Promise<void> {
        const { error } = await supabase
            .from('journal_entries')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};
