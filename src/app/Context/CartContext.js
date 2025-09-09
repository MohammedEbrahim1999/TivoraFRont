"use client";
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize from localStorage only once
    const [cartTotalPrice, setCartTotalPrice] = useState(0); // initialize with 0

    useEffect(() => {
        // run only on client
        const storedTotal = localStorage.getItem("cartTotalPrice");
        if (storedTotal) {
            setCartTotalPrice(Number(storedTotal));
        }
    }, []);

    // Save to localStorage whenever cartTotalPrice changes
    useEffect(() => {
        localStorage.setItem("cartTotalPrice", cartTotalPrice);
    }, [cartTotalPrice]);

    const addToCart = (price) => {
        setCartTotalPrice((prev) => prev + price);
    };

    const removeFromCart = (price) => {
        setCartTotalPrice((prev) => Math.max(prev - price, 0)); // prevent going below 0
    };

    return (
        <CartContext.Provider value={{ cartTotalPrice, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
