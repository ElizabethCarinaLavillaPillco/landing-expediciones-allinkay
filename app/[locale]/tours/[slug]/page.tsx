'use client';

import { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { fetchAPI, getImageUrl } from '@/lib/api';
import { Tour } from '@/types/tour';
import Image from 'next/image';
import { Clock, MapPin, Users, Calendar, CheckCircle, XCircle, Star, Globe, Mountain, Gauge, Heart, Share2, ChevronRight } from 'lucide-react';
import BookingForm from '@/components/booking/BookingForm';
import { useCart } from '@/contexts/CartContext';
import SimilarTours from '@/components/sections/SimilarTours';

interface TourPageProps {
    params: {
        slug: string;
        locale: string;
    };
}

export default function TourDetailPage({ params }: TourPageProps) {
    const [tour, setTour] = useState<Tour | null>(null);
    const [loading, setLoading] = useState(true);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const router = useRouter();
    const { addToCart } = useCart();

    useEffect(() => {
        async function loadTour() {
            try {
                const data = await fetchAPI(`/tours/${params.slug}`) as Tour;
                setTour(data);
            } catch (error) {
                console.error('Failed to load tour:', error);
            } finally {
                setLoading(false);
            }
        }
        loadTour();
    }, [params.slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-200 border-t-brand-600"></div>
                    <p className="text-slate-500 font-medium animate-pulse">Cargando experiencia...</p>
                </div>
            </div>
        );
    }

    if (!tour) {
        notFound();
    }

    const handleAddToCart = () => {
        addToCart(tour);
        alert('Tour añadido al carrito correctamente!');
    };

    const handleBookNow = () => {
        setShowBookingForm(true);
    };

    const handleWhatsApp = () => {
        const message = `Hola, estoy interesado en el tour: ${tour.name}. ¿Podrían darme más información?`;
        window.open(`https://wa.me/51995669380?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleShare = async () => {
        const shareData = {
            title: tour.name,
            text: tour.short_description,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('¡Enlace copiado al portapapeles!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const images = [
        tour.primary_image || (tour.images && tour.images.length > 0 ? tour.images[0].image_path : null),
        ...(tour.images?.slice(1).map(img => img.image_path) || [])
    ].filter(Boolean);

    return (
        <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">

            {/* ============================================== */}
            {/* HERO SECTION: Galería Moderna                 */}
            {/* ============================================== */}
            <section className="bg-white">
                <div className="container mx-auto px-4 py-6">
                    {/* Layout de Galería tipo Grid Masonry para Desktop */}
                    <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-3 h-[500px] rounded-2xl overflow-hidden shadow-lg">
                        {/* Imagen Principal (Izquierda grande) */}
                        <div className="col-span-2 row-span-2 relative group">
                            <img
                                src={getImageUrl(images[0])}
                                alt={tour.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Imágenes Secundarias (Derecha) */}
                        {images.slice(1, 5).map((img, index) => (
                            <div key={index} className="relative group overflow-hidden">
                                <img
                                    src={getImageUrl(img)}
                                    alt={`${tour.name} vista ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Overlay para la última imagen si hay más de 5 */}
                                {index === 3 && images.length > 4 && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/60 transition-colors cursor-pointer">
                                        <span className="text-white font-bold text-xl">+{images.length - 4} Fotos</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Layout Móvil: Slider simple o Imagen única */}
                    <div className="md:hidden relative h-[300px] rounded-xl overflow-hidden shadow-md">
                        <img
                            src={getImageUrl(images[0])}
                            alt={tour.name}
                            className="w-full h-full object-cover"
                        />
                        {/* Badges flotantes en móvil */}
                        <div className="absolute top-4 left-4 z-10">
                            <span className="bg-white/90 backdrop-blur-sm text-brand-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                {typeof tour.category === 'object' ? tour.category?.name : tour.category}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                    {/* ============================================== */}
                    {/* COLUMNA IZQUIERDA: Contenido Principal         */}
                    {/* ============================================== */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Header del Tour (Escritorio) */}
                        <div className="hidden md:block border-b border-slate-100 pb-6">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {typeof tour.destination === 'object' ? tour.destination?.name : tour.destination}
                                </span>
                                {tour.featured && (
                                    <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                        Destacado
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                                {tour.name}
                            </h1>
                        </div>

                        {/* Atributos Rápidos (Diseño Moderno) */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { icon: Clock, label: 'Duración', value: tour.duration },
                                { icon: MapPin, label: 'Ubicación', value: typeof tour.destination === 'object' ? tour.destination?.name : tour.destination },
                                { icon: Mountain, label: 'Altitud', value: tour.altitude ? `${tour.altitude}m` : 'N/A' },
                                { icon: Gauge, label: 'Dificultad', value: tour.difficulty }
                            ].map((item, index) => (
                                <div key={index} className="bg-white border border-slate-100 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
                                    <item.icon className="w-6 h-6 text-brand-500 mb-2" />
                                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">{item.label}</span>
                                    <span className="text-sm font-bold text-slate-800 mt-0.5">{item.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Descripción */}
                        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Globe className="w-6 h-6 text-brand-500" />
                                Descripción
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-4 font-medium text-lg">
                                {tour.short_description}
                            </p>
                            <div
                                className="prose prose-slate max-w-none prose-p:text-slate-600 prose-headings:text-slate-900"
                                dangerouslySetInnerHTML={{ __html: tour.description }}
                            />
                        </section>

                        {/* Highlights (Diseño Cards) */}
                        {tour.highlights && tour.highlights.length > 0 && (
                            <section className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl p-6 md:p-8 text-white shadow-lg">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                                    <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                                    Puntos Destacados
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {tour.highlights.map((highlight, index) => (
                                        <div key={index} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                                            <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm font-medium text-white">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Itinerario (Timeline Mejorado) */}
                        {tour.itinerary && tour.itinerary.length > 0 && (
                            <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Calendar className="w-6 h-6 text-brand-500" />
                                    Itinerario
                                </h2>
                                <div className="relative">
                                    {/* Línea vertical conectada principal */}
                                    <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-slate-100" />

                                    <div className="space-y-6">
                                        {tour.itinerary.map((day: any, index: number) => (
                                            <div key={index} className="relative flex gap-4">
                                                {/* Indicador de día */}
                                                <div className="z-10 flex flex-col items-center">
                                                    <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold shadow-md ring-4 ring-white">
                                                        {day.day?.replace(/\D/g, '') || index + 1}
                                                    </div>
                                                </div>

                                                {/* Contenido del día */}
                                                <div className="flex-1 bg-slate-50 rounded-xl p-5 border border-slate-100 hover:border-brand-200 transition-colors">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-bold text-slate-900">{day.title}</h3>
                                                        <span className="text-xs font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-2 py-0.5 rounded">
                                                            Día {day.day}
                                                        </span>
                                                    </div>
                                                    <p className="text-slate-600 text-sm leading-relaxed mb-3">
                                                        {day.description}
                                                    </p>

                                                    {/* Items como lista vertical tipo timeline */}
                                                    {day.items && day.items.length > 0 && (
                                                        <div className="relative pt-3 border-t border-slate-100">
                                                            {/* Línea vertical para los items */}
                                                            <div className="absolute left-[7px] top-3 bottom-2 w-px bg-slate-200" />

                                                            <div className="space-y-2">
                                                                {day.items.map((item: string, i: number) => (
                                                                    <div key={i} className="relative flex items-start gap-3 pl-4">
                                                                        {/* Punto indicador para cada item */}
                                                                        <div className="absolute left-0 top-2 w-3.5 h-3.5 rounded-full bg-white border-2 border-brand-400 flex-shrink-0 z-10" />

                                                                        {/* Texto del item */}
                                                                        <span className="text-sm text-slate-700 leading-relaxed">
                                                                            {item}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Incluye / No Incluye */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {tour.included && tour.included.length > 0 && (
                                <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        Incluye
                                    </h3>
                                    <ul className="space-y-3">
                                        {tour.included.map((item, index) => (
                                            <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {tour.not_included && tour.not_included.length > 0 && (
                                <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <XCircle className="w-5 h-5 text-red-400" />
                                        No Incluye
                                    </h3>
                                    <ul className="space-y-3">
                                        {tour.not_included.map((item, index) => (
                                            <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>
                    </div>

                    {/* ============================================== */}
                    {/* COLUMNA DERECHA: Sidebar de Reserva           */}
                    {/* ============================================== */}
                    <div className="hidden lg:block">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
                                {/* Precio Header */}
                                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-xs font-medium text-slate-300 uppercase tracking-wider block mb-1">Precio por persona</span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-4xl font-extrabold tracking-tight">${tour.price}</span>
                                                <span className="text-slate-300 text-sm">USD</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                                                <Heart className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={handleShare}
                                                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                            >
                                                <Share2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Cuerpo del Card */}
                                <div className="p-6">
                                    {!showBookingForm ? (
                                        <div className="space-y-4">
                                            <button
                                                onClick={handleBookNow}
                                                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:translate-y-[-1px] shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
                                            >
                                                Reservar Ahora
                                                <ChevronRight className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={handleAddToCart}
                                                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 px-6 rounded-xl transition-colors border border-slate-200 text-sm"
                                            >
                                                Añadir al Carrito
                                            </button>

                                            <div className="relative py-4">
                                                <div className="absolute inset-0 flex items">
                                                    <div className="w-full border-t border-slate-100"></div>
                                                </div>
                                                <div className="relative flex justify-center">
                                                    <span className="bg-white px-4 text-xs text-slate-400 font-medium uppercase">o contacto directo</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleWhatsApp}
                                                className="w-full bg-[#25D366] hover:bg-[#1DAE54] text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 text-sm"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" /></svg>
                                                WhatsApp
                                            </button>
                                        </div>
                                    ) : (
                                        <BookingForm tour={tour} onClose={() => setShowBookingForm(false)} />
                                    )}

                                    {/* Trust Badges */}
                                    <div className="mt-6 pt-6 border-t border-slate-100">
                                        <div className="grid grid-cols-3 gap-2 text-center">
                                            <div>
                                                <div className="text-2xl mb-1">🛡️</div>
                                                <span className="text-[10px] text-slate-500 font-medium block">Seguro</span>
                                            </div>
                                            <div>
                                                <div className="text-2xl mb-1">⚡</div>
                                                <span className="text-[10px] text-slate-500 font-medium block">Confirmación<br />Rápida</span>
                                            </div>
                                            <div>
                                                <div className="text-2xl mb-1">💬</div>
                                                <span className="text-[10px] text-slate-500 font-medium block">Soporte<br />24/7</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================== */}
            {/* BARRA DE COMPRA FIJA EN MÓVIL                 */}
            {/* ============================================== */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 p-4 shadow-2xl shadow-black/10">
                <div className="flex justify-between items-center max-w-lg mx-auto">
                    <div>
                        <span className="text-xs text-slate-500 font-medium">Desde</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-extrabold text-slate-900">${tour.price}</span>
                            <span className="text-xs text-slate-500">/ persona</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleWhatsApp}
                            className="p-3 bg-green-500 rounded-full text-white shadow-md hover:bg-green-600 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" /></svg>
                        </button>
                        <button
                            onClick={handleBookNow}
                            className="bg-brand-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-brand-700 transition-colors"
                        >
                            Reservar
                        </button>
                    </div>
                </div>
            </div>

            <SimilarTours
                currentTourId={tour.id}
                category={tour.category}
                destination={tour.destination}
            />
        </main>
    );
}