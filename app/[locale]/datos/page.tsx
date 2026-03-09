import { Metadata } from 'next';
import Link from 'next/link';
import { Database, Lock, UserCheck, FileCheck, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Protección de Datos | Expediciones Allinkay',
    description: 'Conoce cómo protegemos tus datos personales conforme a la Ley N° 29733 de Protección de Datos Personales del Perú.',
};

export default function DatosPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative bg-gradient-to-r from-turquoise-800 to-turquoise-600 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-10 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-20 w-72 h-72 bg-accent-400/10 rounded-full blur-3xl"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6 text-sm font-medium">
                        <Database className="w-4 h-4 text-accent-400" />
                        <span>Ley N° 29733 - Perú</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                        Protección de <span className="text-accent-400">Datos</span>
                    </h1>
                    <p className="text-lg text-turquoise-100 max-w-2xl mx-auto animate-fade-in animation-delay-200">
                        Tu privacidad es nuestra prioridad. Cumplimos con la normativa peruana de protección de datos personales.
                    </p>
                </div>
            </section>

            {/* Principles Cards */}
            <section className="py-16 bg-gradient-to-b from-white to-turquoise-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-turquoise-900 mb-4">
                            Nuestros <span className="gradient-text-turquoise">Compromisos</span> contigo
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            La protección de tus datos personales es fundamental para nosotros. Estos son los principios que guían nuestro tratamiento de datos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                icon: <Lock className="w-8 h-8 text-turquoise-600" />,
                                bg: 'bg-turquoise-50',
                                title: 'Confidencialidad',
                                desc: 'Tus datos nunca serán compartidos con terceros sin tu consentimiento expreso, salvo obligación legal.',
                            },
                            {
                                icon: <FileCheck className="w-8 h-8 text-lightblue-600" />,
                                bg: 'bg-lightblue-50',
                                title: 'Legalidad',
                                desc: 'Tratamos tus datos únicamente con base en fundamentos legítimos: ejecución del contrato, obligación legal o tu consentimiento.',
                            },
                            {
                                icon: <UserCheck className="w-8 h-8 text-turquoise-600" />,
                                bg: 'bg-turquoise-50',
                                title: 'Tus Derechos ARCO',
                                desc: 'Puedes acceder, rectificar, cancelar u oponerte al tratamiento de tus datos en cualquier momento.',
                            },
                            {
                                icon: <Database className="w-8 h-8 text-lightblue-600" />,
                                bg: 'bg-lightblue-50',
                                title: 'Minimización',
                                desc: 'Recopilamos únicamente los datos estrictamente necesarios para brindarte el servicio solicitado.',
                            },
                        ].map((card) => (
                            <div key={card.title} className="bg-white rounded-2xl shadow-md p-6 hover-lift border border-gray-100">
                                <div className={`w-14 h-14 ${card.bg} rounded-xl flex items-center justify-center mb-4`}>
                                    {card.icon}
                                </div>
                                <h3 className="text-lg font-bold text-turquoise-800 mb-2">{card.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Info */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-turquoise-50 border border-turquoise-200 rounded-2xl p-6 mb-10 flex gap-4">
                            <AlertCircle className="w-6 h-6 text-turquoise-600 flex-shrink-0 mt-0.5" />
                            <p className="text-turquoise-800 text-sm leading-relaxed">
                                Esta página complementa nuestra <Link href="/privacidad" className="font-semibold underline">Política de Privacidad</Link>. Aquí encontrarás información específica sobre el tratamiento y protección de tus datos personales conforme a la Ley N° 29733 del Perú.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {/* Base de datos */}
                            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
                                <h2 className="text-xl font-bold text-turquoise-800 mb-4">Banco de Datos Personales</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Los datos personales que nos proporciona son almacenados en bases de datos registradas conforme a la Ley N° 29733 de Protección de Datos Personales del Perú. El responsable del banco de datos es <strong>Expediciones Allinkay E.I.R.L.</strong> (RUC: 20608596861).
                                </p>
                            </div>

                            {/* Datos sensibles */}
                            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
                                <h2 className="text-xl font-bold text-turquoise-800 mb-4">Datos de Salud y Condiciones Especiales</h2>
                                <p className="text-gray-600 leading-relaxed mb-3">
                                    Al participar en tours de aventura o trekking, podemos solicitarle información sobre condiciones de salud relevantes para garantizar su seguridad. Esta información:
                                </p>
                                <ul className="list-disc pl-5 text-gray-600 space-y-2 leading-relaxed">
                                    <li>Se recopila únicamente con su consentimiento expreso.</li>
                                    <li>Se utiliza exclusivamente para fines de seguridad durante el servicio.</li>
                                    <li>No se comparte con terceros salvo en emergencias médicas.</li>
                                    <li>Se elimina una vez finalizado el servicio.</li>
                                </ul>
                            </div>

                            {/* Transferencia internacional */}
                            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
                                <h2 className="text-xl font-bold text-turquoise-800 mb-4">Transferencia Internacional de Datos</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Para clientes extranjeros, algunas plataformas de pago pueden procesar datos fuera de Perú. En estos casos, verificamos que el país destino cuente con niveles de protección adecuados o que existan garantías contractuales suficientes.
                                </p>
                            </div>

                            {/* Retención */}
                            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
                                <h2 className="text-xl font-bold text-turquoise-800 mb-4">Período de Conservación</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { type: 'Datos de reservas', period: '5 años (obligaciones fiscales)' },
                                        { type: 'Comunicaciones de marketing', period: 'Hasta que revoque su consentimiento' },
                                        { type: 'Datos de navegación', period: '12 meses' },
                                        { type: 'Datos de salud', period: 'Hasta finalizar el servicio' },
                                    ].map((item) => (
                                        <div key={item.type} className="bg-turquoise-50 rounded-xl p-4">
                                            <div className="font-semibold text-turquoise-800 text-sm">{item.type}</div>
                                            <div className="text-gray-500 text-sm mt-1">{item.period}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Ejercer derechos */}
                            <div className="bg-gradient-to-br from-turquoise-700 to-turquoise-900 text-white rounded-2xl p-8">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <UserCheck className="w-6 h-6 text-accent-400" />
                                    Cómo Ejercer tus Derechos
                                </h2>
                                <p className="text-turquoise-100 mb-4">
                                    Para ejercer tus derechos ARCO (Acceso, Rectificación, Cancelación u Oposición), envía un correo a:
                                </p>
                                <a href="mailto:expedicionesallinkay158@gmail.com" className="inline-block bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-6 py-3 text-white font-medium transition">
                                    expedicionesallinkay158@gmail.com
                                </a>
                                <p className="text-turquoise-100/70 text-sm mt-4">
                                    Incluye en tu solicitud: nombre completo, copia de tu DNI/pasaporte, descripción del derecho que deseas ejercer y dirección de respuesta. Responderemos en un plazo máximo de 20 días hábiles.
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/privacidad" className="btn-outline text-center">
                                Política de Privacidad
                            </Link>
                            <Link href="/contacto" className="btn-primary text-center">
                                Contactar al DPO
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
