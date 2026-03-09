'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Play, Pause, Phone, ArrowRight, Star, Users, Clock, MapPin, ShieldCheck, Award } from 'lucide-react';
import SearchEngine from '@/components/common/SearchEngine';
import { Category, Destination } from '@/types/tour';

// Counter animation component
// ... (Counter component same as before)
const Counter = ({ end, duration = 3, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        let animationId: number;

        const animateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationId = requestAnimationFrame(animateCount);
            }
        };

        animationId = requestAnimationFrame(animateCount);

        return () => cancelAnimationFrame(animationId);
    }, [end, duration, isVisible]);

    return <span ref={ref}>{count}{suffix}</span>;
};

// Hero slider data
const heroSlides = [
    {
        id: 1,
        type: 'image',
        src: 'https://aem-all.accor.com/content/dam/all/hubs/americas/latam/generic-images/all-magazine/machu-picchu-todo-lo-que-necesitas-saber-antes-de-viajar-2024-1.jpg',
        title: 'Machu Picchu',
        subtitle: 'Maravilla del Mundo'
    },
    {
        id: 2,
        type: 'image',
        src: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Monta%C3%B1a_de_los_7_colores.jpg',
        title: 'Montaña 7 Colores',
        subtitle: 'Naturaleza Excepcional'
    },
    {
        id: 3,
        type: 'image',
        src: 'https://www.peru.travel/Contenido/Noticia/Imagen/es/1297/1.0/Principal/Camino_Inca_Portada.jpg',
        title: 'Camino Inca',
        subtitle: 'Aventura Ancestral'
    },
    {
        id: 4,
        type: 'image',
        src: 'https://www.mountainpalcoyo.com/es/wp-content/uploads/2022/01/valle-sagrado-privado.jpg',
        title: 'Valle Sagrado',
        subtitle: 'Magia Inca'
    },
    {
        id: 5,
        type: 'image',
        src: 'https://terandes.com/wp-content/uploads/2024/07/tesoros-del-sur-del-peru-.jpg',
        title: 'Lago Titicaca',
        subtitle: 'Islas Flotantes'
    }

];

interface HeroProps {
    destinations?: Destination[];
    categories?: Category[];
}

const Hero = ({ destinations = [], categories = [] }: HeroProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Auto-advance slides
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
                {/* Background Slides */}
                <div className="absolute inset-0 z-0">
                    {heroSlides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                                }`}
                            style={{
                                transform: index === currentSlide
                                    ? `scale(1) translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
                                    : `scale(1.05)`
                            }}
                        >
                            <img
                                src={slide.src}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Overlays - Simplified, removed the color layer */}
                <div className="absolute inset-0 z-10">
                    {/* Darker bottom fade for readability */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
                    {/* Subtle top fade for header readability */}
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent"></div>
                </div>

                {/* Main Content */}
                <div className="relative z-20 h-full flex items-center">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl pt-10">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30 animate-fade-in-down">
                                <Star className="w-5 h-5 fill-accent-400 text-accent-400" />
                                <span className="text-white text-sm font-medium">
                                    Más de 10,000 viajeros satisfechos
                                </span>
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
                                Descubre la
                                <span className="block mt-2 bg-gradient-to-r from-accent-400 via-accent-300 to-lightblue-300 bg-clip-text text-transparent">
                                    Magia del Perú
                                </span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl animate-fade-in-up animation-delay-200">
                                Experiencias únicas que quedarán para siempre en tu memoria.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Side Decorations */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
                    <div className="flex flex-col gap-4">
                        <a href="https://www.facebook.com/share/1DdxhFgpV3/" target="_blank" rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                        <a href="https://instagram.com/expediciones_allinkay1" target="_blank" rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            </svg>
                        </a>
                        <a href="https://wa.me/51995669380" target="_blank" rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all">
                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute right-4 top-1/3 z-20 hidden xl:block">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 animate-float">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-turquoise-400 to-lightblue-500 flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-white font-semibold">Destinos Únicos</div>
                                <div className="text-white/60 text-sm">50+ lugares por descubrir</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Element 2: Pago Seguro */}
                <div className="absolute right-4 top-[45%] z-20 hidden xl:block animate-float" style={{ animationDelay: '1s' }}>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-white font-semibold">Pago Seguro</div>
                                <div className="text-white/60 text-sm">Transacciones 100% protegidas</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Element 3: Agencia Certificada */}
                <div className="absolute right-4 top-[58%] z-20 hidden xl:block animate-float" style={{ animationDelay: '2s' }}>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                                <Award className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-white font-semibold">Agencia Certificada</div>
                                <div className="text-white/60 text-sm">Licencia de turismo oficial</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide Indicators - Adjusted position */}
                <div className="absolute bottom-10 right-10 z-30 flex items-center gap-3">
                    {heroSlides.map((slide, index) => (
                        <button
                            key={slide.id}
                            onClick={() => setCurrentSlide(index)}
                            className={`group relative transition-all duration-300 ${index === currentSlide ? 'w-10' : 'w-2 hover:w-4'
                                }`}
                        >
                            <div className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                ? 'bg-accent-400 shadow-lg shadow-accent-400/50'
                                : 'bg-white/40 hover:bg-white/60'
                                }`}>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Search Engine - Integrated below the hero content with overlap */}
            <SearchEngine destinations={destinations} categories={categories} />
        </>
    );
};

export default Hero;