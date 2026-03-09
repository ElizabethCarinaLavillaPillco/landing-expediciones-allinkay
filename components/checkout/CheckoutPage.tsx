'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { getImageUrl } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Mail, Phone, Globe, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [contactPreference, setContactPreference] = useState<'email' | 'whatsapp'>('email');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        country: '',
        additional_notes: '',
    });

    const [tourDates, setTourDates] = useState<{ [key: number]: { travel_date: string; number_of_people: number } }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleTourDateChange = (tourId: number, field: string, value: string | number) => {
        setTourDates({
            ...tourDates,
            [tourId]: {
                ...tourDates[tourId],
                [field]: value,
            },
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Prepare tours data with dates and people count
            const tours = cart.map((item) => ({
                tour_id: item.id,
                travel_date: tourDates[item.id]?.travel_date || '',
                number_of_people: tourDates[item.id]?.number_of_people || item.quantity,
            }));

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/bulk`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    tours,
                    contact_preference: contactPreference,
                }),
            });

            if (response.ok) {
                clearCart();
                router.push('/booking-success');
            } else {
                const error = await response.json();
                alert('Error submitting booking: ' + JSON.stringify(error.errors));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cart.length === 0) {
        router.push('/cart');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
                    <p className="text-gray-600">Complete your booking information</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Booking Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Contact Preference */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Preference</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setContactPreference('email')}
                                        className={`p-4 rounded-xl border-2 transition-all ${contactPreference === 'email'
                                            ? 'border-turquoise-500 bg-turquoise-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <Mail className="w-6 h-6 mx-auto mb-2 text-turquoise-600" />
                                        <div className="font-medium">Email</div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setContactPreference('whatsapp')}
                                        className={`p-4 rounded-xl border-2 transition-all ${contactPreference === 'whatsapp'
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <Phone className="w-6 h-6 mx-auto mb-2 text-green-600" />
                                        <div className="font-medium">WhatsApp</div>
                                    </button>
                                </div>
                            </div>

                            {/* Personal Information */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {contactPreference === 'email' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                                                placeholder="john@example.com"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">
                                                Booking confirmation will be sent to this address
                                            </p>
                                        </div>
                                    )}

                                    {contactPreference === 'whatsapp' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                WhatsApp Number *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                                                placeholder="+1 234 567 8900"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">
                                                We'll send booking details to this number
                                            </p>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Globe className="w-4 h-4 inline mr-1" />
                                            Country *
                                        </label>
                                        <select
                                            name="country"
                                            required
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                                        >
                                            <option value="">Select your country</option>
                                            <option value="US">United States</option>
                                            <option value="GB">United Kingdom</option>
                                            <option value="CA">Canada</option>
                                            <option value="AU">Australia</option>
                                            <option value="DE">Germany</option>
                                            <option value="FR">France</option>
                                            <option value="ES">Spain</option>
                                            <option value="PE">Peru</option>
                                            <option value="MX">Mexico</option>
                                            <option value="BR">Brazil</option>
                                            <option value="AR">Argentina</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Tour Details */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Details</h2>
                                <div className="space-y-6">
                                    {cart.map((item) => (
                                        <div key={item.id} className="border border-gray-200 rounded-xl p-6">
                                            <div className="flex gap-4 mb-4">
                                                <img
                                                    src={getImageUrl(item.primary_image || (item.images && item.images.length > 0 ? item.images[0].image_path : null))}
                                                    alt={item.name}
                                                    className="w-24 h-24 object-cover rounded-lg"
                                                />
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                                                    <p className="text-sm text-gray-600">{typeof item.destination === 'string' ? item.destination : item.destination?.name}</p>
                                                    <p className="text-sm font-medium text-turquoise-600">${item.price} / person</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        <Calendar className="w-4 h-4 inline mr-1" />
                                                        Travel Date *
                                                    </label>
                                                    <input
                                                        type="date"
                                                        required
                                                        min={new Date().toISOString().split('T')[0]}
                                                        value={tourDates[item.id]?.travel_date || ''}
                                                        onChange={(e) =>
                                                            handleTourDateChange(item.id, 'travel_date', e.target.value)
                                                        }
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        <Users className="w-4 h-4 inline mr-1" />
                                                        Number of People *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        required
                                                        min="1"
                                                        value={tourDates[item.id]?.number_of_people || item.quantity}
                                                        onChange={(e) =>
                                                            handleTourDateChange(item.id, 'number_of_people', parseInt(e.target.value))
                                                        }
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Additional Notes */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
                                <textarea
                                    name="additional_notes"
                                    value={formData.additional_notes}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                                    placeholder="Any special requests, dietary requirements, or questions?"
                                />
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    {cart.map((item) => (
                                        <div key={item.id} className="pb-4 border-b border-gray-200">
                                            <div className="flex justify-between mb-2">
                                                <span className="font-medium text-gray-900">{item.name}</span>
                                            </div>
                                            <div className="flex justify-between text-sm text-gray-600">
                                                <span>{item.quantity} person(s) × ${item.price}</span>
                                                <span className="font-medium">${item.price * item.quantity}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t-2 border-gray-300 pt-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-3xl font-bold text-turquoise-600">
                                            ${cartTotal}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        * This is an estimated total. Final price will be confirmed by our team.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-5 h-5" />
                                            Submit Booking Request
                                        </>
                                    )}
                                </button>

                                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3 text-sm text-gray-600">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-turquoise-600 flex-shrink-0 mt-0.5" />
                                        <span>No payment required now</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-turquoise-600 flex-shrink-0 mt-0.5" />
                                        <span>Our team will contact you within 24 hours</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-turquoise-600 flex-shrink-0 mt-0.5" />
                                        <span>Free cancellation available</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}