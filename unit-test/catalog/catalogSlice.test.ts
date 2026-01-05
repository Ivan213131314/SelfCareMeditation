import catalogReducer, { setCategories, setPractices, setCatalogData } from '@/store/slices/catalogSlice';
import { Category, Practice } from '@/types/models';

// --- Test Data ---
const mockCategories: Category[] = [
    { id: 'c1', name: 'Meditation', icon: 'icon-1' },
    { id: 'c2', name: 'Yoga', icon: 'icon-2' },
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

describe('Catalog Slice Behavioral Contract', () => {
    const initialState = {
        categories: [],
        practices: [],
        lastFetch: null,
    };

    it('should return the initial state for unknown action', () => {
        expect(catalogReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setCategories (State Mutation)', () => {
        const actual = catalogReducer(initialState, setCategories(mockCategories));
        expect(actual.categories).toEqual(mockCategories);
        // Practices remain untouched
        expect(actual.practices).toEqual([]);
    });

    it('should handle setPractices (State Mutation)', () => {
        const actual = catalogReducer(initialState, setPractices(mockPractices));
        expect(actual.practices).toEqual(mockPractices);
        // Categories remain untouched
        expect(actual.categories).toEqual([]);
    });

    it('should handle setCatalogData (Batch Update)', () => {
        // Mock Date.now to ensure deterministic timestamp check
        const mockDate = 1234567890;
        jest.spyOn(Date, 'now').mockReturnValue(mockDate);

        const payload = { categories: mockCategories, practices: mockPractices };
        const actual = catalogReducer(initialState, setCatalogData(payload));

        expect(actual.categories).toEqual(mockCategories);
        expect(actual.practices).toEqual(mockPractices);
        expect(actual.lastFetch).toBe(mockDate);

        jest.restoreAllMocks();
    });
});
