import React, { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import type { Meme } from '../services/memeApi';

export interface CartItem extends Meme {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (meme: Meme) => void;
    removeItem: (id: string) => void;
    decreaseCount: (id: string) => void;
    clearCart: () => void;
    totalPrice: number;
    totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [storedCart, setStoredCart] = useLocalStorage<CartItem[]>('cart', []);
    const [items, setItems] = useState<CartItem[]>(storedCart);

    useEffect(() => {
        setItems(storedCart);
    }, [storedCart]);

    const updateCart = (newItems: CartItem[]) => {
        setItems(newItems);
        setStoredCart(newItems);
    };

    const addItem = (meme: Meme) => {
        const existing = items.find(item => item.id === meme.id);
        if (existing) {
            updateCart(items.map(item =>
                item.id === meme.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            updateCart([...items, { ...meme, quantity: 1 }]);
        }
    };

    const removeItem = (id: string) => {
        updateCart(items.filter(item => item.id !== id));
    };

    const decreaseCount = (id: string) => {
        const existing = items.find(item => item.id === id);
        if (existing && existing.quantity > 1) {
            updateCart(items.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ));
        } else {
            removeItem(id);
        }
    };

    const clearCart = () => {
        updateCart([]);
    };

    const totalPrice = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, decreaseCount, clearCart, totalPrice, totalItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
