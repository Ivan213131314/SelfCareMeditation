export interface Category {
    id: string;
    name: string;
    icon: string;
}

export interface Practice {
    id: string;
    title: string;
    description: string;
    duration: number; // in minutes
    category_id: string;
    image_url: string;
    audio_url: string;
}

export interface JournalEntry {
    id: string;
    user_id: string;
    emoji: string;
    shortcuts: string[];
    text: string;
    practice_id?: string;
    created_at: string;
}

export interface CreateJournalEntryDTO {
    emoji: string;
    shortcuts: string[];
    text: string;
    practice_id?: string;
}
