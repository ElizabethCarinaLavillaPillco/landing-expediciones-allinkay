'use client';

import { useCart } from '@/contexts/CartContext';
import { getImageUrl } from '@/lib/api';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const router = useRouter();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito esta vacío</h2>
                    <p className="text-gray-600 mb-8">Start adding tours to your cart!</p>
                    <Link
                        href="/tours"
                        className="inline-flex items-center bg-gradient-to-r from-turquoise-500 to-turquoise-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                    >
                        Browse Tours
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </div>
            </div>
        );
    }

    const handleCheckout = () => {
        router.push('/checkout');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Tu carrito</h1>
                    <p className="text-gray-600">{cart.length} tour(s) en tu carrito</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6"
                            >
                                {/* Tour Image */}
                                <div className="w-full md:w-48 h-48 flex-shrink-0">
                                    <img
                                        src={getImageUrl(item.primary_image || (item.images && item.images.length > 0 ? item.images[0].image_path : null))}
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                </div>

                                {/* Tour Details */}
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <Link
                                                href={`/tours/${item.slug}`}
                                                className="text-xl font-bold text-gray-900 hover:text-turquoise-600 transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                            <p className="text-gray-600 text-sm mt-1">
                                                {typeof item.destination === 'string' ? item.destination : item.destination?.name} • {item.duration}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {item.short_description}
                                    </p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm text-gray-600">People:</span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-12 text-center font-medium">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-sm text-gray-600">
                                                ${item.price} × {item.quantity}
                                            </div>
                                            <div className="text-xl font-bold text-turquoise-600">
                                                ${item.price * item.quantity}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen de tu pedido</h2>

                            <div className="space-y-4 mb-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            {item.name} × {item.quantity}
                                        </span>
                                        <span className="font-medium">${item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-3xl font-bold text-turquoise-600">
                                        ${cartTotal}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Final price may vary based on travel dates and additional services
                                </p>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-gradient-to-r from-turquoise-500 to-turquoise-600 hover:from-turquoise-600 hover:to-turquoise-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 mb-3"
                            >
                                Proceed to Checkout
                            </button>

                            <button
                                onClick={clearCart}
                                className="w-full text-gray-600 hover:text-red-600 font-medium text-sm transition-colors"
                            >
                                Clear Cart
                            </button>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h4 className="font-bold text-gray-900 mb-3 text-sm">Need Help?</h4>
                                <Link
                                    href="https://wa.me/51995669380"
                                    target="_blank"
                                    className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
                                    </svg>
                                    Chat with us on WhatsApp
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}