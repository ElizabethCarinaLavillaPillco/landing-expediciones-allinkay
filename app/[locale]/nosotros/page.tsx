import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Heart, Star, Award, Users, MapPin, CheckCircle } from 'lucide-react';
import SatisfiedClients from '@/components/sections/SatisfiedClients';

export const metadata: Metadata = {
    title: 'Nosotros | Expediciones Allinkay',
    description: 'Conoce a Expediciones Allinkay, agencia de turismo certificada en Cusco, Perú. Nuestra misión: brindarte aventuras únicas e inolvidables en Machu Picchu, Valle Sagrado y más.',
};

const values = [
    {
        icon: <Shield className="w-7 h-7 text-brand-600" />,
        title: 'Seguridad',
        desc: 'Agencia certificada por GERCETUR. Operamos bajo supervisión oficial y seguimos los más altos estándares de seguridad turística.',
        bg: 'bg-brand-50',
    },
    {
        icon: <Heart className="w-7 h-7 text-rose-600" />,
        title: 'Pasión',
        desc: 'Somos cusqueños que amamos nuestra tierra. Compartimos esa pasión en cada tour, guiando con orgullo y autenticidad.',
        bg: 'bg-rose-50',
    },
    {
        icon: <Star className="w-7 h-7 text-accent-600" />,
        title: 'Excelencia',
        desc: 'Más de 10,000 viajeros satisfechos avalan nuestra calidad. Trabajamos día a día para superar expectativas.',
        bg: 'bg-accent-50',
    },
    {
        icon: <Users className="w-7 h-7 text-violet-600" />,
        title: 'Comunidad',
        desc: 'Apoyamos a las comunidades locales generando empleo digno e impulsando el turismo responsable y sostenible.',
        bg: 'bg-violet-50',
    },
];

const stats = [
    { value: '10,000+', label: 'Viajeros satisfechos' },
    { value: '50+', label: 'Destinos disponibles' },
    { value: '8+', label: 'Años de experiencia' },
    { value: '4.9★', label: 'Calificación promedio' },
];

export default function NosotrosPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative bg-gradient-to-r from-brand-900 to-brand-700 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-10 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob"></div>
                    <div className="absolute bottom-10 left-20 w-80 h-80 bg-brand-200/10 rounded-full blur-3xl animate-blob animation-delay-200"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6 text-sm font-medium">
                        <MapPin className="w-4 h-4 text-brand-200" />
                        <span>Cusco, Perú · Desde 2016</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                        Quiénes <span className="text-brand-200">Somos</span>
                    </h1>
                    <p className="text-xl text-brand-100 max-w-3xl mx-auto animate-fade-in animation-delay-200">
                        Somos una agencia de turismo cusqueña apasionada por compartir la magia del Perú con viajeros de todo el mundo.
                    </p>
                </div>
            </section>

            {/* Story + Mission */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        {/* Visual */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-brand-300 to-brand-500 rounded-3xl blur-xl opacity-20 animate-pulse-slow"></div>
                            <div className="relative bg-gradient-to-br from-brand-50 to-brand-100 rounded-3xl p-10 shadow-2xl border border-brand-200">
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {stats.map(stat => (
                                        <div key={stat.label} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-brand-100">
                                            <div className="text-2xl font-bold text-brand-700 mb-1">{stat.value}</div>
                                            <div className="text-xs text-gray-500">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Award className="w-8 h-8 text-white" />
                                    </div>
                                    <p className="text-brand-700 font-semibold text-sm">RUC: 20608596861</p>
                                    <p className="text-gray-500 text-xs mt-1">Expediciones Allinkay E.I.R.L.<br />Certificada por GERCETUR</p>
                                </div>
                            </div>
                        </div>

                        {/* Text */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
                                Nuestra <span className="gradient-text-brand">Historia</span>
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-lg mb-8">
                                <p>
                                    Expediciones Allinkay nació del sueño de un grupo de cusqueños apasionados por su cultura y territorio. &ldquo;Allinkay&rdquo; en quechua significa <strong className="text-brand-700">&ldquo;estar bien&rdquo;</strong> — y eso es exactamente lo que buscamos para cada uno de nuestros viajeros.
                                </p>
                                <p>
                                    Desde nuestra base en Cusco, operamos tours a los destinos más icónicos del Perú: <strong className="text-brand-700">Machu Picchu, Valle Sagrado, Montaña de 7 Colores, Lago Titicaca</strong> y muchos más, siempre con guías locales certificados y comprometidos con la excelencia.
                                </p>
                                <p>
                                    Somos una empresa <strong className="text-brand-700">100% digital</strong>, certificada por la Gerencia Regional de Comercio Exterior, Turismo y Artesanía (GERCETUR) del Gobierno Regional de Cusco.
                                </p>
                            </div>

                            <div className="space-y-3 mb-8">
                                {[
                                    'Guías locales bilingües certificados',
                                    'Tours personalizados para grupos y familias',
                                    'Precios transparentes sin costos ocultos',
                                    'Soporte 24/7 antes y durante el viaje',
                                ].map(item => (
                                    <div key={item} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0" />
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/tours" className="btn-primary text-center">Ver Nuestros Tours</Link>
                                <Link href="/contacto" className="btn-secondary text-center">Contáctanos</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-gradient-to-b from-white to-brand-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">
                            Nuestros <span className="gradient-text-brand">Valores</span>
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Estos principios guían cada decisión que tomamos y cada experiencia que diseñamos.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {values.map(val => (
                            <div key={val.title} className="bg-white rounded-2xl shadow-md p-7 hover-lift border border-brand-50 text-center">
                                <div className={`w-14 h-14 ${val.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                                    {val.icon}
                                </div>
                                <h3 className="text-lg font-bold text-brand-800 mb-3">{val.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="py-16 bg-brand-50 border-y border-brand-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-brand-900 mb-8">Reconocimientos y Certificaciones</h2>
                    <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
                        {[
                            { label: 'GERCETUR', desc: 'Agencia Certificada', emoji: '🏛️' },
                            { label: 'MINCETUR', desc: 'Registro Nacional de Turismo', emoji: '🇵🇪' },
                            { label: 'ESNNA', desc: 'Turismo Responsable', emoji: '❤️' },
                            { label: 'RUC 20608596861', desc: 'Persona Jurídica', emoji: '📋' },
                        ].map(badge => (
                            <div key={badge.label} className="bg-white rounded-2xl px-8 py-6 shadow-sm border border-brand-200 text-center">
                                <div className="text-3xl mb-2">{badge.emoji}</div>
                                <div className="font-bold text-brand-800 text-sm">{badge.label}</div>
                                <div className="text-gray-500 text-xs mt-1">{badge.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Satisfied Clients - Instagram, Videos, WhatsApp testimonials */}
            <SatisfiedClients />

            {/* CTA */}
            <section className="py-20 bg-gradient-to-br from-brand-700 to-brand-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-10 right-10 w-48 h-48 bg-brand-200/10 rounded-full blur-2xl"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        ¿Listo para tu próxima <span className="text-brand-200">aventura</span>?
                    </h2>
                    <p className="text-xl text-brand-100 mb-8">
                        Déjanos ser parte de tu historia. Contáctanos y diseñemos juntos el viaje de tus sueños por el Perú.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/tours" className="bg-white text-brand-700 px-8 py-4 rounded-full font-semibold hover:bg-brand-50 transition hover:scale-105 inline-block">
                            Explorar Tours
                        </Link>
                        <Link href="/contacto" className="btn-glass inline-block">
                            Habla con Nosotros
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
