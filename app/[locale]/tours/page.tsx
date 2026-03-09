'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin, Tag, Clock, Star, Filter, X, ArrowRight } from 'lucide-react';
import { fetchAPI, getImageUrl } from '@/lib/api';
import { Tour, Category, Destination } from '@/types/tour';

// Static fallback options when API is empty
const fallbackDestinations = [
    { id: 1, name: 'Machu Picchu', slug: 'machu-picchu', is_active: true },
    { id: 2, name: 'Cusco', slug: 'cusco', is_active: true },
    { id: 3, name: 'Valle Sagrado', slug: 'valle-sagrado', is_active: true },
    { id: 4, name: 'Lago Titicaca', slug: 'lago-titicaca', is_active: true },
    { id: 5, name: 'Arequipa', slug: 'arequipa', is_active: true },
];

const fallbackCategories = [
    { id: 1, name: 'Trekking', slug: 'trekking', is_active: true },
    { id: 2, name: 'Cultura', slug: 'cultura', is_active: true },
    { id: 3, name: 'Aventura', slug: 'aventura', is_active: true },
    { id: 4, name: 'Naturaleza', slug: 'naturaleza', is_active: true },
];

function TourCard({ tour }: { tour: Tour }) {
    return (
        <Link href={`/tours/${tour.slug}`} className="group bg-white rounded-2xl shadow-md overflow-hidden hover-lift border border-brand-50 hover:border-brand-200 transition-all">
            <div className="relative h-52 overflow-hidden">
                <img
                    src={getImageUrl(tour.primary_image || (tour.images?.[0]?.image_path ?? null))}
                    alt={tour.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {tour.featured && (
                    <div className="absolute top-3 left-3 bg-accent-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> Destacado
                    </div>
                )}
                <div className="absolute bottom-3 right-3 bg-brand-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                    ${tour.price}
                </div>
            </div>
            <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-medium">
                        {typeof tour.category === 'object' && tour.category !== null
                            ? (tour.category as Category).name
                            : (tour.category as string | undefined) ?? 'Tour'}
                    </span>
                    {tour.duration && (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {tour.duration}
                        </span>
                    )}
                </div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-brand-700 transition-colors line-clamp-2">
                    {tour.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">{tour.short_description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {typeof tour.destination === 'object' && tour.destination !== null
                            ? (tour.destination as Destination).name
                            : (tour.destination as string | undefined) ?? 'Cusco'}
                    </span>
                    <span className="text-brand-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Ver tour <ArrowRight className="w-3 h-3" />
                    </span>
                </div>
            </div>
        </Link>
    );
}

function ToursContent() {
    const searchParams = useSearchParams();
    const q = searchParams.get('q') ?? '';
    const destParam = searchParams.get('destination') ?? '';
    const catParam = searchParams.get('category') ?? '';

    const [tours, setTours] = useState<Tour[]>([]);
    const [allTours, setAllTours] = useState<Tour[]>([]);
    const [categories, setCategories] = useState<{ id: number; name: string; slug: string; is_active: boolean }[]>([]);
    const [destinations, setDestinations] = useState<{ id: number; name: string; slug: string; is_active: boolean }[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(q);
    const [destination, setDestination] = useState(destParam);
    const [category, setCategory] = useState(catParam);

    useEffect(() => {
        async function load() {
            try {
                const [toursRes, cats, dests] = await Promise.all([
                    fetchAPI('/tours?per_page=100') as any,
                    fetchAPI('/categories') as any,
                    fetchAPI('/destinations') as any,
                ]);
                const toursData: Tour[] = toursRes.data ?? toursRes ?? [];
                setAllTours(toursData);
                setCategories(cats?.length ? cats : fallbackCategories);
                setDestinations(dests?.length ? dests : fallbackDestinations);
            } catch {
                setCategories(fallbackCategories);
                setDestinations(fallbackDestinations);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    useEffect(() => {
        let filtered = allTours;
        if (search) {
            filtered = filtered.filter(t =>
                t.name.toLowerCase().includes(search.toLowerCase()) ||
                (t.short_description ?? '').toLowerCase().includes(search.toLowerCase()) ||
                (typeof t.destination === 'object'
                    ? (t.destination?.name ?? '')
                    : (t.destination ?? '')
                ).toLowerCase().includes(search.toLowerCase())
            );
        }
        if (destination) {
            filtered = filtered.filter(t => {
                const dest = t.destination;
                return typeof dest === 'object' && dest !== null
                    ? (dest as Destination).slug === destination
                    : false;
            });
        }
        if (category) {
            filtered = filtered.filter(t => {
                const cat = t.category;
                return typeof cat === 'object' && cat !== null
                    ? (cat as Category).slug === category
                    : false;
            });
        }
        setTours(filtered);
    }, [allTours, search, destination, category]);

    const clearFilters = () => {
        setSearch('');
        setDestination('');
        setCategory('');
    };

    const hasFilters = search || destination || category;

    return (
        <>
            {/* Search Bar */}
            <section className="bg-white border-b border-brand-100 py-6 sticky top-0 z-30 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-3 max-w-5xl mx-auto">
                        <div className="flex-[2] relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400" />
                            <input
                                type="text"
                                placeholder="Buscar tours (ej: Machu Picchu, trekking...)"
                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-brand-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition text-gray-900"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400 pointer-events-none" />
                            <select
                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-brand-200 focus:border-brand-500 outline-none transition text-gray-900 appearance-none bg-white"
                                value={destination}
                                onChange={e => setDestination(e.target.value)}
                            >
                                <option value="">Todos los destinos</option>
                                {destinations.map(d => (
                                    <option key={d.id} value={d.slug}>{d.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1 relative">
                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400 pointer-events-none" />
                            <select
                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-brand-200 focus:border-brand-500 outline-none transition text-gray-900 appearance-none bg-white"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            >
                                <option value="">Todas las categorías</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.slug}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                        {hasFilters && (
                            <button
                                onClick={clearFilters}
                                className="px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600 transition flex items-center gap-2 whitespace-nowrap"
                            >
                                <X className="w-4 h-4" /> Limpiar
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Results */}
            <section className="py-10 bg-gray-50 min-h-[50vh]">
                <div className="container mx-auto px-4">
                    {/* Results count */}
                    <div className="flex items-center justify-between mb-6 max-w-6xl mx-auto">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Filter className="w-4 h-4" />
                            <span className="font-medium">
                                {loading ? 'Cargando...' : `${tours.length} tour${tours.length !== 1 ? 's' : ''} encontrado${tours.length !== 1 ? 's' : ''}`}
                            </span>
                            {hasFilters && (
                                <span className="text-brand-600 text-sm">
                                    {q && `para "${search}"`} {destination && `en ${destinations.find(d => d.slug === destination)?.name}`}
                                </span>
                            )}
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl h-80 animate-pulse">
                                    <div className="h-52 bg-gray-200 rounded-t-2xl"></div>
                                    <div className="p-5 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : tours.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {tours.map(tour => <TourCard key={tour.id} tour={tour} />)}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-gray-700 mb-3">No encontramos tours</h3>
                            <p className="text-gray-500 mb-6">
                                Intenta con otras palabras clave o{' '}
                                <button onClick={clearFilters} className="text-brand-600 font-medium hover:underline">
                                    limpia los filtros
                                </button>
                            </p>
                            <a
                                href="https://wa.me/51995669380?text=Hola%2C%20busco%20un%20tour%20especial"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-block"
                            >
                                Consultar por WhatsApp
                            </a>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default function ToursPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative bg-gradient-to-r from-brand-800 to-brand-600 text-white py-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-10 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-20 w-72 h-72 bg-brand-200/20 rounded-full blur-3xl"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                        Nuestros <span className="text-brand-200">Tours</span>
                    </h1>
                    <p className="text-lg text-brand-100 max-w-2xl mx-auto">
                        Explora nuestro catálogo completo de experiencias únicas en Perú. Filtra por destino, categoría o busca directamente.
                    </p>
                </div>
            </section>

            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
                </div>
            }>
                <ToursContent />
            </Suspense>
        </>
    );
}
