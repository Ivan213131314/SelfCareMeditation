import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { catalogService } from '../services/catalogService';
import { Category, Practice } from '../types/models';
import { RootState } from '../store';
import { setCatalogData } from '../store/slices/catalogSlice';

export const useCatalog = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.catalog.categories);
    const practices = useSelector((state: RootState) => state.catalog.practices);
    const lastFetch = useSelector((state: RootState) => state.catalog.lastFetch);

    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Derived state for filtering
    const filteredPractices = useMemo(() => {
        if (!selectedCategoryId) return practices;
        return practices.filter(p => p.category_id === selectedCategoryId);
    }, [practices, selectedCategoryId]);

    // Initial load logic
    const loadData = useCallback(async (forceRefresh = false) => {
        // Cache-First Strategy:
        // If we have data and it's not a forced refresh, don't fetch.
        if (!forceRefresh && categories.length > 0 && practices.length > 0) {
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const [categoriesData, practicesData] = await Promise.all([
                catalogService.getCategories(),
                catalogService.getPractices(),
            ]);

            dispatch(setCatalogData({
                categories: categoriesData,
                practices: practicesData
            }));

        } catch (err: any) {
            setError(err.message || 'Failed to load catalog data');
            console.error('Catalog load error:', err);
        } finally {
            setLoading(false);
        }
    }, [categories.length, practices.length, dispatch]);

    // Initial load effect
    useEffect(() => {
        loadData();
    }, [loadData]);

    // Handle filtering
    const filterByCategory = useCallback((categoryId: string | null) => {
        setSelectedCategoryId(categoryId);
    }, []);

    return {
        categories,
        practices: filteredPractices, // Return filtered list
        loading,
        error,
        selectedCategoryId,
        filterByCategory,
        refresh: () => loadData(true)
    };
};
