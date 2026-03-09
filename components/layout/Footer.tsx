'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            {/* Decorative Line */}
            <div className="relative h-1 bg-gradient-to-r from-transparent via-turquoise-400 to-transparent overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-turquoise-500 to-transparent opacity-70 blur-sm"></div>
            </div>

            <footer className="bg-gradient-to-b from-turquoise-900 via-turquoise-800 to-turquoise-950 text-white pt-16 pb-8 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 right-20 w-40 h-40 bg-lightblue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-60 h-60 bg-accent-500/10 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                        {/* Logo & Description */}
                        <div className="lg:col-span-1">
                            <Link href="/" className="inline-block group mb-6">
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-turquoise-400 to-lightblue-500 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
                                    <div className="relative bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                                        <span className="text-accent-400 font-bold text-xl">Expediciones</span>
                                        <span className="text-white font-bold text-xl"> Allinkay</span>
                                    </div>
                                </div>
                            </Link>
                            <p className="text-turquoise-100/80 mb-6 leading-relaxed">
                                Descubre la magia del Perú con nuestros tours personalizados.
                                Vive experiencias únicas en los destinos más impresionantes del país.
                            </p>
                            {/* Social Links */}
                            <div className="flex gap-3">
                                <a href="https://www.facebook.com/share/1DdxhFgpV3/" target="_blank" rel="noopener noreferrer"
                                    className="group relative w-10 h-10">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
                                    <div className="relative w-full h-full rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </div>
                                </a>
                                <a href="https://instagram.com/expediciones_allinkay1" target="_blank" rel="noopener noreferrer"
                                    className="group relative w-10 h-10">
                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
                                    <div className="relative w-full h-full rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                        </svg>
                                    </div>
                                </a>
                                <a href="https://wa.me/51995669380" target="_blank" rel="noopener noreferrer"
                                    className="group relative w-10 h-10">
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
                                    <div className="relative w-full h-full rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
                                        </svg>
                                    </div>
                                </a>
                                <a href="https://www.tiktok.com/@exp_allinkay" target="_blank" rel="noopener noreferrer"
                                    className="group relative w-10 h-10">
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
                                    <div className="relative w-full h-full rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.67-3.92 9.6 9.6 0 0 0-.15-1.8V8.48a8.23 8.23 0 0 0 4.23 1.2 8.2 8.2 0 0 0 1.55-.15V6.69z" />
                                        </svg>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                                <span className="w-2 h-2 bg-accent-400 rounded-full mr-2 animate-pulse"></span>
                                Enlaces Importantes
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { name: 'Inicio', href: '/' },
                                    { name: 'Nosotros', href: '/nosotros' },
                                    { name: 'Tours a Machu Picchu', href: '/tours?q=machu+picchu' },
                                    { name: 'Tours en Cusco', href: '/tours?q=cusco' },
                                    { name: 'Otros Destinos', href: '/tours' },
                                    { name: 'Contacto', href: '/contacto' }
                                ].map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href}
                                            className="text-turquoise-100/80 hover:text-white transition-colors flex items-center group">
                                            <span className="w-1 h-1 bg-turquoise-400 rounded-full mr-2 group-hover:bg-accent-400 transition-colors"></span>
                                            <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                                                {link.name}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                                <span className="w-2 h-2 bg-accent-400 rounded-full mr-2 animate-pulse"></span>
                                Contacto
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 group">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-turquoise-500/30 transition-colors">
                                        <Phone className="w-5 h-5 text-accent-400" />
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">Teléfono</div>
                                        <a href="tel:+51995669380" className="text-turquoise-100/80 hover:text-white transition-colors">
                                            +51 995 669 380 <br />
                                            +51 990 179 027
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 group">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-turquoise-500/30 transition-colors">
                                        <Mail className="w-5 h-5 text-accent-400" />
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">Email</div>
                                        <a href="mailto:expedicionesallinkay158@gmail.com" className="text-turquoise-100/80 hover:text-white transition-colors text-sm">
                                            expedicionesallinkay158@gmail.com <br />
                                            ines158@hotmail.com
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 group">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-turquoise-500/30 transition-colors">
                                        <MapPin className="w-5 h-5 text-accent-400" />
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">Ubicación</div>
                                        <span className="text-turquoise-100/80">Av. Pachakutec A304, Wanchaq</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3 group">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-turquoise-500/30 transition-colors">
                                        <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-white font-medium">RUC</div>
                                        <span className="text-turquoise-100/80">20608596861</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Legal Links */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                                <span className="w-2 h-2 bg-accent-400 rounded-full mr-2 animate-pulse"></span>
                                Seguridad
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { name: 'Agencia Certificada', href: '/certificada' },
                                    { name: 'Términos y Condiciones', href: '/terminos' },
                                    { name: 'Política de Privacidad', href: '/privacidad' },
                                    { name: 'Formas de Pago', href: '/pagos' },
                                    { name: 'Código ESNNA', href: '/esnna' },
                                    { name: 'Protección de Datos', href: '/datos' }
                                ].map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href}
                                            className="text-turquoise-100/80 hover:text-white transition-colors flex items-center group">
                                            <span className="w-1 h-1 bg-turquoise-400 rounded-full mr-2 group-hover:bg-accent-400 transition-colors"></span>
                                            <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                                                {link.name}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="border-t border-turquoise-700/50 pt-8 mb-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: '🛡️', title: 'Seguridad', desc: 'Garantizada' },
                                { icon: '💰', title: 'Mejor Precio', desc: 'Sin cargos ocultos' },
                                { icon: '🕐', title: 'Soporte', desc: '24/7 disponible' },
                                { icon: '❤️', title: 'Satisfacción', desc: 'Garantizada' }
                            ].map((badge, index) => (
                                <div key={index} className="flex items-center gap-3 bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                                    <span className="text-2xl">{badge.icon}</span>
                                    <div>
                                        <div className="text-white font-semibold text-sm">{badge.title}</div>
                                        <div className="text-turquoise-100/60 text-xs">{badge.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-turquoise-700/50 pt-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-turquoise-100/60 text-sm text-center md:text-left">
                                © {currentYear} Expediciones Allinkay E.I.R.L. Todos los derechos reservados.
                            </p>
                            <div className="flex items-center gap-4">
                                <span className="text-turquoise-100/40 text-xs">
                                    Diseñado con ❤️ en Cusco, Perú
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;