import React, { createContext, useContext, useEffect, useState } from "react";

// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    console.log("AuthProvider is rending...")
    const [user, setUser] = useState(null);

    // Check if user is logged in 
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    }, []);
    // Login Function
    const saveUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Store user data
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, saveUser }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);