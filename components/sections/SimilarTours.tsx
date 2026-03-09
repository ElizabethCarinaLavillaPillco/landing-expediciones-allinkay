'use client';

import { useState, useEffect } from 'react';
import { Tour } from '@/types/tour';
import { fetchAPI, getImageUrl } from '@/lib/api';
import Link from 'next/link';
import { Clock, MapPin, Star, ArrowRight } from 'lucide-react';

interface SimilarToursProps {
    currentTourId: number;
    category?: string | { id: number; name: string; slug: string };
    destination?: string | { id: number; name: string; slug: string };
}

export default function SimilarTours({ currentTourId, category, destination }: SimilarToursProps) {
    const [tours, setTours] = useState<Tour[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSimilarTours() {
            try {
                // Determine filter params
                const categorySlug = typeof category === 'object' ? category.slug : category;
                const destinationSlug = typeof destination === 'object' ? destination.slug : destination;

                let url = '/tours?per_page=4';
                if (categorySlug) url += `&category=${categorySlug}`;
                else if (destinationSlug) url += `&destination=${destinationSlug}`;

                const res = await fetchAPI(url) as any;
                const fetchedTours: Tour[] = res.data ?? res ?? [];

                // Filter out the current tour and limit to 4
                setTours(fetchedTours.filter(t => t.id !== currentTourId).slice(0, 4));
            } catch (error) {
                console.error('Failed to load similar tours:', error);
            } finally {
                setLoading(false);
            }
        }

        loadSimilarTours();
    }, [currentTourId, category, destination]);

    if (loading || tours.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Tours Relacionados</h2>
                        <p className="text-gray-600">También te podrían gustar estas experiencias similares.</p>
                    </div>
                    <Link
                        href="/tours"
                        className="hidden md:flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors"
                    >
                        Ver todos los tours
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {tours.map((tour) => (
                        <Link
                            key={tour.id}
                            href={`/tours/${tour.slug}`}
                            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full border border-gray-100"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={getImageUrl(tour.primary_image || (tour.images && tour.images.length > 0 ? tour.images[0].image_path : null))}
                                    alt={tour.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-sm text-brand-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                        {typeof tour.category === 'object' ? tour.category?.name : tour.category || 'Tour'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                                    {tour.name}
                                </h3>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4 text-brand-500" />
                                        <span>{tour.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4 text-brand-500" />
                                        <span className="truncate max-w-[100px]">
                                            {typeof tour.destination === 'object' ? tour.destination?.name : tour.destination}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                    <div>
                                        <span className="text-xs text-gray-400 block">Desde</span>
                                        <span className="text-xl font-bold text-brand-600">${tour.price}</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
