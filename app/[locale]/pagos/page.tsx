import { Metadata } from 'next';
import Link from 'next/link';
import { CreditCard, Smartphone, Banknote, Globe, AlertCircle, CheckCircle, Info } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Formas de Pago | Expediciones Allinkay',
    description: 'Conoce todas las formas de pago aceptadas por Expediciones Allinkay: transferencias bancarias, PayPal, Stripe, Wise y más. Reserva tu tour de forma segura.',
};

const PaymentCard = ({
    icon,
    title,
    methods,
    note,
    hasCommission,
}: {
    icon: React.ReactNode;
    title: string;
    methods: string[];
    note?: string;
    hasCommission?: boolean;
}) => (
    <div className={`bg-white rounded-2xl shadow-lg p-8 border-2 hover-lift ${hasCommission ? 'border-accent-300' : 'border-turquoise-100'}`}>
        {hasCommission && (
            <div className="bg-accent-50 text-accent-700 text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1 mb-4">
                <Info className="w-3 h-3" /> Comisión adicional
            </div>
        )}
        <div className="w-14 h-14 bg-turquoise-50 rounded-xl flex items-center justify-center mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-turquoise-800 mb-3">{title}</h3>
        <ul className="space-y-2 mb-4">
            {methods.map((m) => (
                <li key={m} className="flex items-start gap-2 text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-turquoise-500 flex-shrink-0 mt-0.5" />
                    {m}
                </li>
            ))}
        </ul>
        {note && (
            <p className="text-xs text-gray-400 mt-3 border-t border-gray-100 pt-3 leading-relaxed">{note}</p>
        )}
    </div>
);

