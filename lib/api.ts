// Tour types
export interface Tour {
    id: number;
    name: string;
    slug: string;
    short_description?: string;
    description?: string;
    price: number;
    duration: string;
    altitude?: number;
    difficulty?: 'easy' | 'moderate' | 'difficult';
    languages?: string[];
    primary_image?: string;
    images?: { image_path: string }[];
    featured?: boolean;
    category?: string;
    location?: string;
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

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Generic fetch function
export async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options?.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

// Get image URL
export function getImageUrl(path: string | null | undefined): string {
    if (!path) {
        return 'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    }

    // URL completa = devolver tal cual
    if (path.startsWith('http')) {
        return path;
    }

    // ✅ IMÁGENES ESTÁTICAS DEL FRONTEND (Vercel)
    // Ej: /images/codigo-esnna.jpg → https://www.expedicionesallinkay.com/images/codigo-esnna.jpg
    if (path.startsWith('/images/')) {
        // Usa la URL del frontend (sitio web), no de la API
        return `https://www.expedicionesallinkay.com${path}`;
    }

    // ✅ IMÁGENES DINÁMICAS DE LA API (Hostinger/Laravel)
    // Ej: tours/01KK0S50Q4YQ3MZ3SQZ24Y4JKY.webp → https://api.expedicionesallinkay.com/storage/tours/...
    return `https://api.expedicionesallinkay.com/storage/${path}`;
}