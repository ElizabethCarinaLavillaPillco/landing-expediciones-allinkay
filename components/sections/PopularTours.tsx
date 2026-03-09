'use client';

import { Tour } from '@/types/tour';
import { getImageUrl } from '@/lib/api';
import Link from 'next/link';
import { Clock, MapPin, Tag, ArrowRight, Mountain, Gauge, Globe } from 'lucide-react';

interface PopularToursProps {
    tours: Tour[];
    title?: string;
    description?: string;
}

// Tour Card Component
function TourCard({ tour, index }: { tour: Tour; index: number }) {
    return (
        <Link
            href={`/tours/${tour.slug}`}
            className="block group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl border-2 border-turquoise-100 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={getImageUrl(tour.primary_image || (tour.images && tour.images.length > 0 ? tour.images[0].image_path : null))}
                        alt={tour.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="inline-block bg-turquoise-500 px-2 py-1 rounded-full mb-2 text-xs">
                            {tour.category ? (typeof tour.category === 'string' ? tour.category : tour.category.name) : 'Tour'}
                        </span>
                        <h3 className="text-xl font-bold">{tour.name}</h3>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm flex-grow">
                        {tour.short_description || 'Descubre una experiencia única en este tour.'}
                    </p>

                    {/* Tour Info Grid */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-4 text-xs text-gray-500">
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1.5 text-turquoise-500 shrink-0" />
                            <span>{tour.duration}</span>
                        </div>
                        {tour.destination && (
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1.5 text-turquoise-500 shrink-0" />
                                <span className="truncate">
                                    {typeof tour.destination === 'string' ? tour.destination : tour.destination.name}
                                </span>
                            </div>
                        )}
                        {tour.altitude && (
                            <div className="flex items-center">
                                <Mountain className="w-4 h-4 mr-1.5 text-turquoise-500 shrink-0" />
                                <span>{tour.altitude}m</span>
                            </div>
                        )}
                        {tour.difficulty && (
                            <div className="flex items-center">
                                <Gauge className="w-4 h-4 mr-1.5 text-turquoise-500 shrink-0" />
                                <span className="capitalize">{tour.difficulty}</span>
                            </div>
                        )}
                        {tour.languages && tour.languages.length > 0 && (
                            <div className="flex items-center col-span-2">
                                <Globe className="w-4 h-4 mr-1.5 text-turquoise-500 shrink-0" />
                                <span>{tour.languages.join(', ')}</span>
                            </div>
                        )}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                        <div>
                            <span className="text-sm text-gray-500">Desde</span>
                            <div className="text-xl font-bold text-turquoise-600">${tour.price}</div>
                        </div>
                        <div className="bg-gradient-to-r from-turquoise-500 to-turquoise-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group-hover:shadow-lg relative overflow-hidden">
                            <span className="relative z-10">Reservar</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-lightblue-500 to-lightblue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function PopularTours({
    tours = [],
    title = "Top Tours Más Populares",
    description = "Descubre nuestras experiencias más solicitadas por viajeros de todo el mundo. Cada tour está cuidadosamente diseñado para ofrecerte lo mejor del Perú."
}: PopularToursProps) {
    // Use tours directly, map to ensure we have display values if needed
    const displayTours: Tour[] = tours.length > 0
        ? tours.map(t => ({
            ...t,
            destination: t.destination || 'Perú',
            category: t.category || 'Tour',
            highlights: t.highlights || []
        }))
        : [];

    return (
        <section className="py-16 bg-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-turquoise-100 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-lightblue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        {description}
                    </p>
                </div>

                {/* Tours Grid - 4 columns on large screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayTours.map((tour, index) => (
                        <TourCard key={tour.id} tour={tour} index={index} />
                    ))}
                </div>

                {/* View All Tours Button */}
                <div className="text-center mt-12 animate-fade-in animation-delay-800">
                    <Link
                        href="/tours"
                        className="inline-flex items-center bg-gradient-to-r from-turquoise-500 to-turquoise-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden group"
                    >
                        <span className="relative z-10">Ver Todos los Tours</span>
                        <ArrowRight className="w-5 h-5 ml-2 relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-lightblue-500 to-lightblue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
