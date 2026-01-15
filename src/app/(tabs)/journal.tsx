import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { JournalInputHeader } from '@/components/journal/JournalInputHeader';
import { EntryCard } from '@/components/journal/EntryCard';
import { EntryDetailModal } from '@/components/journal/EntryDetailModal';
import { useJournal } from '@/hooks/useJournal';
import { CreateJournalEntryDTO, JournalEntry } from '@/types/models';
import { Loading } from '@/components/common/Loading';
import { ErrorState } from '@/components/common/ErrorState';

export default function JournalScreen() {
    const { entries, loading, error, fetchEntries, createEntry } = useJournal();
    const [text, setText] = useState('');
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const [selectedShortcuts, setSelectedShortcuts] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State for viewing entry details
    const [viewingEntry, setViewingEntry] = useState<JournalEntry | null>(null);

    useEffect(() => {
        fetchEntries();
    }, [fetchEntries]);

    const handleToggleShortcut = (shortcut: string) => {
        setSelectedShortcuts(prev =>
            prev.includes(shortcut)
                ? prev.filter(s => s !== shortcut)
                : [...prev, shortcut]
        );
    };

    const handleSave = async () => {
        if (!selectedEmoji && !text.trim()) {
            Alert.alert('Empty Entry', 'Please select a mood or write something to save.');
            return;
        }

        if (!selectedEmoji) {
            Alert.alert('Mood Required', 'Please select a mood that represents how you feel.');
            return;
        }

        setIsSubmitting(true);
        try {
            const newEntry: CreateJournalEntryDTO = {
                emoji: selectedEmoji,
                shortcuts: selectedShortcuts,
                text: text.trim(),
            };
            await createEntry(newEntry);

            // Reset form
            setText('');
            setSelectedEmoji(null);
            setSelectedShortcuts([]);
            Alert.alert('Saved', 'Your reflection has been saved.');
            // Refresh entries to show the new one immediately
            fetchEntries();
        } catch (e) {
            // Error handled in hook (alerts user)
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading && entries.length === 0) {
        return <Loading message="Loading journal..." />;
    }

    if (error && entries.length === 0) {
        return <ErrorState message={error} onRetry={fetchEntries} />;
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Reflection</Text>
                <TouchableOpacity
                    onPress={handleSave}
                    disabled={isSubmitting}
                    style={styles.saveButton}
                >
                    {isSubmitting ? (
                        <ActivityIndicator size="small" color={Colors.primary} />
                    ) : (
                        <Text style={styles.saveButtonText}>Save</Text>
                    )}
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.keyboardView}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <FlatList
                    data={entries}
                    renderItem={({ item }) => (
                        <EntryCard
                            entry={item}
                            onPress={() => setViewingEntry(item)}
                        />
                    )}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    ListHeaderComponent={
                        <JournalInputHeader
                            text={text}
                            setText={setText}
                            selectedEmoji={selectedEmoji}
                            setSelectedEmoji={setSelectedEmoji}
                            selectedShortcuts={selectedShortcuts}
                            onToggleShortcut={handleToggleShortcut}
                        />
                    }
                    showsVerticalScrollIndicator={false}
                    refreshing={loading}
                    onRefresh={fetchEntries}
                />
            </KeyboardAvoidingView>

            <EntryDetailModal
                visible={!!viewingEntry}
                entry={viewingEntry}
                onClose={() => setViewingEntry(null)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: Colors.background,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
    },
    saveButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: Colors.primaryLight,
    },
    saveButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.primary,
    },
    keyboardView: {
        flex: 1,
    },
    listContent: {
        padding: 20,
        paddingBottom: 100, // Space for bottom tab bar
    },
});
