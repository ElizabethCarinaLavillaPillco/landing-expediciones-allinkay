import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, CheckCircle, Star, Award } from 'lucide-react';
import { getImageUrl } from '@/lib/api';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
    title: 'Agencia Certificada | Expediciones Allinkay',
    description: 'Expediciones Allinkay E.I.R.L. es una agencia certificada por GERCETUR - Gerencia Regional de Comercio Exterior, Turismo y Artesanía del Gobierno Regional Cusco.',
};

export default function AgenciaCertificadaPage({
    params: { locale }
}: {
    params: { locale: string };
}) {
    setRequestLocale(locale);
    return (
        <>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-brand-700 to-brand-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-10 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob"></div>
                    <div className="absolute bottom-10 left-20 w-80 h-80 bg-accent-400/10 rounded-full blur-3xl animate-blob animation-delay-200"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6 text-sm font-medium">
                        <Award className="w-4 h-4 text-accent-400" />
                        <span>Certificación Oficial GERCETUR</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                        Agencia <span className="text-accent-400">Certificada</span>
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto text-brand-100 animate-fade-in animation-delay-200">
                        Reconocida oficialmente por el Gobierno Regional Cusco
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Visual side */}
                        <div className="flex flex-col items-center justify-center order-2 lg:order-1">
                            <div className="relative w-full max-w-md">
                                <div className="absolute -inset-4 bg-gradient-to-r from-brand-400 to-brand-500 rounded-3xl blur-xl opacity-30 animate-pulse-slow"></div>
                                <div className="relative bg-white rounded-3xl p-4 border border-brand-100 shadow-2xl overflow-hidden">
                                    <img
                                        src={getImageUrl('/images/certificado-gercetur.jpg')}
                                        alt="Certificado GERCETUR - Expediciones Allinkay"
                                        className="w-full h-auto rounded-2xl"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Text side */}
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
                                Legitimidad y <span className="gradient-text-brand">Confianza Oficial</span>
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                                <p className="text-lg">
                                    <strong className="text-brand-800">Expediciones Allinkay E.I.R.L.</strong> cuenta con la certificación oficial de la <strong>Gerencia Regional de Comercio Exterior, Turismo y Artesanía (GERCETUR)</strong> del Gobierno Regional Cusco, que nos acredita como una agencia de viajes y turismo debidamente constituida y autorizada.
                                </p>
                                <p className="text-lg">
                                    Esta constancia oficial garantiza que cumplimos con todos los requisitos legales y de calidad para operar en el sector turístico, ofreciendo a nuestros clientes la seguridad y confianza que merecen al elegir nuestros servicios.
                                </p>
                            </div>

                            {/* Key Points */}
                            <div className="bg-brand-50 rounded-2xl p-6 mb-8 border border-brand-100">
                                <h3 className="text-lg font-bold text-brand-800 mb-4 flex items-center gap-2">
                                    <Star className="w-5 h-5 text-accent-500" />
                                    ¿Qué significa esta certificación?
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        'Operación legal y autorizada por el gobierno regional',
                                        'Compromiso con los estándares de calidad del sector turístico',
                                        'Servicios ofrecidos y comercializados exclusivamente de forma digital',
                                        'Garantía de transparencia y profesionalismo en cada servicio',
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/tours" className="btn-primary text-center">
                                    Explora Nuestros Tours
                                </Link>
                                <Link href="/contacto" className="btn-secondary text-center">
                                    Contáctanos
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gradient-to-b from-white to-brand-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">
                            ¿Por qué elegir una agencia <span className="gradient-text-brand">certificada</span>?
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Viajar con una agencia certificada por GERCETUR te brinda seguridad y garantías que no encontrarás en opciones no reguladas.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: '🛡️',
                                title: 'Total Seguridad',
                                desc: 'Tu inversión está protegida. Trabajamos bajo la supervisión y regulación de las autoridades turísticas regionales y nacionales.',
                            },
                            {
                                icon: '💰',
                                title: 'Precios Transparentes',
                                desc: 'Nuestras tarifas son claras y competitivas. Sin costos ocultos ni sorpresas, cumpliendo con las normativas de precios del sector.',
                            },
                            {
                                icon: '❤️',
                                title: 'Servicios Garantizados',
                                desc: 'Ofrecemos la garantía de que todos nuestros servicios cumplirán con los estándares de calidad prometidos en nuestros programas.',
                            },
                        ].map((card) => (
                            <div key={card.title} className="bg-white rounded-2xl shadow-lg p-8 hover-lift border border-brand-100 text-center">
                                <div className="text-5xl mb-4">{card.icon}</div>
                                <h3 className="text-xl font-bold text-brand-800 mb-3">{card.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-br from-brand-700 to-brand-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent-400/10 rounded-full blur-2xl"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Viaja con la <span className="text-accent-400">Tranquilidad que Mereces</span>
                    </h2>
                    <p className="text-xl text-brand-100 mb-8">
                        Al elegir Expediciones Allinkay, no solo estás eligiendo experiencias inolvidables, sino también la seguridad de viajar con una agencia certificada y respaldada por las autoridades turísticas más importantes del Cusco.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/tours" className="bg-white text-brand-700 px-8 py-4 rounded-full font-semibold hover:bg-brand-50 transition hover:scale-105 inline-block">
                            Reserva tu Aventura
                        </Link>
                        <Link href="/contacto" className="btn-glass inline-block">
                            Habla con un Experto
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
