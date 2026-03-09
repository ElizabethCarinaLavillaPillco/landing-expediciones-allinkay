'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tour } from '@/types/tour';

interface CartItem extends Tour {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (tour: Tour) => void;
    removeFromCart: (tourId: number) => void;
    updateQuantity: (tourId: number, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('tourCart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('tourCart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (tour: Tour) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === tour.id);

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === tour.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevCart, { ...tour, quantity: 1 }];
        });
    };

    const removeFromCart = (tourId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== tourId));
    };

    const updateQuantity = (tourId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(tourId);
            return;
        }

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === tourId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}