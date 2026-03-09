import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
    title: 'Contacto | Expediciones Allinkay',
    description: 'Contáctanos para planificar tu viaje por Perú. WhatsApp, email o visita nuestra oficina en Cusco.',
};

const contactInfo = [
    {
        icon: <Phone className="w-6 h-6" />,
        title: 'Teléfono / WhatsApp',
        lines: ['+51 995 669 380', '+51 990 179 027'],
        href: 'https://wa.me/51995669380',
        color: 'bg-green-100 text-green-700',
    },
    {
        icon: <Mail className="w-6 h-6" />,
        title: 'Correo Electrónico',
        lines: ['expedicionesallinkay158@gmail.com', 'ines158@hotmail.com'],
        href: 'mailto:expedicionesallinkay158@gmail.com',
        color: 'bg-brand-100 text-brand-700',
    },
    {
        icon: <MapPin className="w-6 h-6" />,
        title: 'Ubicación',
        lines: ['Av. Pachakutec A304', 'Wanchaq, Cusco - Perú'],
        href: 'https://www.google.com/maps/place/Expediciones+Allinkay+E.I.R.L./@-13.5242424,-71.9740766,17z/data=!3m1!4b1!4m6!3m5!1s0x916dd57ec876becb:0xe67872a5177eed56!8m2!3d-13.5242476!4d-71.9715017!16s%2Fg%2F11x7d870t1?entry=ttu',
        color: 'bg-orange-100 text-orange-700',
    },
    {
        icon: <Clock className="w-6 h-6" />,
        title: 'Horario de Atención',
        lines: ['Lunes - Sábado: 7:00 - 20:00', 'Domingo: 8:00 - 18:00'],
        href: null,
        color: 'bg-purple-100 text-purple-700',
    },
];

export default function ContactoPage({
    params: { locale }
}: {
    params: { locale: string };
}) {
    setRequestLocale(locale);

    return (
        <>
            {/* Hero */}
            <section className="relative bg-gradient-to-r from-brand-800 to-brand-600 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-10 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-20 w-80 h-80 bg-brand-200/20 rounded-full blur-3xl"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6 text-sm font-medium">
                        <MessageCircle className="w-4 h-4 text-brand-200" />
                        <span>Respondemos en menos de 2 horas</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                        ¡Hablemos de tu <span className="text-brand-200">Aventura!</span>
                    </h1>
                    <p className="text-xl text-brand-100 max-w-2xl mx-auto animate-fade-in animation-delay-200">
                        Estamos aquí para ayudarte a planificar el viaje de tus sueños por Perú.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-14 bg-brand-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {contactInfo.map((item) => (
                            <div key={item.title} className="bg-white rounded-2xl shadow-md p-6 hover:-translate-y-1 transition-transform border border-brand-100">
                                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-brand-900 mb-2 text-sm uppercase tracking-wide">{item.title}</h3>
                                {item.lines.map((line, i) => (
                                    <p key={i} className="text-gray-600 text-sm">{line}</p>
                                ))}
                                {item.href && (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-3 inline-block text-brand-600 text-sm font-medium hover:text-brand-700 hover:underline"
                                    >
                                        Abrir →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map + Form */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Map */}
                        <div>
                            <h2 className="text-2xl font-bold text-brand-900 mb-6 flex items-center gap-2">
                                <MapPin className="w-6 h-6 text-brand-500" />
                                Nuestra Ubicación
                            </h2>
                            <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-brand-100 mb-5">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.4!2d-71.9715017!3d-13.5242476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916dd57ec876becb%3A0xe67872a5177eed56!2sExpediciones%20Allinkay%20E.I.R.L.!5e0!3m2!1ses!2spe!4v1709900000000!5m2!1ses!2spe"
                                    width="100%"
                                    height="350"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Ubicación Expediciones Allinkay E.I.R.L."
                                ></iframe>
                            </div>
                            <div className="bg-brand-50 rounded-xl p-5 border border-brand-100">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-brand-800">Av. Pachakutec A304, Wanchaq</p>
                                        <p className="text-gray-500 text-sm">Cusco, Perú</p>
                                        <a
                                            href="https://www.google.com/maps/place/Expediciones+Allinkay+E.I.R.L./@-13.5242424,-71.9740766,17z/data=!3m1!4b1!4m6!3m5!1s0x916dd57ec876becb:0xe67872a5177eed56!8m2!3d-13.5242476!4d-71.9715017!16s%2Fg%2F11x7d870t1?entry=ttu"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 inline-flex items-center gap-1 text-brand-600 text-sm font-medium hover:text-brand-700"
                                        >
                                            Abrir en Google Maps →
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp Direct */}
                            <div className="mt-6">
                                <a
                                    href="https://wa.me/51995669380?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20tours"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl p-5 transition-all hover:scale-105 shadow-lg shadow-green-500/25"
                                >
                                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg">Escríbenos por WhatsApp</div>
                                        <div className="text-green-100 text-sm">+51 995 669 380 · Respuesta inmediata</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Form */}
                        <div>
                            <h2 className="text-2xl font-bold text-brand-900 mb-6 flex items-center gap-2">
                                <Send className="w-6 h-6 text-brand-500" />
                                Envíanos un Mensaje
                            </h2>
                            <div className="bg-white rounded-2xl shadow-lg border border-brand-100 p-8">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Quick */}
            <section className="py-14 bg-gradient-to-b from-white to-brand-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-2xl font-bold text-brand-900 mb-8 text-center">Preguntas Frecuentes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                q: '¿Con cuánta anticipación debo reservar?',
                                a: 'Recomendamos reservar con al menos 2-3 días de anticipación. Para temporada alta (junio-agosto) con mínimo 1 semana.'
                            },
                            {
                                q: '¿Ofrecen tours privados?',
                                a: 'Sí, todos nuestros tours pueden realizarse en modalidad privada. Contáctanos para una cotización personalizada.'
                            },
                            {
                                q: '¿Qué incluyen los tours?',
                                a: 'Transporte, guía profesional bilingüe, entradas y desayuno o almuerzo según el tour. Revisa cada programa para detalles.'
                            },
                            {
                                q: '¿Cómo es el proceso de pago?',
                                a: 'Se requiere un depósito del 30% para confirmar. Aceptamos transferencias, Yape, PayPal y tarjetas. Ver Formas de Pago.'
                            },
                        ].map((faq) => (
                            <div key={faq.q} className="bg-white rounded-xl p-6 shadow-sm border border-brand-100">
                                <h3 className="font-bold text-brand-800 mb-2 text-sm">{faq.q}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link href="/tours" className="btn-primary inline-block">
                            Ver Todos los Tours
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}