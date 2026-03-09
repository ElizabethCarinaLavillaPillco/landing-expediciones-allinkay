'use client';

import React, { useState } from 'react';
import { Search, MapPin, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchEngineProps {
    destinations?: { id: number; name: string; slug: string }[];
    categories?: { id: number; name: string; slug: string }[];
}

const SearchEngine = ({ destinations = [], categories = [] }: SearchEngineProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [destination, setDestination] = useState('');
    const [category, setCategory] = useState('');
    const router = useRouter();

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const params = new URLSearchParams();
        if (searchTerm) params.append('q', searchTerm);
        if (destination) params.append('destination', destination);
        if (category) params.append('category', category);
        router.push(`/tours?${params.toString()}`);
    };

    const fallbackDestinations = [
        { id: 1, name: 'Machu Picchu', slug: 'machu-picchu' },
        { id: 2, name: 'Cusco', slug: 'cusco' },
        { id: 3, name: 'Valle Sagrado', slug: 'valle-sagrado' },
        { id: 4, name: 'Lago Titicaca', slug: 'lago-titicaca' },
    ];

    const fallbackCategories = [
        { id: 1, name: 'Trekking', slug: 'trekking' },
        { id: 2, name: 'Cultura', slug: 'cultura' },
        { id: 3, name: 'Aventura', slug: 'aventura' },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto -mt-20 relative z-40 px-4">
            <form onSubmit={handleSearch}>
                <div className="bg-white rounded-3xl shadow-2xl p-2 md:p-3 flex flex-col md:flex-row items-stretch gap-2 md:gap-3 border border-brand-100">
                    {/* Search Term */}
                    <div className="flex-[2] relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-brand-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <input
                            type="text"
                            placeholder="¿A dónde quieres ir? (ej: Machu Picchu)"
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-400 transition-all text-gray-900 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Destination Select */}
                    <div className="flex-1 relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-brand-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <select
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-400 transition-all text-gray-900 appearance-none outline-none"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        >
                            <option value="">Todos los destinos</option>
                            {(destinations.length > 0 ? destinations : fallbackDestinations).map((dest) => (
                                <option key={dest.id} value={dest.slug}>{dest.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Category Select */}
                    <div className="flex-1 relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Tag className="h-5 w-5 text-brand-500 group-hover:scale-110 transition-transform" />
                        </div>
                        <select
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-400 transition-all text-gray-900 appearance-none outline-none"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Todas las categorías</option>
                            {(categories.length > 0 ? categories : fallbackCategories).map((cat) => (
                                <option key={cat.id} value={cat.slug}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="md:w-auto px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
                    >
                        <Search className="w-5 h-5" />
                        <span>Buscar</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchEngine;
