import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { EmojiPicker } from './EmojiPicker';
import { ShortcutChips } from './ShortcutChips';

interface JournalInputHeaderProps {
    text: string;
    setText: (text: string) => void;
    selectedEmoji: string | null;
    setSelectedEmoji: (emoji: string | null) => void;
    selectedShortcuts: string[];
    onToggleShortcut: (shortcut: string) => void;
}

export const JournalInputHeader: React.FC<JournalInputHeaderProps> = ({
    text,
    setText,
    selectedEmoji,
    setSelectedEmoji,
    selectedShortcuts,
    onToggleShortcut,
}) => {
    return (
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
                        onToggle={onToggleShortcut}
                    />
                </View>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>RECENT ENTRIES</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
