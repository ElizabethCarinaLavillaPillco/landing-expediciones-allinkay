import Link from 'next/link';
import { MapPin, Mountain, Sun, Building, ArrowRight, Clock, Star } from 'lucide-react';
import { Destination } from '@/types/tour';
import { getImageUrl } from '@/lib/api';

// Destination icons
const destinationIcons: Record<string, React.FC<{ className?: string }>> = {
    'LocationIcon': MapPin,
    'MountainIcon': Mountain,
    'SunIcon': Sun,
    'CityIcon': Building
};

interface DestinationsProps {
    destinations: Destination[];
}

export default function Destinations({ destinations = [] }: DestinationsProps) {
    if (!destinations || destinations.length === 0) return null;

    return (
        <section className="py-20 bg-gradient-to-b from-white to-turquoise-50/30 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden z-0">
                {/* Animated circles */}
                <div className="absolute top-1/4 left-10 w-32 h-32 bg-turquoise-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
                <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-lightblue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

                {/* Decorative lines */}
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-turquoise-200/30 to-transparent opacity-50"></div>
                <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-lightblue-200/30 to-transparent opacity-50"></div>
                <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-accent-200/30 to-transparent opacity-50"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block relative mb-4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 relative">
                            Descubre Otros <span className="gradient-text-turquoise">Destinos</span>
                            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-turquoise-400 to-lightblue-400 rounded-full"></div>
                        </h2>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
                        El Perú tiene mucho más que ofrecer. Explora nuestras experiencias en los destinos más fascinantes del país.
                    </p>
                </div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {destinations.map((destination, index) => {
                        const IconComponent = MapPin;

                        return (
                            <Link
                                href={`/tours/destination/${destination.slug}`}
                                key={destination.id}
                                className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl animate-fade-in"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                {/* Background Image with Parallax Effect */}
                                <div className="relative h-80 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-turquoise-900/50 to-lightblue-900/50 z-10"></div>
                                    <img
                                        src={getImageUrl(destination.image)}
                                        alt={destination.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />

                                    {/* Animated Particles */}
                                    <div className="absolute inset-0 z-0">
                                        {[...Array(6)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                                                style={{
                                                    top: `${Math.random() * 100}%`,
                                                    left: `${Math.random() * 100}%`,
                                                    animationDelay: `${Math.random() * 2}s`,
                                                    animationDuration: `${2 + Math.random() * 2}s`
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 flex flex-col justify-between p-6 z-20">
                                        {/* Top: Title and Icon */}
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
                                                    <IconComponent className="w-4 h-4 mr-2 text-accent-300" />
                                                    <span className="text-white text-sm font-medium">{destination.tours_count || 0} Tours</span>
                                                </div>
                                                <h3 className="text-2xl md:text-3xl font-bold text-white">{destination.name}</h3>
                                            </div>
                                            <div className="transform transition-transform duration-500 group-hover:rotate-12">
                                                <MapPin className="w-8 h-8 text-white/80" />
                                            </div>
                                        </div>

                                        {/* Bottom: Description and Stats */}
                                        <div className="transform transition-all duration-500 translate-y-8 group-hover:translate-y-0 opacity-80 group-hover:opacity-100">
                                            <p className="text-white/90 mb-4 line-clamp-2 text-sm">{destination.description}</p>

                                            {/* Stats Grid */}
                                            <div className="grid grid-cols-3 gap-2 mb-4">
                                                <div className="text-center bg-white/10 rounded-lg py-2">
                                                    <div className="text-lg font-bold text-accent-300">{destination.tours_count || 0}</div>
                                                    <div className="text-xs text-white/70">Tours</div>
                                                </div>
                                                <div className="text-center bg-white/10 rounded-lg py-2">
                                                    <div className="text-lg font-bold text-accent-300">Explore</div>
                                                    <div className="text-xs text-white/70">Perú</div>
                                                </div>
                                                <div className="text-center bg-white/10 rounded-lg py-2">
                                                    <div className="text-lg font-bold text-accent-300">4.9</div>
                                                    <div className="text-xs text-white/70">Rating</div>
                                                </div>
                                            </div>

                                            {/* CTA Button */}
                                            <div className="w-full bg-gradient-to-r from-turquoise-500 to-lightblue-500 text-white px-4 py-2 rounded-full text-center font-medium transition-transform group-hover:scale-105 flex items-center justify-center gap-2">
                                                <span>Descubrir {destination.name}</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Glow Effect on Hover */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-turquoise-400/20 to-lightblue-400/20 blur-sm"></div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom Text */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
                        ¿Quieres visitar varios destinos?{' '}
                        <span className="font-semibold text-turquoise-600">Creamos itinerarios personalizados</span> que combinan los mejores lugares del Perú.
                    </p>
                    <Link
                        href="/contacto"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-turquoise-500 to-lightblue-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-turquoise-500/30 hover:scale-105"
                    >
                        <span>Planificar Mi Viaje</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
