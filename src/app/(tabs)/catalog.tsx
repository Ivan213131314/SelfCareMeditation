import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Platform, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCatalog } from '@/hooks/useCatalog';
import { CategoryFilter } from '@/components/catalog/CategoryFilter';
import { PracticeList } from '@/components/catalog/PracticeList';
import { Colors } from '@/constants/colors';
import { Input } from '@/components/common/Input';

export default function CatalogScreen() {
    const router = useRouter();
    const {
        categories,
        practices,
        loading,
        selectedCategoryId,
        filterByCategory,
        refresh,
    } = useCatalog();

    const handlePracticePress = (id: string) => {
        router.push('/(tabs)/meditation');
        console.log('Selected practice:', id);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>GOOD MORNING</Text>
                        <Text style={styles.title}>Discover Peace</Text>
                    </View>
                    <TouchableOpacity style={styles.profileButton}>
                        <Ionicons name="person-circle-outline" size={40} color={Colors.text} />
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <Input
                        placeholder="Find your calm..."
                        leftIcon={<Ionicons name="search-outline" size={20} color={Colors.textSecondary} />}
                        containerStyle={styles.searchInputContainer}
                        inputStyle={styles.searchInput}
                    />
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
                    categories={categories}
                    loading={loading}
                    onPracticePress={handlePracticePress}
                    onRefresh={refresh}
                    refreshing={loading}
                    ListHeaderComponent={<View style={{ height: 8 }} />}
                    contentContainerStyle={styles.listContent}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
    },
    greeting: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.textSecondary,
        marginBottom: 4,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.text,
        letterSpacing: -0.5,
    },
    profileButton: {
        padding: 4,
        backgroundColor: Colors.white,
        borderRadius: 999,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    searchContainer: {
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    searchInputContainer: {
        marginBottom: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    searchInput: {
        backgroundColor: Colors.white,
        borderWidth: 0,
        height: 52,
        fontSize: 16,
    },
    filterContainer: {
        marginBottom: 16,
    },
    listContent: {
        paddingBottom: 20,
    },
});
