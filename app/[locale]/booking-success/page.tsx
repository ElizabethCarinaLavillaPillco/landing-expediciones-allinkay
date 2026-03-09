import { setRequestLocale } from 'next-intl/server';

import BookingSuccessPage from '@/components/booking/BookingSuccessPage';

export default function Page({
    params: { locale }
}: {
    params: { locale: string };
}) {
    setRequestLocale(locale);
    return <BookingSuccessPage />;
}
