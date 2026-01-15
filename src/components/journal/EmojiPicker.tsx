import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '@/constants/colors';
import { JOURNAL_EMOJIS } from '@/constants/emojis';

interface EmojiPickerProps {
    selectedEmoji: string | null;
    onSelect: (emoji: string) => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ selectedEmoji, onSelect }) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {JOURNAL_EMOJIS.map((item) => {
                const isSelected = selectedEmoji === item.emoji;
                return (
                    <TouchableOpacity
                        key={item.value}
                        onPress={() => onSelect(item.emoji)}
                        activeOpacity={0.7}
                        style={styles.itemContainer}
                    >
                        <View style={[
                            styles.emojiContainer,
                            isSelected && styles.selectedEmojiContainer
                        ]}>
                            <Text style={styles.emoji}>{item.emoji}</Text>
                        </View>
                        {isSelected && (
                            <Text style={styles.label}>{item.label}</Text>
                        )}
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 4,
        alignItems: 'flex-start',
        height: 70, // Fixed height to accommodate label animation/position
    },
    itemContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 50,
    },
    emojiContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    selectedEmojiContainer: {
        backgroundColor: Colors.primaryLight,
        borderColor: Colors.primary,
        borderWidth: 2,
    },
    emoji: {
        fontSize: 24,
    },
    label: {
        fontSize: 10,
        fontWeight: '600',
        color: Colors.primary,
        marginTop: 4,
        textAlign: 'center',
    },
});
