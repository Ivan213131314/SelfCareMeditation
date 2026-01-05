import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Category } from '@/types/models';
import { Colors } from '@/constants/colors';

interface CategoryFilterProps {
    categories: Category[];
    selectedId: string | null;
    onSelect: (id: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    selectedId,
    onSelect
}) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <TouchableOpacity
                style={[
                    styles.chip,
                    selectedId === null && styles.activeChip
                ]}
                onPress={() => onSelect(null)}
            >
                <Text style={[
                    styles.text,
                    selectedId === null && styles.activeText
                ]}>Все</Text>
            </TouchableOpacity>

            {categories.map((category) => (
                <TouchableOpacity
                    key={category.id}
                    style={[
                        styles.chip,
                        selectedId === category.id && styles.activeChip
                    ]}
                    onPress={() => onSelect(category.id)}
                >
                    <Text style={[
                        styles.text,
                        selectedId === category.id && styles.activeText
                    ]}>
                        {category.icon} {category.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: Colors.card,
        borderWidth: 1,
        borderColor: Colors.border,
        marginRight: 8,
    },
    activeChip: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    text: {
        fontSize: 14,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
    activeText: {
        color: '#FFFFFF',
    },
});
