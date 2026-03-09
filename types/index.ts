export interface Tour {
    id: number;
    slug: string;
    language: 'es' | 'en' | 'pt';
    name: string;
    description: string;
    shortDescription: string;
    duration: string;
    destination: string;
    category: string;
    price: number;
    itinerary?: ItineraryDay[];
    faqs?: FAQ[];
    highlights?: string[];
    included?: string[];
    notIncluded?: string[];
    featured: boolean;
    metaTitle?: string;
    metaDescription?: string;
    primaryImage: string;
    images?: TourImage[];
    createdAt: string;
    updatedAt: string;
}

export interface ItineraryDay {
    day: string;
    title: string;
    description: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface TourImage {
    id: number;
    url: string;
    altText?: string;
    isPrimary: boolean;
}

export interface Booking {
    id?: number;
    tourId: number;
    name: string;
    email: string;
    phone: string;
    country: string;
    travelDate: string;
    numberOfPeople: number;
    additionalNotes?: string;
    status?: 'pending' | 'contacted' | 'confirmed' | 'cancelled';
    createdAt?: string;
}

export interface APIResponse<T> {
    data: T;
    message?: string;
    error?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}
