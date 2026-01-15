import { useState, useCallback } from 'react';
import { journalService } from '@/services/journalService';
import { JournalEntry, CreateJournalEntryDTO } from '@/types/models';
import { Alert } from 'react-native';

export const useJournal = () => {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEntries = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await journalService.getEntries();
            setEntries(data);
        } catch (err: any) {
            console.error('Error fetching journal entries:', err);
            setError(err.message || 'Failed to load journal entries');
        } finally {
            setLoading(false);
        }
    }, []);

    const createEntry = useCallback(async (data: CreateJournalEntryDTO) => {
        setLoading(true);
        setError(null);
        try {
            const newEntry = await journalService.createEntry(data);
            setEntries(prev => [newEntry, ...prev]);
            return newEntry;
        } catch (err: any) {
            console.error('Error creating journal entry:', err);
            setError(err.message || 'Failed to create entry');
            Alert.alert('Error', 'Could not save your journal entry. Please try again.');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateEntry = useCallback(async (id: string, data: Partial<CreateJournalEntryDTO>) => {
        setLoading(true);
        setError(null);
        try {
            const updatedEntry = await journalService.updateEntry(id, data);
            setEntries(prev => prev.map(e => e.id === id ? updatedEntry : e));
            return updatedEntry;
        } catch (err: any) {
            console.error('Error updating journal entry:', err);
            setError(err.message || 'Failed to update entry');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteEntry = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await journalService.deleteEntry(id);
            setEntries(prev => prev.filter(e => e.id !== id));
        } catch (err: any) {
            console.error('Error deleting journal entry:', err);
            setError(err.message || 'Failed to delete entry');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        entries,
        loading,
        error,
        fetchEntries,
        createEntry,
        updateEntry,
        deleteEntry,
    };
};
