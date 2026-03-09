'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink, Quote } from 'lucide-react';

// Google-style reviews — replace text/names with your real Google Maps reviews
const reviews = [
    {
        name: 'María González',
        country: 'España',
        avatar: 'MG',
        rating: 5,
        date: 'Diciembre 2024',
        text: '¡Experiencia increíble! El tour a Machu Picchu fue perfectamente organizado. Nuestro guía Edwin fue fantástico, muy detallado en las explicaciones históricas. La logística: trenes, buses, entradas — todo impecable sin ningún contratiempo. 100% recomendado.',
        tour: 'Tour Machu Picchu 1 día',
    },
    {
        name: 'James Wilson',
        country: 'United States',
        avatar: 'JW',
        rating: 5,
        date: 'Noviembre 2024',
        text: 'Amazing experience with Expediciones Allinkay! The Sacred Valley tour exceeded all our expectations. Carlos, our guide, was incredibly knowledgeable. The small group size made it feel very personal. Will definitely book again for our next Peru trip!',
        tour: 'Valle Sagrado Completo',
    },
    {
        name: 'Ana Oliveira',
        country: 'Brasil',
        avatar: 'AO',
        rating: 5,
        date: 'Octubre 2024',
        text: 'Experiência incrível! Fiz o tour Montanha 7 Cores e foi simplesmente mágico. O guia foi atencioso e profissional. A organização foi perfeita, nada teve que ser improvisado. Recomendo muito para quem quer conhecer o Peru com segurança e qualidade.',
        tour: 'Montaña de 7 Colores',
    },
    {
        name: 'Sophie Dubois',
        country: 'France',
        avatar: 'SD',
        rating: 5,
        date: 'Septiembre 2024',
        text: 'Merveilleux séjour organisé par Allinkay! Notre guide parlait parfaitement espagnol et anglais. Le circuit Machu Picchu était bien rythmé avec suffisamment de temps libre pour explorer. Prix très compétitifs par rapport à d\'autres agences.',
        tour: 'Machu Picchu 2 días',
    },
    {
        name: 'Carlos Mendoza',
        country: 'México',
        avatar: 'CM',
        rating: 5,
        date: 'Agosto 2024',
        text: 'Excelente agencia, muy profesional y confiable. Hicimos el Camino Inca con ellos y todo salió perfecto. El equipo de soporte respondió todas nuestras dudas antes del viaje. Los guías son conocedores y apasionados. Sin duda la mejor decisión de nuestro viaje.',
        tour: 'Camino Inca 4 días',
    },
    {
        name: 'Yuki Tanaka',
        country: 'Japan',
        avatar: 'YT',
        rating: 5,
        date: 'Julio 2024',
        text: 'Perfect organization from start to finish. I was traveling solo and felt completely safe and well taken care of. The City Tour Cusco was a great introduction to Peruvian history. Flexible with pickup times and very responsive on WhatsApp. Highly recommend!',
        tour: 'City Tour Cusco',
    },
];

const avatarColors = [
    'bg-brand-500', 'bg-violet-500', 'bg-emerald-500',
    'bg-rose-500', 'bg-amber-500', 'bg-indigo-500',
];

function GoogleGIcon() {
    return (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );
}

export default function Testimonials() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [startIdx, setStartIdx] = useState(0);
    const visible = 3;
    const max = reviews.length;

    const prev = () => {
        setStartIdx(i => Math.max(0, i - 1));
    };
    const next = () => {
        setStartIdx(i => Math.min(max - visible, i + 1));
    };

    const visible_reviews = reviews.slice(startIdx, startIdx + visible);

    return (
        <section className="py-20 bg-gradient-to-b from-brand-50 to-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 bg-white border border-brand-200 rounded-full px-5 py-2 mb-6 shadow-sm">
                        <GoogleGIcon />
                        <span className="text-sm font-semibold text-gray-700">Reseñas en Google</span>
                        <div className="flex items-center gap-0.5 ml-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <span className="font-bold text-gray-800">4.9</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">
                        Lo que dicen nuestros <span className="gradient-text-turquoise">viajeros</span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Más de 10,000 aventureros de todo el mundo han confiado en nosotros
                    </p>
                </div>

                {/* Cards - Desktop 3-up / Mobile single */}
                <div className="relative">
                    {/* Nav buttons */}
                    <button
                        onClick={prev}
                        disabled={startIdx === 0}
                        className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center border border-brand-200 disabled:opacity-30 hover:bg-brand-50 transition"
                    >
                        <ChevronLeft className="w-5 h-5 text-brand-700" />
                    </button>
                    <button
                        onClick={next}
                        disabled={startIdx >= max - visible}
                        className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center border border-brand-200 disabled:opacity-30 hover:bg-brand-50 transition"
                    >
                        <ChevronRight className="w-5 h-5 text-brand-700" />
                    </button>

                    {/* Review Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {visible_reviews.map((review, i) => (
                            <div
                                key={startIdx + i}
                                className="bg-white rounded-2xl shadow-lg p-7 border border-brand-100 hover-lift relative flex flex-col"
                            >
                                {/* Quote */}
                                <Quote className="w-8 h-8 text-brand-200 mb-4 absolute top-5 right-5" />

                                {/* Stars */}
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(review.rating)].map((_, j) => (
                                        <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                {/* Text */}
                                <p className="text-gray-700 leading-relaxed mb-5 flex-1 text-sm italic">
                                    &ldquo;{review.text}&rdquo;
                                </p>

                                {/* Tour tag */}
                                <div className="bg-brand-50 text-brand-700 text-xs px-3 py-1 rounded-full w-fit mb-5 font-medium">
                                    ✓ {review.tour}
                                </div>

                                {/* Reviewer */}
                                <div className="flex items-center justify-between border-t border-brand-50 pt-5">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 ${avatarColors[i % avatarColors.length]} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                                            {review.avatar}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                                            <p className="text-xs text-gray-400">{review.country} · {review.date}</p>
                                        </div>
                                    </div>
                                    <GoogleGIcon />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setStartIdx(Math.min(Math.max(0, i), max - visible))}
                            className={`w-2 h-2 rounded-full transition-all ${i >= startIdx && i < startIdx + visible ? 'bg-brand-500 w-6' : 'bg-brand-200'}`}
                        />
                    ))}
                </div>

                {/* Google Maps CTA */}
                <div className="text-center mt-10">
                    <a
                        href="https://maps.google.com/maps?q=Expediciones+Allinkay+Cusco"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white border-2 border-brand-300 text-brand-700 font-semibold px-6 py-3 rounded-full hover:bg-brand-50 transition hover:scale-105 shadow-sm"
                    >
                        <GoogleGIcon />
                        Ver todas las reseñas en Google
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}
