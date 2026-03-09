export interface Category {
    id: number;
    name: string;
    slug: string;
    image?: string;
    description?: string;
    is_active: boolean;
    tours_count?: number;
}

export interface Destination {
    id: number;
    name: string;
    slug: string;
    image?: string;
    description?: string;
    is_active: boolean;
    tours_count?: number;
}

export interface TourImage {
    id: number;
    tour_id: number;
    image_path: string;
    alt_text?: string;
    is_primary: boolean;
    order: number;
}

export interface ItineraryDay {
    day: string;
    title?: string;
    description: string;
    items?: string[];
}

export interface Tour {
    id: number;
    slug: string;
    language: 'es' | 'en' | 'pt' | 'fr';
    name: string;
    description: string;
    short_description: string;
    duration: string;
    destination?: string | Destination;
    destination_id?: number;
    category?: string | Category;
    category_id?: number;
    price: number;
    altitude?: number;
    difficulty?: 'easy' | 'moderate' | 'difficult';
    languages?: string[];
    itinerary?: ItineraryDay[];
    faqs?: any[];
    highlights?: string[];
    included?: string[];
    not_included?: string[];
    is_active: boolean;
    featured: boolean;
    meta_title?: string;
    meta_description?: string;
    primary_image?: string;
    images?: TourImage[];
    created_at?: string;
    updated_at?: string;
}

export interface Booking {
    id: number;
    tour_id: number;
    tour?: Tour;
    name: string;
    email: string;
    phone: string;
    country: string;
    travel_date: string;
    number_of_people: number;
    additional_notes?: string;
    status: 'pending' | 'contacted' | 'confirmed' | 'cancelled' | 'completed';
    contacted_at?: string;
    confirmed_at?: string;
    created_at: string;
    updated_at: string;
}