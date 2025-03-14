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
    const navigate = useNavigate();
    // Check if user is logged in 
    useEffect(() => {
        if (user === null) {
            navigate("/");
        }
    }, [user, navigate]);
    // Login Function
    const saveUser = (userData) => {
        setUser(userData);
        Cookies.set("user", JSON.stringify(userData), { expires: 3 }); // Store user data
    };
    const logout = async () => {
        await setUser(null);
        await Cookies.remove("user", { path: "/" });
        await Cookies.remove("token", { path: "/" });
        navigate("/");
    };
    //  Check expire for Token
    useEffect(() => {
        const token = Cookies.get('token')
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            if (decodedToken?.exp < currentTime) {
                alert("Your time is out. Login again please")
                logout();
            }
        } catch (error) {
            console.error("Error coding token", error);
            Cookies.remove('token');
            navigate("/")
        }
    })

    return (
        <AuthContext.Provider value={{ user, setUser, logout, saveUser }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);