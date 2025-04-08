import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Cookie } from "@mui/icons-material";
const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [carts, setCarts] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

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
        // Notification
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
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
        <CartContext.Provider value={{ carts, addToCart, totalQuantity, removeFromCart, subtractFromCart, setCarts }}>
            {children}
            {showNotification && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 w-80">
                    <div className="text-green-500 text-4xl mb-4 text-center border-none">
                        ✔
                    </div>
                    <div className="text-lg font-bold text-center mb-4">
                        Thêm vào giỏ hàng thành công
                    </div>
                    <button
                        onClick={() => setShowNotification(false)}
                        className="bg-red-500 text-white px-6 py-2 rounded-md w-full hover:bg-red-600 transition duration-300 cursor-pointer"
                    >
                        OK
                    </button>
                </div>
            )}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);