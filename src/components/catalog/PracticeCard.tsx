import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Practice } from '@/types/models';
import { Colors } from '@/constants/colors';
import { Card } from '../common/Card';

interface PracticeCardProps {
    practice: Practice;
    onPress: (id: string) => void;
}

const formatDuration = (seconds: number): string => {
    if (seconds > 60) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        if (remainingSeconds === 0) {
            return `${minutes} мин`;
        }
        return `${minutes} мин ${remainingSeconds} секунд`;
    }
    return `${seconds} секунд`;
};

export const PracticeCard: React.FC<PracticeCardProps> = ({ practice, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(practice.id)} activeOpacity={0.9}>
            <Card style={styles.card} variant="elevated">
                <View style={styles.imageContainer}>
                    {practice.image_url ? (
                        <Image
                            source={{ uri: practice.image_url }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={[styles.image, styles.placeholder]} />
                    )}
                    <View style={styles.durationBadge}>
                        <Text style={styles.durationText}>{formatDuration(practice.duration)}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title} numberOfLines={1}>{practice.title}</Text>
                    <Text style={styles.description} numberOfLines={2}>
                        {practice.description}
                    </Text>
                </View>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 0, // Reset default padding to allow image full width
        overflow: 'hidden',
        marginBottom: 16,
        borderWidth: 0,
    },
    imageContainer: {
        height: 140,
        width: '100%',
        backgroundColor: Colors.border,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        backgroundColor: Colors.border,
    },
    durationBadge: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    durationText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 20,
    },
});
