'use client';

import { useState } from 'react';
import { CheckCircle, MessageCircle } from 'lucide-react';

export default function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const body = `Hola, soy ${form.name}.\n\nAsunto: ${form.subject}\n\n${form.message}\n\nContacto:\nEmail: ${form.email}\nTeléfono: ${form.phone}`;
        const waUrl = `https://wa.me/51995669380?text=${encodeURIComponent(body)}`;

        try {
            const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
            await fetch(`${apiBase}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
        } catch (error) {
            console.error('Error saving message copy:', error);
        }

        window.open(waUrl, '_blank');
        setSent(true);
    };

    if (sent) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-brand-600" />
                </div>
                <h3 className="text-2xl font-bold text-brand-800 mb-3">¡Mensaje Recibido!</h3>
                <p className="text-gray-500 mb-6 max-w-sm">
                    Te hemos redirigido a WhatsApp para una atención inmediata. ¡Hablemos pronto!
                </p>
                <button
                    onClick={() => setSent(false)}
                    className="text-brand-600 hover:text-brand-700 font-medium underline"
                >
                    Enviar otro mensaje
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* ... resto del formulario igual ... */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre completo *</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition text-gray-900"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition text-gray-900"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono / WhatsApp *</label>
                    <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+51 000 000 000"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition text-gray-900"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Asunto *</label>
                    <select
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition text-gray-900"
                    >
                        <option value="">Selecciona un asunto</option>
                        <option value="Consulta sobre tours">Consulta sobre tours</option>
                        <option value="Reserva de tour">Reserva de tour</option>
                        <option value="Información de precios">Información de precios</option>
                        <option value="Tour personalizado">Tour personalizado</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje *</label>
                <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos qué tipo de tour te interesa, fechas, número de personas..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-200 outline-none transition text-gray-900 resize-none"
                />
            </div>
            <div className="pt-2">
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/25 flex items-center justify-center gap-3"
                >
                    <MessageCircle className="w-6 h-6" />
                    Enviar Mensaje por WhatsApp
                </button>
            </div>
            <p className="text-xs text-gray-400 text-center">
                Al enviar, serás redirigido a WhatsApp con tu mensaje pre-cargado. Respuesta inmediata.
            </p>
        </form>
    );
}