import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const storedUser = Cookies.get("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    // Login Function
    const saveUser = (userData) => {
        setUser(userData);
        Cookies.set("user", JSON.stringify(userData), { expires: 3 }); // Store user data
    };
    const logout = async () => {
        setUser(null);
        Cookies.remove("user", { path: "/" });
        Cookies.remove("token", { path: "/" });
        window.location.href = "/";
    };
    return (
        <AuthContext.Provider value={{ user, setUser, logout, saveUser }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);