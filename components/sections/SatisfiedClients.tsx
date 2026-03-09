'use client';

import { useState, useEffect } from 'react';
import { Star, CheckCircle2, Quote, ExternalLink, Instagram, Facebook, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const googleReviews = [
    {
        id: 1,
        author: "María García",
        rating: 5,
        date: "hace 2 meses",
        avatar: "M",
        avatarBg: "bg-orange-500",
        comment: "Todas las atenciones fabulosas, la coordinacion magistral, super. Excelentes contactos. Nosotros nos vamos muy contentos por toda su atencion y logistica, el servicio genial.",
        verified: true
    },
    {
        id: 2,
        author: "Carla Rodríguez",
        rating: 5,
        date: "hace 3 semanas",
        avatar: "C",
        avatarBg: "bg-blue-600",
        comment: "Encantada de conocer Cusco, Peru. El trato fue excelente, todo muy lindo. Muy agradecida con el servicio brindado por Expediciones Allinkay.",
        verified: true
    },
    {
        id: 3,
        author: "Ana Silva",
        rating: 5,
        date: "hace 1 mes",
        avatar: "A",
        avatarBg: "bg-green-600",
        comment: "Les recomiendo viajar con la Sra. Ines, excelente el tour a Machupicchu. Todo estuvo muy bien organizado y el guía fue muy amable.",
        verified: true
    },
    {
        id: 4,
        author: "Juan Pérez",
        rating: 5,
        date: "hace 5 meses",
        avatar: "J",
        avatarBg: "bg-purple-600",
        comment: "¡Gracias por el increíble tour a Machu Picchu! Desde el primer contacto todo fue muy profesional. Me ayudaron con todos los detalles.",
        verified: true
    }
];

const clientPhotos = [
    "/images/insta1.jpg",
    "/images/insta2.jpg",
    "/images/insta3.jpg",
    "/images/insta4.jpg",
    "/images/machupicchu-1.jpg",
    "/images/sacsayhuaman-1.jpg"
];

const testimonyVideos = [
    { id: 1, thumbnail: "/images/insta1.jpg", videoUrl: "/videos/videoRecomendado1.mp4", title: "Experiencia en Cusco" },
    { id: 2, thumbnail: "/images/insta2.jpg", videoUrl: "/videos/videoRecomendado2.mp4", title: "Aventura Allinkay" },
    { id: 3, thumbnail: "/images/insta3.jpg", videoUrl: "/videos/videoRecomendado3.mp4", title: "Testimonio de Viaje" }
];

export default function SatisfiedClients() {
    const [videoIdx, setVideoIdx] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const nextVideo = () => {
        setVideoIdx((prev) => (prev + 1) % testimonyVideos.length);
        setIsPlaying(false);
    };
    const prevVideo = () => {
        setVideoIdx((prev) => (prev - 1 + testimonyVideos.length) % testimonyVideos.length);
        setIsPlaying(false);
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-200 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-brand-100 rounded-full blur-3xl opacity-30"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="flex -space-x-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <span className="text-gray-600 font-bold">4.9 / 5.0</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Nuestros Clientes <span className="text-brand-600">Satisfechos</span>
                    </h2>

                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Color_Icon.svg"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            <span className="text-sm font-semibold text-gray-700">Reseñas en Google Maps</span>
                        </div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
                            La satisfacción de nuestros clientes es nuestra mejor recompensa.
                            Mira lo que dicen sobre su experiencia con Expediciones Allinkay.
                        </p>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {googleReviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                        >
                            {/* Review Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-full ${review.avatarBg} flex items-center justify-center text-white font-bold text-lg shadow-inner`}>
                                        {review.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{review.author}</h4>
                                        <div className="flex items-center gap-1.5">
                                            <div className="flex">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-medium">• {review.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-1.5 bg-gray-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ExternalLink className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>

                            {/* Verified Badge */}
                            {review.verified && (
                                <div className="flex items-center gap-1 mb-3">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 fill-brand-50" />
                                    <span className="text-[10px] font-bold text-brand-700 uppercase tracking-widest">Viajero Verificado</span>
                                </div>
                            )}

                            {/* Quote Icon */}
                            <div className="mb-3">
                                <Quote className="w-6 h-6 text-brand-100 fill-brand-50" />
                            </div>

                            {/* Comment */}
                            <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                                {review.comment}
                            </p>

                            {/* Footer Logo */}
                            <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Color_Icon.svg"
                                    alt="Google"
                                    className="w-4 h-4 grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* New Section: Photos and Videos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-20">
                    {/* Photos Column */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-8 h-1 bg-brand-500 rounded-full"></span>
                            Nuestros Clientes Satisfechos
                        </h3>
                        <div className="grid grid-cols-3 gap-3 mb-8">
                            {clientPhotos.map((photo, i) => (
                                <div key={i} className="aspect-square relative overflow-hidden rounded-xl shadow-md group">
                                    <img
                                        src={photo}
                                        alt={`Cliente satisfecha ${i + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://instagram.com/expediciones_allinkay1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all"
                            >
                                <Instagram className="w-5 h-5" />
                                Seguir en Instagram
                            </a>
                            <a
                                href="https://www.facebook.com/share/1DdxhFgpV3/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-[#1877F2] text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all"
                            >
                                <Facebook className="w-5 h-5" />
                                Seguir en Facebook
                            </a>
                        </div>
                    </div>

                    {/* Videos Column */}
                    <div className="relative">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="w-8 h-1 bg-brand-500 rounded-full"></span>
                            Testimonios en Video
                        </h3>
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900 group">
                            {!isPlaying ? (
                                <>
                                    <img
                                        src={testimonyVideos[videoIdx].thumbnail}
                                        alt={testimonyVideos[videoIdx].title}
                                        className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button
                                            onClick={() => setIsPlaying(true)}
                                            className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white/40 transition-all hover:scale-110 group/btn"
                                        >
                                            <Play className="w-8 h-8 fill-white" />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                        <p className="text-white font-bold text-lg">{testimonyVideos[videoIdx].title}</p>
                                    </div>
                                </>
                            ) : (
                                <video
                                    src={testimonyVideos[videoIdx].videoUrl}
                                    className="w-full h-full object-contain"
                                    autoPlay
                                    controls
                                    onEnded={() => setIsPlaying(false)}
                                />
                            )}

                            {/* Navigation */}
                            <button
                                onClick={prevVideo}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextVideo}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Video Thumbnails/Pills */}
                        <div className="flex justify-center gap-2 mt-4">
                            {testimonyVideos.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setVideoIdx(i);
                                        setIsPlaying(false);
                                    }}
                                    className={`h-2 rounded-full transition-all ${videoIdx === i ? 'w-8 bg-brand-500' : 'w-2 bg-gray-300'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Google Maps CTA */}
                <div className="text-center mt-20">
                    <a
                        href="https://www.google.com/maps/place/Expediciones+Allinkay+E.I.R.L./@-13.5242424,-71.9740766,17z/data=!3m1!4b1!4m6!3m5!1s0x916dd57ec876becb:0xe67872a5177eed56!8m2!3d-13.5242476!4d-71.9715017!16s%2Fg%2F11x7d870t1?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-white border-2 border-brand-200 text-brand-700 px-8 py-3 rounded-full font-bold hover:bg-brand-50 hover:border-brand-500 transition-all duration-300 shadow-sm"
                    >
                        Escribir una reseña en Google
                        <ExternalLink className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </section>
    );
}
