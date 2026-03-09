'use client';

import Link from 'next/link';
import { CheckCircle, Home, Mail } from 'lucide-react';

export default function BookingSuccessPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-turquoise-50 to-lightblue-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-turquoise-500 to-turquoise-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-12 h-12 text-white" />
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Booking Request Received!
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                    Thank you for your interest in our tours. We've received your booking request
                    and our team will contact you within 24 hours to confirm the details and
                    finalize your reservation.
                </p>

                <div className="bg-gradient-to-r from-turquoise-50 to-lightblue-50 rounded-2xl p-6 mb-8">
                    <h2 className="font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                        <Mail className="w-5 h-5 text-turquoise-600" />
                        What Happens Next?
                    </h2>
                    <ul className="space-y-3 text-left max-w-md mx-auto text-gray-600">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-turquoise-600 flex-shrink-0 mt-0.5" />
                            <span>You'll receive a confirmation email/WhatsApp message</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-turquoise-600 flex-shrink-0 mt-0.5" />
                            <span>Our team will contact you to discuss details</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-turquoise-600 flex-shrink-0 mt-0.5" />
                            <span>We'll provide payment options and finalize your booking</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-turquoise-600 flex-shrink-0 mt-0.5" />
                            <span>You'll receive a detailed itinerary and travel information</span>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                    <Link
                        href="/tours"
                        className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 px-8 rounded-xl transition-all duration-300"
                    >
                        Browse More Tours
                    </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-4">Need immediate assistance?</p>
                    <a
                        href="https://wa.me/51995669380"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
                        </svg>
                        Contact us on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
}