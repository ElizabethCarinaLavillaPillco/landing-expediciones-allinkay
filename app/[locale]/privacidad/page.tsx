import { Metadata } from 'next';
import Link from 'next/link';
import { Lock, Eye, Database, UserCheck } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Política de Privacidad | Expediciones Allinkay',
    description: 'Conoce cómo Expediciones Allinkay recopila, usa y protege tus datos personales conforme a la Ley de Protección de Datos Personales del Perú.',
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8">
        <h2 className="text-xl font-bold text-turquoise-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-gradient-to-b from-turquoise-500 to-lightblue-500 rounded-full inline-block flex-shrink-0"></span>
            {title}
        </h2>
        <div className="pl-4 text-gray-600 space-y-3 leading-relaxed">{children}</div>
    </div>
);

export default function PrivacidadPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative bg-gradient-to-r from-turquoise-700 to-lightblue-700 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-10 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-20 w-72 h-72 bg-accent-400/10 rounded-full blur-3xl"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6 text-sm font-medium">
                        <Lock className="w-4 h-4 text-accent-400" />
                        <span>Tus datos, protegidos</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                        Política de <span className="text-accent-400">Privacidad</span>
                    </h1>
                    <p className="text-lg text-turquoise-100 max-w-2xl mx-auto">
                        Última actualización: marzo 2025
                    </p>
                </div>
            </section>

            {/* Highlights */}
            <section className="py-12 bg-turquoise-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {[
                            { icon: <Lock className="w-6 h-6 text-turquoise-600" />, title: 'Datos Seguros', desc: 'Protegemos tu información con las mejores prácticas de seguridad.' },
                            { icon: <Eye className="w-6 h-6 text-turquoise-600" />, title: 'Transparencia Total', desc: 'Te informamos claramente qué datos recopilamos y para qué.' },
                            { icon: <UserCheck className="w-6 h-6 text-turquoise-600" />, title: 'Tus Derechos', desc: 'Puedes acceder, rectificar o eliminar tus datos en cualquier momento.' },
                        ].map((item) => (
                            <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-turquoise-100 flex gap-4 items-start">
                                <div className="w-12 h-12 bg-turquoise-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-turquoise-800 mb-1">{item.title}</h3>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12">
                            <Section title="1. Responsable del Tratamiento de Datos">
                                <p>Expediciones Allinkay E.I.R.L. (RUC: 20608596861), con domicilio en Cusco, Perú, es responsable del tratamiento de sus datos personales conforme a la Ley N° 29733, Ley de Protección de Datos Personales del Perú.</p>
                            </Section>

                            <Section title="2. Datos que Recopilamos">
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Datos de identificación:</strong> nombre completo, DNI/pasaporte, nacionalidad.</li>
                                    <li><strong>Datos de contacto:</strong> correo electrónico, número de teléfono/WhatsApp.</li>
                                    <li><strong>Datos de reserva:</strong> fechas, destinos, preferencias de servicio.</li>
                                    <li><strong>Datos de navegación:</strong> cookies técnicas para el funcionamiento del sitio web.</li>
                                </ul>
                            </Section>

                            <Section title="3. Finalidad del Tratamiento">
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Gestionar y confirmar reservas y servicios turísticos.</li>
                                    <li>Comunicarnos con usted sobre su viaje.</li>
                                    <li>Enviar información relevante sobre nuestros servicios (con su consentimiento).</li>
                                    <li>Cumplir con obligaciones legales y fiscales.</li>
                                    <li>Mejorar nuestros servicios y experiencia de usuario.</li>
                                </ul>
                            </Section>

                            <Section title="4. Compartición de Datos">
                                <p>No vendemos ni cedemos sus datos a terceros. Podemos compartir datos estrictamente necesarios con:</p>
                                <ul className="list-disc pl-5 space-y-2 mt-2">
                                    <li>Proveedores de servicios turísticos (hoteles, transportistas, guías) para ejecutar su reserva.</li>
                                    <li>Procesadores de pago para gestionar transacciones de forma segura.</li>
                                    <li>Autoridades competentes cuando sea requerido por ley.</li>
                                </ul>
                            </Section>

                            <Section title="5. Sus Derechos (ARCO)">
                                <p>Conforme a la ley peruana, usted tiene derecho a:</p>
                                <ul className="list-disc pl-5 space-y-2 mt-2">
                                    <li><strong>Acceso:</strong> conocer qué datos tenemos sobre usted.</li>
                                    <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
                                    <li><strong>Cancelación:</strong> solicitar la eliminación de sus datos.</li>
                                    <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos para ciertas finalidades.</li>
                                </ul>
                                <p className="mt-3">Para ejercer estos derechos, escriba a: <a href="mailto:expedicionesallinkay158@gmail.com" className="text-turquoise-600 hover:underline">expedicionesallinkay158@gmail.com</a></p>
                            </Section>

                            <Section title="6. Seguridad de los Datos">
                                <p>Implementamos medidas técnicas y organizativas para proteger sus datos contra acceso no autorizado, pérdida o alteración. Sin embargo, ningún sistema de transmisión por Internet es 100% seguro.</p>
                            </Section>

                            <Section title="7. Cookies">
                                <p>Utilizamos cookies técnicas necesarias para el funcionamiento del sitio. No utilizamos cookies de rastreo publicitario sin su consentimiento previo.</p>
                            </Section>

                            <Section title="8. Cambios en la Política">
                                <p>Podemos actualizar esta política en cualquier momento. Le notificaremos sobre cambios significativos por correo electrónico o mediante un aviso destacado en nuestro sitio web.</p>
                            </Section>

                            <Section title="9. Contacto">
                                <p>Para consultas sobre privacidad: <a href="mailto:expedicionesallinkay158@gmail.com" className="text-turquoise-600 hover:underline">expedicionesallinkay158@gmail.com</a></p>
                            </Section>
                        </div>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/datos" className="btn-outline text-center">
                                Protección de Datos
                            </Link>
                            <Link href="/contacto" className="btn-primary text-center">
                                Contáctanos
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
