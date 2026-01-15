import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { JournalEntry } from '@/types/models';
import { Colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../common/Card';
import { JOURNAL_EMOJIS } from '@/constants/emojis';

interface EntryCardProps {
    entry: JournalEntry;
    onPress: (id: string) => void;
}

export const EntryCard: React.FC<EntryCardProps> = ({ entry, onPress }) => {
    const formattedDate = new Date(entry.created_at).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const emojiLabel = JOURNAL_EMOJIS.find(e => e.emoji === entry.emoji)?.label || 'Mood';

    return (
        <TouchableOpacity onPress={() => onPress(entry.id)} activeOpacity={0.9}>
            <Card style={styles.card} variant="default">
                <View style={styles.container}>
                    <View style={styles.emojiContainer}>
                        <Text style={styles.emoji}>{entry.emoji}</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.title}>{emojiLabel}</Text>
                        <Text style={styles.date}>{formattedDate}</Text>
                        {entry.text ? (
                            <Text style={styles.preview} numberOfLines={1}>
                                {entry.text}
                            </Text>
                        ) : null}
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
                </View>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 12,
        marginBottom: 12,
        borderRadius: 16,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    emojiContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emoji: {
        fontSize: 20,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 2,
    },
    date: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    preview: {
        fontSize: 12,
        color: Colors.textMuted,
        marginTop: 2,
    },
});
