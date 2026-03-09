import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import PopularTours from '@/components/sections/PopularTours';
import Testimonials from '@/components/sections/Testimonials';
import TrekkingTours from '@/components/sections/TrekkingTours';
import Experiences from '@/components/sections/Experiences';
import Destinations from '@/components/sections/Destinations';
import Advantages from '@/components/sections/Advantages';
import SatisfiedClients from '@/components/sections/SatisfiedClients';
import { fetchAPI } from '@/lib/api';
import { Tour, Category, Destination } from '@/types/tour';

// Metadata generation for each locale
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const titles: Record<string, string> = {
        es: 'Tours en Perú | Agencia de Viajes Especializada | Machu Picchu',
        en: 'Peru Tours | Specialized Travel Agency | Machu Picchu',
        pt: 'Tours no Peru | Agência de Viagens Especializada | Machu Picchu',
    };
    const descriptions: Record<string, string> = {
        es: 'Descubre Perú con nuestra agencia de viajes. Tours a Machu Picchu, Cusco, Valle Sagrado y más. Guías expertos, precios competitivos. ¡Reserva ahora!',
        en: 'Discover Peru with our travel agency. Tours to Machu Picchu, Cusco, Sacred Valley and more. Expert guides, competitive prices. Book now!',
        pt: 'Descubra o Peru com nossa agência de viagens. Tours para Machu Picchu, Cusco, Vale Sagrado e mais. Guias especializados, preços competitivos. Reserve agora!',
    };
    return {
        title: titles[params.locale] || titles.es,
        description: descriptions[params.locale] || descriptions.es,
    };
}

// Enable dynamic rendering to ensure fresh data from API
export const revalidate = 0;

// Fetch data from API
async function getData() {
    try {
        const [toursRes, categories, destinations] = await Promise.all([
            fetchAPI('/tours?per_page=100') as Promise<{ data: Tour[] }>,
            fetchAPI('/categories') as Promise<Category[]>,
            fetchAPI('/destinations') as Promise<Destination[]>,
        ]);
        return {
            tours: toursRes.data || [],
            categories: categories || [],
            destinations: destinations || [],
        };
    } catch (error) {
        console.error('Failed to fetch home data:', error);
        return { tours: [], categories: [], destinations: [] };
    }
}

export default async function HomePage() {
    const { tours, categories, destinations } = await getData();

    // Filter Popular / Featured Tours
    const featuredTours = tours.filter((tour: Tour) => tour.featured);

    // Filter Machu Picchu / trekking tours for the TrekkingTours section
    const trekkingTours = tours.filter((tour: Tour) => {
        const hasMPHighlight = tour.highlights?.some(h =>
            h.toLowerCase().includes('machupicchu') ||
            h.toLowerCase().includes('machu picchu')
        );
        const nameMatches = tour.name.toLowerCase().includes('machu picchu') ||
            tour.name.toLowerCase().includes('machupicchu');

        return hasMPHighlight || nameMatches;
    });

    return (
        <>
            {/* Hero Section with image carousel and search */}
            <Hero destinations={destinations} categories={categories} />

            {/* Popular / Featured Tours */}
            <PopularTours tours={featuredTours} />

            {/* Trekking & Machu Picchu Tours */}
            <TrekkingTours tours={trekkingTours} />

            {/* Experiences overview cards */}
            <Experiences categories={categories} />

            {/* Destinations */}
            <Destinations destinations={destinations} />

            {/* Why choose us */}
            <Advantages />

            {/* Google-style reviews */}
            <SatisfiedClients />
        </>
    );
}
