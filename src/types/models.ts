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
