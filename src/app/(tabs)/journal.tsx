import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { EmojiPicker } from '@/components/journal/EmojiPicker';
import { ShortcutChips } from '@/components/journal/ShortcutChips';
import { EntryCard } from '@/components/journal/EntryCard';
import { useJournal } from '@/hooks/useJournal';
import { CreateJournalEntryDTO } from '@/types/models';
import { Loading } from '@/components/common/Loading';
import { ErrorState } from '@/components/common/ErrorState';

export default function JournalScreen() {
    const { entries, loading, error, fetchEntries, createEntry } = useJournal();
    const [text, setText] = useState('');
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const [selectedShortcuts, setSelectedShortcuts] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        } catch (e) {
            // Error handled in hook (alerts user)
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderHeader = () => (
        <View style={styles.formContainer}>
            <Text style={styles.prompt}>What came up for you today? Let your thoughts flow freely.</Text>

            <TextInput
                style={styles.input}
                placeholder="Start typing here..."
                placeholderTextColor={Colors.textMuted}
                multiline
                value={text}
                onChangeText={setText}
                textAlignVertical="top"
            />

            <View style={styles.controls}>
                <EmojiPicker
                    selectedEmoji={selectedEmoji}
                    onSelect={setSelectedEmoji}
                />

                <View style={styles.chipsContainer}>
                    <ShortcutChips
                        selectedShortcuts={selectedShortcuts}
                        onToggle={handleToggleShortcut}
                    />
                </View>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>RECENT ENTRIES</Text>
                {/* Future: Add 'View all' navigation */}
            </View>
        </View>
    );

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
                            onPress={(id) => console.log('View entry', id)}
                        />
                    )}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    ListHeaderComponent={renderHeader}
                    showsVerticalScrollIndicator={false}
                    refreshing={loading}
                    onRefresh={fetchEntries}
                />
            </KeyboardAvoidingView>
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
    formContainer: {
        marginBottom: 24,
    },
    prompt: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginBottom: 16,
        lineHeight: 24,
    },
    input: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 16,
        minHeight: 120,
        fontSize: 16,
        color: Colors.text,
        marginBottom: 16,
        textAlignVertical: 'top',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    controls: {
        gap: 16,
        marginBottom: 24,
    },
    chipsContainer: {
        marginTop: 8,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.textMuted,
        letterSpacing: 1,
    },
});
