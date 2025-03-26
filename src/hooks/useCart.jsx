import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Cookie } from "@mui/icons-material";
const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [carts, setCarts] = useState([]);

    // Load Card from Cookies
    const loadCartFromCookies = () => {
        const cookieCart = Cookies.get("cart");
        try {
            const parsed = cookieCart ? JSON.parse(cookieCart) : [];
            if (Array.isArray(parsed)) {
                setCarts(parsed);
            } else {
                setCarts([]);
            }
        } catch (error) {
            setCarts([]);
            console.error("Error loading cart:", error);
        }
    };
    // Load again when it read mount ?
    useEffect(() => {
        loadCartFromCookies();
    }, []);
    // Function Add To Cart
    const addToCart = (food) => {
        const existingList = Cookies.get("cart");
        let cartItem = existingList ? JSON.parse(existingList) : [];

        // Check if the food in already in cart 
        const existedFood = cartItem.find((item) => item.Id == food.Id)
        if (existedFood) {
            // Check if existed, increase quantiy 
            cartItem = cartItem.map((item) =>
                item.Id == food.Id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            cartItem.push({ ...food, quantity: 1 });
        }
        Cookies.set("cart", JSON.stringify(cartItem), { expires: 1 })
        setCarts(cartItem);
    };
    // Function Add To Cart
    const subtractFromCart = (food) => {
        const existingList = Cookies.get("cart");
        let cartItem = existingList ? JSON.parse(existingList) : [];
        const existedFood = cartItem.find((item) => item.Id === food.Id);
        if (!existedFood) return;
        if (existedFood.quantity <= 1) {
            const updatedCart = cartItem.filter((item) => item.Id !== food.Id);
            Cookies.set("cart", JSON.stringify(updatedCart), { expires: 1 });
            setCarts(updatedCart);
        } else {
            // Check if existed, increase quantiy 
            const updatedCart = cartItem.map((item) =>
                item.Id == food.Id ? { ...item, quantity: item.quantity - 1 } : item
            );
            Cookies.set("cart", JSON.stringify(updatedCart), { expires: 1 })
            setCarts(updatedCart);
        }
    };
    // Function Remove From cart 
    const removeFromCart = (food) => {
        const existingList = Cookies.get("cart");
        let cartItem = existingList ? JSON.parse(existingList) : [];
        const updateCart = cartItem.filter((item) => item.Id !== food.Id);
        Cookies.set("cart", JSON.stringify(updateCart), { expires: 1 });
        setCarts(updateCart);
    }
    // Get total Quanity 
    const totalQuantity = carts.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ carts, addToCart, totalQuantity, removeFromCart, subtractFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);