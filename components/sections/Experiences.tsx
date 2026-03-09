import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/types/tour';
import { getImageUrl } from '@/lib/api';

interface ExperiencesProps {
    categories: Category[];
}

export default function Experiences({ categories = [] }: ExperiencesProps) {
    const hasCategories = categories && categories.length > 0;

    return (
        <section className="py-20 bg-gradient-to-br from-turquoise-900 via-turquoise-800 to-lightblue-900 text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden z-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-accent-400/20 rounded-full mix-blend-multiply filter blur-2xl"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-lightblue-400/20 rounded-full mix-blend-multiply filter blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-turquoise-500/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block relative mb-4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white relative">
                            Elige tu Propia <span className="text-accent-400">Experiencia</span>
                            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-accent-400 to-lightblue-400 rounded-full"></div>
                        </h2>
                    </div>
                    <p className="text-lg text-turquoise-100/80 max-w-2xl mx-auto mt-6">
                        Cada viaje es único. Descubre diferentes tipos de experiencias adaptadas a tus intereses y estilo de aventura.
                    </p>
                </div>

                {!hasCategories ? (
                    <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-turquoise-200">No hay categorías configuradas en el sistema todavía.</p>
                        <p className="text-xs text-turquoise-400/60 mt-2">Prueba a crear categorías en el panel de administración.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category, index) => (
                            <Link
                                href={`/tours/category/${category.slug}`}
                                key={category.id}
                                className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-fade-in"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                {/* Background Image */}
                                <div className="relative h-80 overflow-hidden">
                                    <img
                                        src={getImageUrl(category.image)}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                                        {/* Top: Category */}
                                        <div>
                                            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-3">
                                                <span className="text-white text-sm font-medium">{(category as any).tours_count || 0} Tours</span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-white">{category.name}</h3>
                                        </div>

                                        {/* Bottom: Description and CTA */}
                                        <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                                            <p className="text-white/90 mb-4 line-clamp-2">{category.description}</p>
                                            <div className="inline-flex items-center bg-white text-turquoise-700 px-4 py-2 rounded-full font-medium transition-transform group-hover:scale-105">
                                                <span>Explorar</span>
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Bottom Text */}
                <div className="text-center mt-12">
                    <p className="text-turquoise-100/80 max-w-2xl mx-auto">
                        ¿No encuentras lo que buscas?{' '}
                        <Link href="/contacto" className="text-accent-400 hover:text-accent-300 underline transition-colors">
                            Contáctanos
                        </Link>{' '}
                        y crearemos una experiencia personalizada para ti.
                    </p>
                </div>
            </div>
        </section>
    );
}
