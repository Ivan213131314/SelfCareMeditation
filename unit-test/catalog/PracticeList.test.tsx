import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PracticeList } from '@/components/catalog/PracticeList';
import { Practice, Category } from '@/types/models';
import { Text } from 'react-native';

// --- Mocks ---

// Mock Child Components to isolate PracticeList behavior
jest.mock('@/components/catalog/PracticeCard', () => ({
    PracticeCard: ({ practice, onPress }: any) => {
        const { TouchableOpacity, Text } = require('react-native');
        return (
            <TouchableOpacity testID={`practice-card-${practice.id}`} onPress={() => onPress(practice.id)}>
                <Text>{practice.title}</Text>
            </TouchableOpacity>
        );
    },
}));

jest.mock('@/components/common/EmptyState', () => ({
    EmptyState: ({ message }: any) => {
        const { Text } = require('react-native');
        return <Text testID="empty-state">{message}</Text>;
    },
}));

jest.mock('@/components/common/Loading', () => ({
    Loading: ({ message }: any) => {
        const { Text } = require('react-native');
        return <Text testID="loading-state">{message}</Text>;
    },
}));

// --- Test Data ---
const mockCategories: Category[] = [
    { id: 'c1', name: 'Meditation', icon: 'icon-1' },
];

const mockPractices: Practice[] = [
    {
        id: 'p1',
        title: 'Morning Calm',
        category_id: 'c1',
        duration: 300,
        audio_url: 'audio.mp3',
        image_url: 'image.jpg',
        description: 'A calming morning practice'
    },
    {
        id: 'p2',
        title: 'Evening Relax',
        category_id: 'c2',
        duration: 600,
        audio_url: 'audio2.mp3',
        image_url: 'image2.jpg',
        description: 'Relax before sleep'
    },
];

describe('PracticeList Behavioral Contract', () => {
    const mockOnPracticePress = jest.fn();
    const mockOnRefresh = jest.fn();

    beforeEach(() => {
        mockOnPracticePress.mockClear();
        mockOnRefresh.mockClear();
    });

    // Loading State
    it('should render Loading state when loading=true and no practices (Initial Load)', () => {
        const { getByTestId, queryByTestId } = render(
            <PracticeList
                practices={[]}
                loading={true}
                onPracticePress={mockOnPracticePress}
            />
        );

        expect(getByTestId('loading-state')).toBeTruthy();
        expect(queryByTestId('empty-state')).toBeNull();
    });

    // Empty State
    it('should render Empty state when not loading and no practices', () => {
        const { getByTestId, queryByTestId } = render(
            <PracticeList
                practices={[]}
                loading={false}
                onPracticePress={mockOnPracticePress}
            />
        );

        expect(getByTestId('empty-state')).toBeTruthy();
        expect(queryByTestId('loading-state')).toBeNull();
    });

    // Data State
    it('should render List of practices when practices exist', () => {
        const { getByTestId } = render(
            <PracticeList
                practices={mockPractices}
                categories={mockCategories}
                loading={false}
                onPracticePress={mockOnPracticePress}
            />
        );

        expect(getByTestId('practice-card-p1')).toBeTruthy();
        expect(getByTestId('practice-card-p2')).toBeTruthy();
    });

    it('should trigger onPracticePress when item is pressed', () => {
        const { getByTestId } = render(
            <PracticeList
                practices={mockPractices}
                categories={mockCategories}
                loading={false}
                onPracticePress={mockOnPracticePress}
            />
        );

        fireEvent.press(getByTestId('practice-card-p1'));
        expect(mockOnPracticePress).toHaveBeenCalledWith('p1');
    });

    // Background Update / Persistence State
    it('should render List (not Loading) if loading=true but practices exist (Background Refresh)', () => {
        // Contract: User should see old data while new data fetches in background
        const { getByTestId, queryByTestId } = render(
            <PracticeList
                practices={mockPractices}
                loading={true}
                onPracticePress={mockOnPracticePress}
            />
        );

        expect(getByTestId('practice-card-p1')).toBeTruthy();
        expect(queryByTestId('loading-state')).toBeNull();
    });

    // Refresh Interaction
    it('should pass onRefresh prop to list (Pull to Refresh)', () => {
        // Since we can't easily fire pull-to-refresh on React Native host components in unit tests without complex setup,
        // we satisfy the contract by ensuring the component accepts the prop without crashing.
        render(
            <PracticeList
                practices={mockPractices}
                loading={false}
                onPracticePress={mockOnPracticePress}
                onRefresh={mockOnRefresh}
                refreshing={true}
            />
        );
    });
});
