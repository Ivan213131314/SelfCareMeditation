import React from 'react';
import { FlatList, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { Practice, Category } from '@/types/models';
import { PracticeCard } from './PracticeCard';
import { EmptyState } from '../common/EmptyState';
import { Loading } from '../common/Loading';

interface PracticeListProps {
    practices: Practice[];
    categories?: Category[];
    loading: boolean;
    onPracticePress: (id: string) => void;
    ListHeaderComponent?: React.ReactElement;
    contentContainerStyle?: StyleProp<ViewStyle>;
}

export const PracticeList: React.FC<PracticeListProps> = ({
    practices,
    categories = [],
    loading,
    onPracticePress,
    ListHeaderComponent,
    contentContainerStyle
}) => {
    if (loading && practices.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <Loading message="Загрузка практик..." />
            </View>
        );
    }

    const getCategory = (id: string) => categories.find(c => c.id === id);

    return (
        <FlatList
            data={practices}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <PracticeCard
                    practice={item}
                    category={getCategory(item.category_id)}
                    onPress={onPracticePress}
                />
            )}
            contentContainerStyle={[styles.listContent, contentContainerStyle]}
            ListHeaderComponent={ListHeaderComponent}
            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <EmptyState
                        message="В этой категории пока нет практик"
                        emoji="🍃"
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
