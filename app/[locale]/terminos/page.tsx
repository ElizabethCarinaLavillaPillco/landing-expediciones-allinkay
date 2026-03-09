import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Términos y Condiciones | Expediciones Allinkay',
    description: 'Lee los Términos y Condiciones de Expediciones Allinkay E.I.R.L. para conocer las normas que rigen nuestros servicios turísticos.',
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

export default function TerminosPage() {
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
                        <FileText className="w-4 h-4 text-accent-400" />
                        <span>Documento Legal</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                        Términos y <span className="text-accent-400">Condiciones</span>
                    </h1>
                    <p className="text-lg text-turquoise-100 max-w-2xl mx-auto">
                        Última actualización: marzo 2025
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Notice */}
                        <div className="bg-turquoise-50 border border-turquoise-200 rounded-2xl p-6 mb-12 flex gap-4">
                            <AlertCircle className="w-6 h-6 text-turquoise-600 flex-shrink-0 mt-0.5" />
                            <p className="text-turquoise-800 text-sm leading-relaxed">
                                Al utilizar los servicios de Expediciones Allinkay E.I.R.L. (RUC: 20608596861), usted acepta plenamente los siguientes Términos y Condiciones. Le recomendamos leerlos detenidamente antes de realizar cualquier reserva.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12">
                            <Section title="1. Información de la Empresa">
                                <p>Expediciones Allinkay E.I.R.L. es una agencia de viajes y turismo legalmente constituida en Perú, con RUC 20608596861, certificada por la Gerencia Regional de Comercio Exterior, Turismo y Artesanía (GERCETUR) del Gobierno Regional Cusco. Nuestros servicios se ofrecen y comercializan exclusivamente de forma digital.</p>
                            </Section>

                            <Section title="2. Descripción del Servicio">
                                <p>Ofrecemos paquetes turísticos, tours, excursiones y servicios relacionados con el turismo en el Perú, con especial énfasis en la región Cusco, Machu Picchu, Valle Sagrado y destinos relacionados.</p>
                            </Section>

                            <Section title="3. Reservas y Confirmaciones">
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Las reservas se consideran confirmadas únicamente al recibir el comprobante de pago correspondiente.</li>
                                    <li>Para confirmar su reserva se requiere un depósito mínimo del 30% del costo total del servicio.</li>
                                    <li>El saldo restante deberá cancelarse como mínimo 15 días antes de la fecha de inicio del servicio.</li>
                                    <li>Nos reservamos el derecho de cancelar una reserva si el pago no es recibido en los plazos acordados.</li>
                                </ul>
                            </Section>

                            <Section title="4. Política de Cancelación">
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Más de 30 días antes:</strong> Reembolso del 90% del monto pagado.</li>
                                    <li><strong>15 a 29 días antes:</strong> Reembolso del 50% del monto pagado.</li>
                                    <li><strong>7 a 14 días antes:</strong> Reembolso del 25% del monto pagado.</li>
                                    <li><strong>Menos de 7 días:</strong> Sin reembolso.</li>
                                </ul>
                                <p className="mt-3">Las cancelaciones deben realizarse por escrito a expedicionesallinkay158@gmail.com.</p>
                            </Section>

                            <Section title="5. Responsabilidades del Cliente">
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Presentar documentos de identidad válidos para cada servicio.</li>
                                    <li>Informar sobre condiciones médicas relevantes antes de la reserva.</li>
                                    <li>Respetar los itinerarios y las indicaciones de los guías.</li>
                                    <li>Contar con seguro de viaje recomendado para actividades de aventura.</li>
                                </ul>
                            </Section>

                            <Section title="6. Situaciones de Fuerza Mayor">
                                <p>Expediciones Allinkay no se hace responsable por cancelaciones o modificaciones causadas por fenómenos naturales, huelgas, decisiones gubernamentales u otras circunstancias fuera de nuestro control. En estos casos, ofreceremos alternativas o créditos para futuras reservas.</p>
                            </Section>

                            <Section title="7. Modificaciones a los Términos">
                                <p>Nos reservamos el derecho de actualizar estos Términos y Condiciones en cualquier momento. La versión vigente siempre estará disponible en nuestro sitio web. El uso continuado de nuestros servicios implica la aceptación de los términos vigentes.</p>
                            </Section>

                            <Section title="8. Contacto">
                                <p>Para consultas sobre estos términos, contáctenos en: <a href="mailto:expedicionesallinkay158@gmail.com" className="text-turquoise-600 hover:underline">expedicionesallinkay158@gmail.com</a> o al +51 995 669 380.</p>
                            </Section>
                        </div>

                        <div className="mt-10 text-center">
                            <Link href="/contacto" className="btn-primary inline-block">
                                ¿Tienes preguntas? Contáctanos
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
