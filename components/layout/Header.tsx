'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Phone, Mail, MapPin, ShoppingCart } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import { Tour, Destination, Category } from '@/types/tour';
import { useCart } from '@/contexts/CartContext';

interface NavTour {
    name: string;
    href: string;
}

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isToursMenuOpen, setIsToursMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Dynamic tour groups for dropdowns
    const [machuTours, setMachuTours] = useState<NavTour[]>([]);
    const [cuscoTours, setCuscoTours] = useState<NavTour[]>([]);
    const [otrosTours, setOtrosTours] = useState<NavTour[]>([]);
    const { cartCount } = useCart();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        // Fetch tours and destinations for navbar dropdowns
        async function loadNavData() {
            try {
                // Fetch Tours
                const toursRes = await fetchAPI('/tours?per_page=100') as any;
                const tours: Tour[] = toursRes.data ?? toursRes ?? [];

                // Fetch Destinations
                const destsRes = await fetchAPI('/destinations') as any;
                const destinations: Destination[] = destsRes.data ?? destsRes ?? [];

                const toNavTour = (t: Tour): NavTour => ({
                    name: t.name,
                    href: `/tours/${t.slug}`,
                });

                const isMachu = (t: Tour) => {
                    const hasMPHighlight = t.highlights?.some((h: string) =>
                        h.toLowerCase().includes('machupicchu') ||
                        h.toLowerCase().includes('machu picchu')
                    );
                    const nameMatches = t.name.toLowerCase().includes('machu picchu') ||
                        t.name.toLowerCase().includes('machupicchu');
                    return hasMPHighlight || nameMatches;
                };

                const isCusco = (t: Tour) => {
                    if (isMachu(t)) return false;
                    const name = t.name.toLowerCase();
                    const dest = typeof t.destination === 'object'
                        ? (t.destination?.slug ?? '') + ' ' + (t.destination?.name ?? '')
                        : (t.destination ?? '');
                    return (
                        name.includes('cusco') ||
                        name.includes('valle sagrado') ||
                        name.includes('colores') ||
                        name.includes('maras') ||
                        name.includes('humantay') ||
                        name.includes('city') ||
                        dest.toLowerCase().includes('cusco') ||
                        dest.toLowerCase().includes('valle')
                    );
                };

                const machu = tours.filter(isMachu).slice(0, 6).map(toNavTour);
                const cusco = tours.filter(isCusco).slice(0, 6).map(toNavTour);

                // For "Otros destinos", list actual destinations except Cusco (it has its own menu)
                const filteredDests = destinations
                    .filter(d => d.slug.toLowerCase() !== 'cusco')
                    .map(d => ({
                        name: d.name,
                        href: `/tours?destination=${d.slug}`,
                    }));

                setMachuTours(machu.length > 0 ? machu : [
                    { name: 'Tour Machu Picchu 1 día', href: '/tours?q=machu+picchu' },
                    { name: 'Machu Picchu + Huayna Picchu', href: '/tours?q=huayna+picchu' },
                    { name: 'Camino Inca 4 días', href: '/tours?q=camino+inca' },
                    { name: 'Salkantay Trek', href: '/tours?q=salkantay' },
                ]);
                setCuscoTours(cusco.length > 0 ? cusco : [
                    { name: 'City Tour Cusco', href: '/tours?q=city+tour' },
                    { name: 'Valle Sagrado', href: '/tours?q=valle+sagrado' },
                    { name: 'Montaña 7 Colores', href: '/tours?q=7+colores' },
                    { name: 'Laguna Humantay', href: '/tours?q=humantay' },
                ]);
                setOtrosTours(filteredDests.length > 0 ? filteredDests : [
                    { name: 'Lago Titicaca — Puno', href: '/tours?destination=puno' },
                    { name: 'Arequipa', href: '/tours?destination=arequipa' },
                    { name: 'Ica y Paracas', href: '/tours?destination=ica' },
                    { name: 'Lima', href: '/tours?destination=lima' },
                ]);
            } catch (error) {
                console.error('Error loading navbar data:', error);
            }
        }
        loadNavData();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const DropdownMenu = ({ title, tours, seeAllHref }: { title: string; tours: NavTour[]; seeAllHref: string }) => (
        <div className="relative group">
            <button className="text-gray-800 hover:text-brand-600 font-medium transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-1">
                {title}
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl p-4 border-2 border-brand-200 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <h3 className="font-bold text-brand-700 mb-3 flex items-center text-sm uppercase tracking-wide">
                    <span className="w-2 h-2 bg-brand-500 rounded-full mr-2 animate-pulse"></span>
                    {title}
                </h3>
                <ul className="space-y-1">
                    {tours.map((tour, i) => (
                        <li key={i}>
                            <Link href={tour.href} className="text-gray-600 hover:text-brand-600 text-sm transition-colors flex items-center group/item py-1">
                                <span className="w-1 h-1 bg-brand-300 rounded-full mr-2 group-hover/item:bg-brand-500 transition-colors"></span>
                                {tour.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-brand-50">
                    <Link href={seeAllHref} className="text-xs font-semibold text-brand-600 hover:text-brand-800 transition-colors flex items-center gap-1">
                        Ver todos →
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Top Bar - Contact Info */}
            <div className="bg-gradient-to-r from-brand-900 to-brand-800 text-white text-sm py-2.5 border-b border-brand-400/30 shadow-lg">
                <div className="container mx-auto px-4">
                    {/* Desktop Version */}
                    <div className="hidden lg:flex flex-row justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1.5 bg-brand-700/50 px-3 py-1 rounded-full hover:bg-brand-700/70 transition-colors">
                                <Phone className="w-3.5 h-3.5" />
                                <span>+51 995 669 380</span>
                            </span>
                            <span className="flex items-center space-x-1.5 bg-brand-700/50 px-3 py-1 rounded-full hover:bg-brand-700/70 transition-colors">
                                <Mail className="w-3.5 h-3.5" />
                                <span>expedicionesallinkay158@gmail.com</span>
                            </span>
                            <span className="flex items-center space-x-1.5 bg-brand-700/50 px-3 py-1 rounded-full hover:bg-brand-700/70 transition-colors">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>Cusco, Perú</span>
                            </span>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center space-x-3">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                                <div className="relative bg-brand-700/50 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center space-x-2 transition-transform group-hover:scale-105">
                                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                    <span className="text-xs">Facebook</span>
                                </div>
                            </a>
                            <a href="https://instagram.com/expediciones_allinkay1" target="_blank" rel="noopener noreferrer" className="group relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                                <div className="relative bg-brand-700/50 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center space-x-2 transition-transform group-hover:scale-105">
                                    <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                                    <span className="text-xs">Instagram</span>
                                </div>
                            </a>
                            <a href="https://wa.me/51995669380" target="_blank" rel="noopener noreferrer" className="group relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-green-600 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                                <div className="relative bg-brand-700/50 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center space-x-2 transition-transform group-hover:scale-105">
                                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" /></svg>
                                    <span className="text-xs">WhatsApp</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Mobile Version */}
                    <div className="lg:hidden flex items-center justify-center space-x-3">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-brand-700/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-brand-700/70 transition-colors">
                            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                        <a href="https://instagram.com/expediciones_allinkay1" target="_blank" rel="noopener noreferrer" className="bg-brand-700/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-brand-700/70 transition-colors">
                            <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                        </a>
                        <a href="https://wa.me/51995669380" target="_blank" rel="noopener noreferrer" className="bg-brand-700/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-brand-700/70 transition-colors">
                            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" /></svg>
                        </a>
                        <a href="tel:+51995669380" className="bg-brand-700/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-brand-700/70 transition-colors">
                            <Phone className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Business Info Bar */}
            <div className="bg-gradient-to-r from-brand-800 to-brand-700 text-white text-xs py-1.5 border-b border-brand-400/30">
                <div className="container mx-auto px-4 text-center">
                    <span className="font-mono tracking-wider bg-brand-600/50 px-4 py-0.5 rounded-full inline-block">
                        RUC: 20608596861 | Expediciones Allinkay E.I.R.L.
                    </span>
                </div>
            </div>

            {/* Main Navigation */}
            <header className={`sticky top-0 z-50 transition-all duration-500 ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} ${isScrolled ? 'shadow-xl' : ''}`}>
                <div className="relative w-full px-2 md:px-4 lg:px-6 pt-2">
                    <div className={`absolute inset-x-2 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-400 to-transparent ${isScrolled ? 'opacity-100' : 'opacity-50'}`}></div>

                    <div className={`${isScrolled ? 'bg-white shadow-sm' : 'bg-white'} rounded-xl p-3 md:p-4 transition-colors duration-300`}>
                        <div className="flex justify-between items-center">
                            {/* Logo */}
                            <Link href="/" className="flex items-center group mr-6">
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-400 to-brand-500 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                                    <div className="relative bg-gradient-to-r from-brand-600 to-brand-700 text-white px-4 py-2 rounded-lg font-bold text-lg tracking-tight">
                                        <span className="text-accent-400">Expediciones</span>
                                        <span className="text-white"> Allinkay</span>
                                    </div>
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center space-x-6">
                                <Link href="/" className="text-gray-800 hover:text-brand-600 font-medium transition-all duration-300 hover:-translate-y-0.5">
                                    Inicio
                                </Link>
                                <Link href="/nosotros" className="text-gray-800 hover:text-brand-600 font-medium transition-all duration-300 hover:-translate-y-0.5">
                                    Nosotros
                                </Link>

                                <DropdownMenu
                                    title="Tours a Machu Picchu"
                                    tours={machuTours}
                                    seeAllHref="/tours?q=machu+picchu"
                                />
                                <DropdownMenu
                                    title="Tours en Cusco"
                                    tours={cuscoTours}
                                    seeAllHref="/tours?q=cusco"
                                />
                                <DropdownMenu
                                    title="Otros destinos"
                                    tours={otrosTours}
                                    seeAllHref="/tours"
                                />

                                <Link href="/contacto" className="text-gray-800 hover:text-brand-600 font-medium transition-all duration-300 hover:-translate-y-0.5">
                                    Contacto
                                </Link>
                            </nav>

                            {/* Action Buttons */}
                            <div className="hidden lg:flex items-center space-x-4">
                                <Link href="/cart" className="relative group p-2 hover:bg-brand-50 rounded-full transition-all duration-300">
                                    <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-brand-600" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce-subtle">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>

                                <a
                                    href="https://wa.me/51995669380?text=Hola,%20me%20interesa%20reservar%20un%20tour"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative overflow-hidden bg-gradient-to-r from-accent-400 to-accent-500 text-gray-900 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/30 hover:scale-105"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        Reserva Ya
                                    </span>
                                </a>
                            </div>

                            {/* Mobile Menu Button & Cart */}
                            <div className="flex items-center space-x-2 lg:hidden">
                                <Link href="/cart" className="relative p-2 bg-brand-50 rounded-lg">
                                    <ShoppingCart className="w-6 h-6 text-brand-700" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <button
                                    className="p-2 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                >
                                    {isMenuOpen ? <X className="w-6 h-6 text-brand-700" /> : <Menu className="w-6 h-6 text-brand-700" />}
                                </button>
                            </div>
                        </div>

                        {/* Mobile Navigation */}
                        {isMenuOpen && (
                            <div className="lg:hidden mt-4 animate-fade-in border-t border-brand-100 pt-4">
                                <div className="flex flex-col space-y-2">
                                    <Link href="/" className="text-gray-800 hover:text-brand-600 py-2 px-4 rounded-lg hover:bg-brand-50 transition-colors">
                                        Inicio
                                    </Link>
                                    <Link href="/nosotros" className="text-gray-800 hover:text-brand-600 py-2 px-4 rounded-lg hover:bg-brand-50 transition-colors">
                                        Nosotros
                                    </Link>

                                    <div>
                                        <button
                                            className="text-gray-800 hover:text-brand-600 flex items-center justify-between w-full py-2 px-4 rounded-lg hover:bg-brand-50 transition-colors"
                                            onClick={() => setIsToursMenuOpen(!isToursMenuOpen)}
                                        >
                                            Tours
                                            <ChevronDown className={`w-4 h-4 transition-transform ${isToursMenuOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isToursMenuOpen && (
                                            <div className="pl-4 mt-2 space-y-4 animate-fade-in">
                                                {[
                                                    { label: 'Tours a Machu Picchu', tours: machuTours, all: '/tours?q=machu+picchu' },
                                                    { label: 'Tours en Cusco', tours: cuscoTours, all: '/tours?q=cusco' },
                                                    { label: 'Otros Destinos', tours: otrosTours, all: '/tours' },
                                                ].map(group => (
                                                    <div key={group.label}>
                                                        <h4 className="font-medium text-brand-700 mb-1 text-sm">{group.label}</h4>
                                                        <ul className="pl-3 space-y-1">
                                                            {group.tours.slice(0, 4).map((tour, i) => (
                                                                <li key={i}>
                                                                    <Link href={tour.href} className="text-sm text-gray-600 hover:text-brand-600 block py-0.5">
                                                                        {tour.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                            <li>
                                                                <Link href={group.all} className="text-xs text-brand-500 font-semibold">Ver todos →</Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <Link href="/contacto" className="text-gray-800 hover:text-brand-600 py-2 px-4 rounded-lg hover:bg-brand-50 transition-colors">
                                        Contacto
                                    </Link>

                                    <div className="pt-4 border-t border-brand-100 space-y-2">
                                        <a
                                            href="https://wa.me/51995669380?text=Hola,%20me%20interesa%20reservar%20un%20tour"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block bg-gradient-to-r from-accent-400 to-accent-500 text-gray-900 px-4 py-2.5 rounded-full text-center font-semibold text-sm"
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                Reserva Ya
                                            </span>
                                        </a>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;