'use client';

import Link from 'next/link';
import { Clock, MapPin, TrendingUp, ArrowRight, Tag } from 'lucide-react';
import { Tour } from '@/types/tour';
import { getImageUrl } from '@/lib/api';

interface TrekkingToursProps {
    tours: Tour[];
}

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case 'Fácil':
            return 'bg-green-500';
        case 'Moderado':
            return 'bg-yellow-500';
        case 'Difícil':
            return 'bg-orange-500';
        case 'Muy Difícil':
            return 'bg-red-500';
        default:
            return 'bg-turquoise-500';
    }
};

export default function TrekkingTours({ tours = [] }: TrekkingToursProps) {
    if (!tours || tours.length === 0) {
        return null; // Don't show the section if no trekking tours match
    }

    return (
        <section className="py-20 bg-gradient-to-b from-white to-turquoise-50/30 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <div className="absolute top-1/4 right-0 w-64 h-64 bg-turquoise-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-lightblue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block relative mb-4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 relative">
                            Top Trekking Tours a <span className="gradient-text-turquoise">Machu Picchu</span>
                            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-turquoise-400 to-lightblue-400 rounded-full"></div>
                        </h2>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
                        Vive la experiencia inolvidable de llegar a la ciudadela inca por las rutas más espectaculares.
                        Cada trekking ofrece paisajes únicos y una conexión profunda con la naturaleza y la historia.
                    </p>
                </div>

                {/* Tours Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tours.map((tour, index) => (
                        <div
                            key={tour.id}
                            className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border-2 border-transparent hover:border-turquoise-200 animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={getImageUrl(tour.primary_image || (tour.images && tour.images.length > 0 ? tour.images[0].image_path : null))}
                                    alt={tour.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                                {/* Difficulty Badge */}
                                {tour.difficulty && (
                                    <div className="absolute top-4 right-4">
                                        <span className={`${getDifficultyColor(tour.difficulty || '')} text-white text-xs font-bold px-3 py-1 rounded-full capitalize`}>
                                            {tour.difficulty}
                                        </span>
                                    </div>
                                )}

                                {/* Title */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-white text-xl font-bold">{tour.name}</h3>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                                    {tour.short_description || (tour.description ? tour.description.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' : '')}
                                </p>

                                {/* Stats */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Clock className="w-4 h-4 mr-2 text-turquoise-500" />
                                        <span>Duración: {tour.duration}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <MapPin className="w-4 h-4 mr-2 text-turquoise-500" />
                                        <span>Destino: {typeof tour.destination === 'string' ? tour.destination : tour.destination?.name || 'Varios'}</span>
                                    </div>
                                </div>

                                {/* Highlights as Tags */}
                                {tour.highlights && tour.highlights.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {tour.highlights.slice(0, 2).map((highlight, i) => (
                                            <span key={i} className="text-[10px] bg-turquoise-50 text-turquoise-700 px-2 py-0.5 rounded-md flex items-center gap-1 border border-turquoise-100">
                                                <Tag className="w-2.5 h-2.5" />
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Price and CTA */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div>
                                        <span className="block text-xs text-gray-500">Desde</span>
                                        <span className="text-2xl font-bold text-turquoise-600">${tour.price}</span>
                                    </div>
                                    <a
                                        href={`https://wa.me/51995669380?text=Hola,%20me%20interesa%20el%20tour%20${encodeURIComponent(tour.name)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-gradient-to-r from-turquoise-500 to-lightblue-500 text-white px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
                                    >
                                        <span>Reservar</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        href="/tours?search=Machu+Picchu"
                        className="inline-flex items-center gap-2 bg-white border-2 border-turquoise-500 text-turquoise-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-turquoise-500 hover:text-white hover:shadow-lg hover:shadow-turquoise-500/30 hover:scale-105"
                    >
                        <span>Ver Todos los Tours</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
