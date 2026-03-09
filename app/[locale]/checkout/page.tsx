import CheckoutPage from '@/components/checkout/CheckoutPage';

// Forzar que esta página no se prerenderice (soluciona el error de location)
export const dynamic = 'force-dynamic';

export default function Page() {
    return <CheckoutPage />;
}