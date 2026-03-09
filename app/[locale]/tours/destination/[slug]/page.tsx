
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import PopularTours from '@/components/sections/PopularTours';
import { Destination, Tour } from '@/types/tour';

interface DestinationPageProps {
    params: {
        slug: string;
        locale: string;
    };
}

interface DestinationResponse {
    destination: Destination;
    tours: any;
}

async function getDestination(slug: string): Promise<DestinationResponse | null> {
    try {
        return await fetchAPI<DestinationResponse>(`/destinations/${slug}`, { cache: 'no-store' });
    } catch (error) {
        return null;
    }
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
    const data = await getDestination(params.slug);

    if (!data || !data.destination) {
        return {
            title: 'Destino no encontrado',
        };
    }

    return {
        title: `${data.destination.name} | Tours`,
        description: data.destination.description || `mejores tours en ${data.destination.name}`,
    };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
    const data = await getDestination(params.slug);

    if (!data || !data.destination) {
        notFound();
    }

    const { destination, tours } = data;
    const toursList = Array.isArray(tours) ? tours : (tours && typeof tours === 'object' && 'data' in tours ? (tours as any).data : []);

    console.log(`[DestinationPage] slug: ${params.slug}, tours found: ${toursList.length}`);

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-primary-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{destination.name}</h1>
                    <p className="text-xl max-w-2xl mx-auto opacity-90">{destination.description}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12">
                {toursList && toursList.length > 0 ? (
                    <PopularTours
                        tours={toursList}
                        title={`Tours en ${destination.name}`}
                        description={`Explora las mejores experiencias y aventuras que tenemos para ofrecerte en ${destination.name}.`}
                    />
                ) : (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">No hay tours disponibles en este destino por el momento.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
