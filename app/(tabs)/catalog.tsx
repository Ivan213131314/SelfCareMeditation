import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useCatalog } from '@/hooks/useCatalog';
import { CategoryFilter } from '@/components/catalog/CategoryFilter';
import { PracticeList } from '@/components/catalog/PracticeList';
import { Colors } from '@/constants/colors';
import { Loading } from '@/components/common/Loading';
import { ErrorState } from '@/components/common/ErrorState';

export default function CatalogScreen() {
    const router = useRouter();
    const {
        categories,
        practices,
        loading,
        error,
        selectedCategoryId,
        filterByCategory,
        refresh
    } = useCatalog();

    const handlePracticePress = (id: string) => {
        // Navigate to meditation screen with practice ID
        router.push({
            pathname: '/(tabs)/meditation',
            params: { practiceId: id }
        });
    };

    if (error) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <ErrorState
                    message={error}
                    onRetry={refresh}
                />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Практики</Text>
                    <Text style={styles.subtitle}>
                        Найдите время для себя сегодня
                    </Text>
                </View>

                <View style={styles.content}>
                    <PracticeList
                        practices={practices}
                        loading={loading}
                        onPracticePress={handlePracticePress}
                        ListHeaderComponent={
                            <View style={styles.filterContainer}>
                                <CategoryFilter
                                    categories={categories}
                                    selectedId={selectedCategoryId}
                                    onSelect={filterByCategory}
                                />
                            </View>
                        }
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: Colors.text,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
    },
    filterContainer: {
        marginBottom: 16,
        // Negative margin to offset ListHeaderComponent padding if needed, 
        // but here we want it clear. 
        // We'll put vertical padding in CategoryFilter container itself.
    },
    content: {
        flex: 1,
    }
});
