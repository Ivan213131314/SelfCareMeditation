import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Practice, Category } from '@/types/models';
import { Colors } from '@/constants/colors';
import { Card } from '../common/Card';

interface PracticeCardProps {
    practice: Practice;
    category?: Category;
    onPress: (id: string) => void;
}

export const PracticeCard: React.FC<PracticeCardProps> = ({ practice, category, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(practice.id)} activeOpacity={0.95}>
            <Card style={styles.card} variant="default">
                <View style={styles.content}>
                    {/* Category Label */}
                    <View style={styles.categoryContainer}>
                        {category?.icon ? (
                            <Text style={styles.categoryIcon}>{category.icon}</Text>
                        ) : (
                            <Ionicons name="sunny-outline" size={16} color={Colors.categoryMorning} />
                        )}
                        <Text style={styles.categoryText}>
                            {category?.name?.toUpperCase() || 'MEDITATION'}
                        </Text>
                    </View>

                    {/* Title & Description */}
                    <Text style={styles.title}>{practice.title}</Text>
                    <Text style={styles.description} numberOfLines={2}>
                        {practice.description}
                    </Text>

                    {/* Action Button */}
                    <View style={styles.actionButton}>
                        <Ionicons name="play-circle" size={20} color={Colors.text} />
                        <Text style={styles.actionText}>Try this meditation</Text>
                    </View>
                </View>

                {/* Visual */}
                <View style={styles.visualContainer}>
                    {practice.image_url ? (
                        <Image
                            source={{ uri: practice.image_url }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={[styles.image, styles.placeholder]} />
                    )}
                </View>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        padding: 20,
        borderRadius: 24,
        backgroundColor: Colors.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    content: {
        marginBottom: 16,
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 6,
    },
    categoryIcon: {
        fontSize: 14,
    },
    categoryText: {
        fontSize: 11,
        fontWeight: '700',
        color: Colors.categoryMorning, // Dynamic color could be used here
        letterSpacing: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 20,
        marginBottom: 16,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E0F7EB', // Light green bg
        alignSelf: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 999,
        gap: 8,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text,
    },
    visualContainer: {
        height: 120,
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        backgroundColor: '#FCD34D', // Fallback color
    },
});
