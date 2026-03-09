
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import PopularTours from '@/components/sections/PopularTours';
import { Category, Tour } from '@/types/tour';

interface CategoryPageProps {
    params: {
        slug: string;
        locale: string;
    };
}

interface CategoryResponse {
    category: Category;
    tours: any;
}

async function getCategory(slug: string): Promise<CategoryResponse | null> {
    try {
        return await fetchAPI<CategoryResponse>(`/categories/${slug}`, { cache: 'no-store' });
    } catch (error) {
        return null;
    }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const data = await getCategory(params.slug);

    if (!data || !data.category) {
        return {
            title: 'Categoría no encontrada',
        };
    }

    return {
        title: `${data.category.name} | Tours`,
        description: data.category.description || `mejores tours de ${data.category.name}`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const data = await getCategory(params.slug);

    if (!data || !data.category) {
        notFound();
    }

    const { category, tours } = data;
    const toursList = Array.isArray(tours) ? tours : (tours && typeof tours === 'object' && 'data' in tours ? (tours as any).data : []);

    console.log(`[CategoryPage] slug: ${params.slug}, tours found: ${toursList.length}`);

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-primary-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
                    <p className="text-xl max-w-2xl mx-auto opacity-90">{category.description}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12">
                {toursList && toursList.length > 0 ? (
                    <PopularTours
                        tours={toursList}
                        title={`Tours de ${category.name}`}
                        description={`Descubre nuestra selección exclusiva de tours en la categoría ${category.name}.`}
                    />
                ) : (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">No hay tours disponibles en esta categoría por el momento.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
