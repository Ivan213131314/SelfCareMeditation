import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { JournalEntry } from '@/types/models';
import { JOURNAL_EMOJIS } from '@/constants/emojis';

interface EntryDetailModalProps {
    visible: boolean;
    entry: JournalEntry | null;
    onClose: () => void;
}

export const EntryDetailModal: React.FC<EntryDetailModalProps> = ({ visible, entry, onClose }) => {
    if (!entry) return null;

    const formattedDate = new Date(entry.created_at).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const formattedTime = new Date(entry.created_at).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const emojiLabel = JOURNAL_EMOJIS.find(e => e.emoji === entry.emoji)?.label || 'Mood';

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                {/* Close area at the top */}
                <TouchableOpacity style={styles.backdrop} onPress={onClose} />

                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.date}>{formattedDate}</Text>
                            <Text style={styles.time}>{formattedTime}</Text>
                        </View>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color={Colors.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollInner}>
                        <View style={styles.moodSection}>
                            <View style={styles.emojiContainer}>
                                <Text style={styles.emoji}>{entry.emoji}</Text>
                            </View>
                            <Text style={styles.moodLabel}>{emojiLabel}</Text>
                        </View>

                        {entry.shortcuts && entry.shortcuts.length > 0 && (
                            <View style={styles.shortcutsContainer}>
                                {entry.shortcuts.map((shortcut, index) => (
                                    <View key={index} style={styles.chip}>
                                        <Text style={styles.chipText}>{shortcut}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {entry.text ? (
                            <Text style={styles.entryText}>{entry.text}</Text>
                        ) : null}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    backdrop: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: Colors.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '85%',
        paddingTop: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 24,
        marginBottom: 20,
    },
    dateContainer: {
        flex: 1,
    },
    date: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 4,
    },
    time: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    closeButton: {
        padding: 8,
        marginRight: -8,
        marginTop: -8,
    },
    scrollContent: {
        flex: 1,
    },
    scrollInner: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    moodSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        backgroundColor: Colors.surface,
        padding: 16,
        borderRadius: 16,
    },
    emojiContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    emoji: {
        fontSize: 24,
    },
    moodLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
    },
    shortcutsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 24,
    },
    chip: {
        backgroundColor: Colors.primaryLight,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    chipText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '500',
    },
    entryText: {
        fontSize: 16,
        lineHeight: 26,
        color: Colors.text,
        marginBottom: 20,
    },
});
