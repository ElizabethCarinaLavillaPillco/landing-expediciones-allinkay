import { Metadata } from 'next';
import Link from 'next/link';
import { Heart, BookOpen, Shield, PhoneCall } from 'lucide-react';
import { getImageUrl } from '@/lib/api';

export const metadata: Metadata = {
    title: 'Código ESNNA | Expediciones Allinkay',
    description: 'Expediciones Allinkay se compromete con la protección de los derechos de los niños y adolescentes, cumpliendo el Código de Conducta ESNNA del sector turismo.',
};

export default function CodigoEsnnaPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative bg-gradient-to-r from-brand-700 to-brand-800 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-10 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob"></div>
                    <div className="absolute bottom-10 left-20 w-80 h-80 bg-accent-400/10 rounded-full blur-3xl animate-blob animation-delay-200"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6 text-sm font-medium">
                        <Heart className="w-4 h-4 text-accent-400" />
                        <span>Turismo Responsable y Ético</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                        Código <span className="text-accent-400">ESNNA</span>
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto text-brand-100 animate-fade-in animation-delay-200">
                        Protección de los derechos de los niños, niñas y adolescentes
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Visual */}
                        <div className="flex flex-col items-center justify-center order-2 lg:order-1">
                            <div className="relative w-full max-w-md">
                                <div className="absolute -inset-4 bg-gradient-to-r from-brand-400 to-brand-500 rounded-3xl blur-xl opacity-30 animate-pulse-slow"></div>
                                <div className="relative bg-white rounded-3xl p-4 border border-brand-100 shadow-2xl overflow-hidden">
                                    <img
                                        src={getImageUrl('/images/codigo-esnna.jpg')}
                                        alt="Código ESNNA - Protección Infantil"
                                        className="w-full h-auto rounded-2xl"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Text */}
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-6">
                                Nuestro Compromiso con la <span className="gradient-text-brand">Protección Infantil</span>
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                                <p className="text-lg">
                                    En Expediciones Allinkay, estamos firmemente comprometidos con la protección de los derechos de los niños y adolescentes. Apoyamos y cumplimos rigurosamente con el <strong className="text-brand-800">Código ESNNA</strong>, que busca prevenir y erradicar la explotación infantil en todas sus formas.
                                </p>
                                <p className="text-lg">
                                    Hemos implementado políticas internas que garantizan que ninguna forma de explotación infantil sea tolerada en nuestras operaciones o en las de nuestros colaboradores.
                                </p>
                            </div>

                            {/* Principles */}
                            <div className="bg-brand-50 rounded-2xl p-6 mb-8 border border-brand-100">
                                <h3 className="text-lg font-bold text-brand-800 mb-4">Nuestros Principios</h3>
                                <ul className="space-y-3">
                                    {[
                                        'Rechazo total a cualquier forma de explotación infantil',
                                        'Promoción de prácticas turísticas responsables y éticas',
                                        'Capacitación continua de nuestro personal en protección infantil',
                                        'Colaboración con autoridades y organizaciones especializadas',
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <Heart className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://www.gob.pe/8960-actualizate-sobre-el-codigo-de-conducta-para-la-proteccion-de-ninos-ninas-y-adolescentes-en-el-sector-viajes-y-turismo-no-a-la-explotacion-infantil"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary text-center"
                                >
                                    Más sobre el Código ESNNA
                                </a>
                                <Link href="/contacto" className="btn-secondary text-center">
                                    Contáctanos
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Cards */}
            <section className="py-20 bg-gradient-to-b from-white to-brand-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-4">
                            ¿Qué es el <span className="gradient-text-brand">Código ESNNA</span>?
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            El Código de Conducta para la Protección de Niños, Niñas y Adolescentes en el Sector Viajes y Turismo es una iniciativa para combatir la explotación sexual infantil en el turismo.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <BookOpen className="w-8 h-8 text-brand-600" />,
                                bg: 'bg-brand-100',
                                title: 'Objetivo Principal',
                                desc: 'Prevenir la explotación sexual de niños, niñas y adolescentes en el sector turístico, promoviendo un turismo responsable y ético.',
                            },
                            {
                                icon: <Shield className="w-8 h-8 text-brand-600" />,
                                bg: 'bg-brand-200',
                                title: 'Compromiso del Sector',
                                desc: 'Empresas turísticas, gobiernos y organizaciones civiles se unen para implementar medidas de protección y denuncia de casos de explotación.',
                            },
                            {
                                icon: <PhoneCall className="w-8 h-8 text-brand-600" />,
                                bg: 'bg-brand-100',
                                title: 'Canal de Denuncia',
                                desc: 'Se establecen líneas de atención para reportar cualquier situación sospechosa de explotación infantil, garantizando la confidencialidad.',
                            },
                        ].map((card) => (
                            <div key={card.title} className="bg-white rounded-2xl shadow-lg p-8 hover-lift border border-brand-100">
                                <div className={`w-16 h-16 ${card.bg} rounded-full flex items-center justify-center mb-4`}>
                                    {card.icon}
                                </div>
                                <h3 className="text-xl font-bold text-brand-800 mb-3">{card.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-br from-brand-700 to-brand-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent-400/10 rounded-full blur-2xl"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Juntos por un <span className="text-accent-400">Turismo Responsable</span>
                    </h2>
                    <p className="text-xl text-brand-100 mb-8">
                        En Expediciones Allinkay, creemos en un turismo que respete los derechos humanos y promueva el desarrollo sostenible de nuestras comunidades. Tu colaboración es fundamental.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contacto" className="bg-white text-brand-700 px-8 py-4 rounded-full font-semibold hover:bg-brand-50 transition hover:scale-105 inline-block">
                            Únete a Nuestra Causa
                        </Link>
                        <a
                            href="https://www.mincetur.gob.pe/turismo-sostenible/codigo-de-conducta-para-la-proteccion-de-ninos-ninas-y-adolescentes-en-el-sector-viajes-y-turismo/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-glass inline-block"
                        >
                            Conoce Más sobre el Código
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