export default function PagosPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative bg-gradient-to-r from-turquoise-700 to-lightblue-600 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-10 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob"></div>
                    <div className="absolute bottom-10 left-20 w-80 h-80 bg-accent-400/10 rounded-full blur-3xl animate-blob animation-delay-200"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6 text-sm font-medium">
                        <CreditCard className="w-4 h-4 text-accent-400" />
                        <span>Métodos de Pago Seguros</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                        Formas de <span className="text-accent-400">Pago</span>
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto text-turquoise-100 animate-fade-in animation-delay-200">
                        Múltiples opciones para que reserves con total comodidad y seguridad
                    </p>
                </div>
            </section>

            {/* Important notice */}
            <section className="py-8 bg-accent-50 border-b border-accent-200">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto flex gap-4 items-start">
                        <AlertCircle className="w-6 h-6 text-accent-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-accent-800 mb-1">Nota sobre pagos con tarjeta de crédito</p>
                            <p className="text-accent-700 text-sm leading-relaxed">
                                Los pagos realizados con <strong>tarjeta de crédito</strong> a través de nuestras plataformas de pago en línea (Stripe, PayPal) tienen una <strong>comisión adicional del 3.5% al 5%</strong> sobre el total, correspondiente a los cargos de procesamiento de las pasarelas de pago. Esta comisión no aplica a transferencias bancarias, Yape o pagos en efectivo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Payment Methods */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold text-turquoise-900 mb-4">
                            Aceptamos <span className="gradient-text-turquoise">todos los medios</span> de pago
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Elige la opción que más te convenga. Todos nuestros medios de pago son seguros y confiables.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <PaymentCard
                            icon={<Banknote className="w-7 h-7 text-turquoise-600" />}
                            title="Transferencia Bancaria"
                            methods={[
                                'BCP (Banco de Crédito del Perú)',
                                'Interbank',
                                'BBVA Perú',
                                'Scotiabank Perú',
                                'Cuenta en dólares o soles',
                            ]}
                            note="Sin comisiones adicionales. Proporciona tu comprobante de pago por WhatsApp o email."
                        />

                        <PaymentCard
                            icon={<Smartphone className="w-7 h-7 text-turquoise-600" />}
                            title="Pagos Digitales Perú"
                            methods={[
                                'Yape (número: +51 995 669 380)',
                                'Plin',
                                'Lukita',
                            ]}
                            note="Disponible solo para clientes con cuenta bancaria en Perú. Sin comisiones adicionales."
                        />

                        <PaymentCard
                            icon={<Globe className="w-7 h-7 text-turquoise-600" />}
                            title="Transferencias Internacionales"
                            methods={[
                                'Wise (TransferWise) — recomendado internacional',
                                'Western Union',
                                'MoneyGram',
                            ]}
                            note="Opción ideal para clientes fuera de Perú. Las comisiones propias de cada plataforma corren por cuenta del cliente."
                        />

                        <PaymentCard
                            icon={<CreditCard className="w-7 h-7 text-accent-600" />}
                            title="PayPal"
                            methods={[
                                'Visa / Mastercard vía PayPal',
                                'American Express vía PayPal',
                                'Saldo PayPal',
                            ]}
                            note="Comisión adicional del 3.5%–5% sobre el total por cargos de procesamiento PayPal."
                            hasCommission
                        />

                        <PaymentCard
                            icon={<CreditCard className="w-7 h-7 text-accent-600" />}
                            title="Tarjeta de Crédito / Débito"
                            methods={[
                                'Visa',
                                'Mastercard',
                                'American Express',
                                'Diners Club',
                                'Procesado vía Stripe',
                            ]}
                            note="Comisión adicional del 3.5%–5% sobre el total por cargos de la pasarela Stripe."
                            hasCommission
                        />

                        <PaymentCard
                            icon={<Banknote className="w-7 h-7 text-turquoise-600" />}
                            title="Efectivo"
                            methods={[
                                'En soles peruanos (PEN)',
                                'En dólares americanos (USD)',
                                'En euros (EUR)',
                            ]}
                            note="Disponible para clientes que se encuentren en Cusco. Coordinar previamente por WhatsApp."
                        />
                    </div>
                </div>
            </section>

            {/* How to Pay */}
            <section className="py-16 bg-gradient-to-b from-white to-turquoise-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-turquoise-900 mb-10 text-center">
                            ¿Cómo realizar tu <span className="gradient-text-turquoise">reserva</span>?
                        </h2>
                        <div className="space-y-4">
                            {[
                                { step: '1', title: 'Elige tu tour', desc: 'Selecciona el tour o paquete que deseas en nuestro catálogo.' },
                                { step: '2', title: 'Contacta con nosotros', desc: 'Escríbenos por WhatsApp (+51 995 669 380), email o usa el formulario de contacto para solicitar disponibilidad.' },
                                { step: '3', title: 'Recibe tu cotización', desc: 'Te enviamos todos los detalles del tour, precio total y opciones de pago disponibles.' },
                                { step: '4', title: 'Realiza el depósito inicial', desc: 'Deposita el 30% del total para confirmar tu reserva. El saldo se cancela 15 días antes.' },
                                { step: '5', title: '¡Listo! Confirma tu aventura', desc: 'Con el comprobante de pago, tu reserva queda oficialmente confirmada y recibirás todos los detalles por email.' },
                            ].map((item) => (
                                <div key={item.step} className="flex gap-5 items-start bg-white rounded-xl p-5 shadow-sm border border-turquoise-100">
                                    <div className="w-10 h-10 bg-gradient-to-br from-turquoise-500 to-turquoise-700 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-sm">
                                        {item.step}
                                    </div>
                                    <div>
                                        <div className="font-bold text-turquoise-800 mb-1">{item.title}</div>
                                        <div className="text-gray-500 text-sm">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-br from-turquoise-700 to-turquoise-900 text-white">
                <div className="container mx-auto px-4 text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">¿Listo para reservar tu aventura?</h2>
                    <p className="text-turquoise-100 text-lg mb-8">
                        Contáctanos y te guiaremos en todo el proceso de reserva con total transparencia.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/tours" className="bg-white text-turquoise-700 px-8 py-4 rounded-full font-semibold hover:bg-turquoise-50 transition hover:scale-105 inline-block">
                            Ver Tours
                        </Link>
                        <a href="https://wa.me/51995669380" target="_blank" rel="noopener noreferrer" className="btn-glass inline-block">
                            WhatsApp: +51 995 669 380
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
