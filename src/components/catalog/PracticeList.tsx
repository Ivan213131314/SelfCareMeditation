import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Practice } from '@/types/models';
import { PracticeCard } from './PracticeCard';
import { EmptyState } from '../common/EmptyState';
import { Loading } from '../common/Loading';

interface PracticeListProps {
    practices: Practice[];
    loading: boolean;
    onPracticePress: (id: string) => void;
    ListHeaderComponent?: React.ReactElement;
}

export const PracticeList: React.FC<PracticeListProps> = ({
    practices,
    loading,
    onPracticePress,
    ListHeaderComponent
}) => {
    if (loading && practices.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <Loading message="Загрузка практик..." />
            </View>
        );
    }

    return (
        <FlatList
            data={practices}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <PracticeCard
                    practice={item}
                    onPress={onPracticePress}
                />
            )}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={ListHeaderComponent}
            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <EmptyState
                        message="В этой категории пока нет практик"
                        icon="🍃"
                    />
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    listContent: {
        padding: 16,
        paddingTop: 0, // Header has padding
        paddingBottom: 24,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    emptyContainer: {
        marginTop: 40,
    },
});
