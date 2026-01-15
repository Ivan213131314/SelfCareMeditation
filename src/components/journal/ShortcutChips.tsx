import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '@/constants/colors';
import { JOURNAL_SHORTCUTS } from '@/constants/shortcuts';
import { Ionicons } from '@expo/vector-icons';

interface ShortcutChipsProps {
    selectedShortcuts: string[];
    onToggle: (shortcut: string) => void;
}

export const ShortcutChips: React.FC<ShortcutChipsProps> = ({ selectedShortcuts, onToggle }) => {
    return (
        <View style={styles.container}>
            {JOURNAL_SHORTCUTS.map((shortcut) => {
                const isSelected = selectedShortcuts.includes(shortcut);
                return (
                    <TouchableOpacity
                        key={shortcut}
                        onPress={() => onToggle(shortcut)}
                        activeOpacity={0.7}
                        style={[
                            styles.chip,
                            isSelected && styles.selectedChip
                        ]}
                    >
                        {isSelected && (
                            <Ionicons name="checkmark" size={14} color={Colors.textDark} style={styles.icon} />
                        )}
                        <Text style={[
                            styles.text,
                            isSelected && styles.selectedText
                        ]}>
                            {shortcut}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    selectedChip: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    icon: {
        marginRight: 4,
    },
    text: {
        fontSize: 12,
        fontWeight: '500',
        color: Colors.textSecondary,
    },
    selectedText: {
        color: Colors.textDark, // Usually white on primary
        fontWeight: '600',
    },
});
