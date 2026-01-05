import { useState, useEffect, useCallback } from 'react';
import { catalogService } from '../services/catalogService';
import { Category, Practice } from '../types/models';

export const useCatalog = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [practices, setPractices] = useState<Practice[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch categories and practices in parallel
            const [categoriesData, practicesData] = await Promise.all([
                catalogService.getCategories(),
                catalogService.getPractices(), // Initially fetch all practices
            ]);

            setCategories(categoriesData);
            setPractices(practicesData);
        } catch (err: any) {
            setError(err.message || 'Failed to load catalog data');
            console.error('Catalog load error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        loadData();
    }, [loadData]);

    // Handle filtering
    const filterByCategory = useCallback(async (categoryId: string | null) => {
        setSelectedCategoryId(categoryId);
        try {
            setLoading(true); // Optional: show loading indicator while filtering
            let data;
            if (categoryId) {
                data = await catalogService.getPracticesByCategory(categoryId);
            } else {
                data = await catalogService.getPractices();
            }
            setPractices(data);
        } catch (err: any) {
            setError(err.message || 'Failed to filter practices');
            console.error('Filter error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        categories,
        practices,
        loading,
        error,
        selectedCategoryId,
        filterByCategory,
        refresh: loadData
    };
};
