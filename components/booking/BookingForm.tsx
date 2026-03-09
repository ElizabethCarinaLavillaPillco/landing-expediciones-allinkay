'use client';

import { useState } from 'react';
import { Tour } from '@/types/tour';
import { X, Calendar, Users, Mail, Phone, Globe } from 'lucide-react';

interface BookingFormProps {
    tour: Tour;
    onClose: () => void;
}

export default function BookingForm({ tour, onClose }: BookingFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        country: '',
        travel_date: '',
        number_of_people: 1,
        additional_notes: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    tour_id: tour.id,
                }),
            });

            if (response.ok) {
                alert('Booking submitted successfully! We will contact you soon.');
                onClose();
            } else {
                const error = await response.json();
                alert('Error submitting booking: ' + JSON.stringify(error.errors));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const totalPrice = tour.price * formData.number_of_people;

    return (
        <div className="relative">
            <button
                onClick={onClose}
                className="absolute -top-2 -right-2 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
            >
                <X className="w-5 h-5" />
            </button>


            <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Details</h3>

                {/* Tour Summary */}
                <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold text-gray-900 mb-2">{tour.name}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{formData.number_of_people} person(s)</span>
                        <span className="font-bold text-turquoise-600">${totalPrice}</span>
                    </div>
                </div>

                {/* Personal Information */}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>
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
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        {/* Add more countries as needed */}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Travel Date *
                        </label>
                        <input
                            type="date"
                            name="travel_date"
                            required
                            value={formData.travel_date}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Users className="w-4 h-4 inline mr-1" />
                            People *
                        </label>
                        <input
                            type="number"
                            name="number_of_people"
                            required
                            min="1"
                            value={formData.number_of_people}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes (Optional)
                    </label>
                    <textarea
                        name="additional_notes"
                        value={formData.additional_notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise-500 focus:border-transparent"
                        placeholder="Any special requests or dietary requirements?"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300"
                >
                    Submit Booking Request
                </button>
            </form>
        </div>
    );
}