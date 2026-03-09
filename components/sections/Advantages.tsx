'use client';

import Link from 'next/link';
import { Shield, Headphones, User, Car, Clock, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

// Advantages data
const advantages = [
    {
        id: 1,
        title: "Seguridad y Seguimiento",
        description: "Tu seguridad es nuestra prioridad. Monitoreamos cada etapa de tu viaje para garantizar una experiencia sin preocupaciones.",
        icon: Shield,
        features: [
            "Monitoreo 24/7 durante tu viaje",
            "Seguro de viaje incluido",
            "Protocolos de emergencia",
            "Seguimiento en tiempo real"
        ]
    },
    {
        id: 2,
        title: "Atención Personalizada",
        description: "Tratamos a cada cliente como único. Adaptamos nuestros servicios a tus necesidades y preferencias específicas.",
        icon: Headphones,
        features: [
            "Asignación de coordinador personal",
            "Itinerarios flexibles",
            "Atención antes, durante y después",
            "Soporte multilingüe"
        ]
    },
    {
        id: 3,
        title: "Guías Certificados",
        description: "Nuestros guías son profesionales certificados con profundo conocimiento de la cultura e historia local del Perú.",
        icon: User,
        features: [
            "Guías locales expertos",
            "Certificación oficial",
            "Conocimiento histórico y cultural",
            "Primeros auxilios certificados"
        ]
    },
    {
        id: 4,
        title: "Recojo de Aeropuerto",
        description: "Olvida las preocupaciones de transporte. Te recogemos del aeropuerto y te llevamos a tu hotel sin costo adicional.",
        icon: Car,
        features: [
            "Traslados incluidos",
            "Vehículos cómodos y seguros",
            "Conductor profesional",
            "Disponible 24 horas"
        ]
    },
    {
        id: 5,
        title: "Horarios Flexibles",
        description: "Adaptamos nuestros horarios a tu conveniencia. Ofrecemos salidas diarias y horarios personalizables.",
        icon: Clock,
        features: [
            "Salidas diarias garantizadas",
            "Horarios personalizables",
            "Flexibilidad en cambios",
            "Opciones privadas y grupales"
        ]
    },
    {
        id: 6,
        title: "Buenos Precios",
        description: "Ofrecemos la mejor relación calidad-precio. Sin costos ocultos y opciones para todos los presupuestos.",
        icon: DollarSign,
        features: [
            "Precios transparentes",
            "Descuentos por grupo",
            "Opciones para todos los bolsillos",
            "Promociones especiales"
        ]
    }
];

export default function Advantages() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="py-20 bg-gradient-to-br from-white to-turquoise-50/50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden z-0">
                {/* Dot pattern */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(circle, rgba(20, 184, 166, 0.3) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}></div>

                {/* Animated circles */}
                <div className="absolute top-20 right-20 w-32 h-32 bg-turquoise-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-40 h-40 bg-lightblue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse animation-delay-2000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block relative mb-4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 relative">
                            ¿Qué nos hace <span className="gradient-text-turquoise">Diferentes</span>?
                            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-turquoise-400 to-lightblue-400 rounded-full"></div>
                        </h2>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
                        En Expediciones Allinkay, nos esforzamos por ofrecer una experiencia superior.
                        Descubre por qué miles de viajeros confían en nosotros.
                    </p>
                </div>

                {/* Advantages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {advantages.map((advantage, index) => {
                        const IconComponent = advantage.icon;

                        return (
                            <div
                                key={advantage.id}
                                className="group relative bg-white rounded-2xl shadow-lg p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border-2 border-transparent hover:border-turquoise-200 animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Animated Icon Container */}
                                <div className="relative inline-block mb-4">
                                    <div className="absolute -inset-2 bg-gradient-to-r from-turquoise-400 to-lightblue-400 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                                    <div className="relative bg-gradient-to-br from-turquoise-50 to-lightblue-50 rounded-full w-16 h-16 flex items-center justify-center">
                                        <IconComponent className="w-8 h-8 text-turquoise-600" />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-turquoise-600 transition-colors">
                                    {advantage.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                                    {advantage.description}
                                </p>

                                {/* Features List */}
                                <div className="space-y-2">
                                    {advantage.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                                            <CheckCircle className="w-4 h-4 mr-2 text-turquoise-500 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Decorative Corner */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-turquoise-100/50 to-lightblue-100/50 rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        );
                    })}
                </div>

                {/* Quality Guarantee Section */}
                <div className="mt-16 bg-gradient-to-r from-turquoise-600 to-lightblue-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden animate-fade-in">
                    {/* Animated Particles - Only rendered on client */}
                    <div className="absolute inset-0">
                        {mounted && [...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    animationDuration: `${3 + Math.random() * 2}s`
                                }}
                            />
                        ))}
                    </div>

                    <div className="relative z-10">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                            {/* Text Content */}
                            <div className="lg:max-w-xl">
                                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                    Nuestra <span className="text-accent-300">Garantía de Calidad</span>
                                </h3>
                                <p className="text-white/90">
                                    Nos comprometemos a ofrecerte la mejor experiencia de viaje. Si algo no cumple tus expectativas,
                                    haremos todo lo posible para corregirlo y asegurarnos de que tu aventura sea inolvidable.
                                </p>
                            </div>

                            {/* CTA Button */}
                            <div className="flex-shrink-0">
                                <Link
                                    href="/contacto"
                                    className="inline-flex items-center bg-white text-turquoise-700 px-6 py-3 rounded-full font-bold transition-all duration-300 hover:shadow-lg hover:scale-105 group"
                                >
                                    <span>Habla con un Experto</span>
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            {[
                                { icon: Shield, text: "Seguridad Garantizada" },
                                { icon: DollarSign, text: "Mejor Precio" },
                                { icon: Headphones, text: "Soporte 24/7" },
                                { icon: CheckCircle, text: "Satisfacción Garantizada" }
                            ].map((badge, index) => (
                                <div key={index} className="flex items-center justify-center p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                                    <badge.icon className="w-5 h-5 mr-2 text-accent-300" />
                                    <span className="text-sm font-medium">{badge.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
