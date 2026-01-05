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
                    selectedId === null ? styles.activeChip : styles.inactiveChip
                ]}
                onPress={() => onSelect(null)}
                activeOpacity={0.7}
            >
                <Text style={[
                    styles.text,
                    selectedId === null ? styles.activeText : styles.inactiveText
                ]}>All</Text>
            </TouchableOpacity>

            {categories.map((category) => (
                <TouchableOpacity
                    key={category.id}
                    style={[
                        styles.chip,
                        selectedId === category.id ? styles.activeChip : styles.inactiveChip
                    ]}
                    onPress={() => onSelect(category.id)}
                    activeOpacity={0.7}
                >
                    <Text style={[
                        styles.text,
                        selectedId === category.id ? styles.activeText : styles.inactiveText
                    ]}>
                        {category.name}
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
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 999,
        marginRight: 8,
        minWidth: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeChip: {
        backgroundColor: Colors.primary,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    inactiveChip: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: '#E2E8F0', // Light border
    },
    text: {
        fontSize: 15,
        fontWeight: '600',
    },
    activeText: {
        color: '#FFFFFF',
    },
    inactiveText: {
        color: Colors.textSecondary,
    },
});
