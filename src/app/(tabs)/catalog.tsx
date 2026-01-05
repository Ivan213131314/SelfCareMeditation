import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useCatalog } from '@/hooks/useCatalog';
import { CategoryFilter } from '@/components/catalog/CategoryFilter';
import { PracticeList } from '@/components/catalog/PracticeList';
import { Colors } from '@/constants/colors';

export default function CatalogScreen() {
    const router = useRouter();
    const {
        categories,
        practices,
        loading,
        selectedCategoryId,
        filterByCategory,
    } = useCatalog();

    const handlePracticePress = (id: string) => {
        // Navigate to meditation tab/screen
        // passing params might require updating the route structure or using a global store/context
        // For now, we will navigate to the meditation tab. 
        // Ideally, this should open a specific meditation session.
        router.push('/(tabs)/meditation');
        // TODO: Pass practice ID to meditation screen via params or global store
        console.log('Selected practice:', id);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Практики</Text>
                </View>

                <View style={styles.filterContainer}>
                    <CategoryFilter
                        categories={categories}
                        selectedId={selectedCategoryId}
                        onSelect={filterByCategory}
                    />
                </View>

                <PracticeList
                    practices={practices}
                    loading={loading}
                    onPracticePress={handlePracticePress}
                    ListHeaderComponent={<View style={{ height: 8 }} />}
                />
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
        fontSize: 28,
        fontWeight: '700',
        color: Colors.text,
        letterSpacing: 0.3,
    },
    filterContainer: {
        marginBottom: 8,
    },
});
