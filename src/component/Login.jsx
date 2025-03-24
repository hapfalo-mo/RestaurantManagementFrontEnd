import React, { useState } from "react";
import loginbackground from "../assets/loginbackground.jpg";
import loginSub2 from "../assets/loginSub2.jpg";
import * as UserAPI from "../service/UserAPI";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/userAuth";
import { jwtDecode } from "jwt-decode";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../hooks/fireBase";
import Cookies from "js-cookie";

function Login() {
    const navigate = useNavigate();
    const { user, saveUser } = useAuth();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async (e) => {
        e.preventDefault();
        const data = {
            phone: e.target.phoneNumber.value,
            password: e.target.password.value,
        };
        setLoading(true);
        const response = await UserAPI.login(data);
        if (response.status === 200) {
            setTimeout(() => setLoading(false), 3000);
            try {
                const userDecode = jwtDecode(response?.data.Data);
                saveUser(userDecode);
                navigate("/homepage");
            } catch (err) {
                console.log(err);
            }
        } else if (response.status === 400) {
            setLoading(false);
            setError(true);
            setErrorMessage(response.data.Message);
        }
    };

    const closeErrorMessage = () => {
        setError(false);
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            const data = {
                email: result?.user?.email,
                isVerify: result?.user?.emailVerified,
            };
            Cookies.set("ggrequest", JSON.stringify(data), { expires: 1 });
            const response = await UserAPI.loginGoogle(data);
            Cookies.remove("ggrequest", { path: '/' });
            setLoading(true);
            if (response?.status === 200) {
                setTimeout(() => setLoading(false), 3000);
                const userDecode = jwtDecode(response?.data.Data);
                saveUser(userDecode);
                navigate("/homepage");
            } else {
                let data = {
                    "email": result?.user?.email,
                    "full_name": result?.user?.displayName,
                }
                console.log(data)
                Cookies.set("signupRequest", JSON.stringify(data), { expires: 1 })
                navigate("/sub-login");
            }
        } catch (error) {
            console.log("Google login error:", error);
            setLoading(false);
        }
    };

    return (
        <div
            className="h-screen w-screen bg-cover flex items-center justify-center relative"
            style={{ backgroundImage: `url(${loginbackground})` }}
        >
            <div className="absolute inset-0 bg-black opacity-90"></div>
            <div className="relative z-10 flex gap-4 border-1 border-gray-600 p-8 rounded-lg">
                <div className="relative z-10 p-8 rounded-lg shadow-md w-110">
                    <img src={loginSub2} alt="Login Background" className="rounded-xl" />
                </div>
                <div className="relative z-10 p-8 rounded-lg shadow-md w-96 bg-black bg-opacity-20">
                    <h4 className="text-2xl font-bold text-white text-center mb-6">Login</h4>
                    <form onSubmit={login}>
                        <div className="mb-3">
                            <label className="block text-white text-sm font-semibold mb-2" htmlFor="phoneNumber">
                                Phone Number
                            </label>
                            <input
                                required
                                type="text"
                                id="phoneNumber"
                                placeholder="Enter your Phone Number"
                                className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="block text-white text-sm font-semibold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                required
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        {error && (
                            <div className="flex items-center w-full max-w-xs p-2 mb-2 text-gray-500 bg-red-200 rounded-lg shadow-sm">
                                <div className="inline-flex items-center justify-center w-8 h-8 text-red-500 bg-red-100 rounded-lg">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Z..." />
                                    </svg>
                                </div>
                                <div className="ml-3 text-sm text-red-600 font-normal">{errorMessage}</div>
                                <button onClick={closeErrorMessage} className="ml-auto p-1.5">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 14 14">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-yellow-700 hover:bg-yellow-900 text-white font-semibold py-2 rounded-md transition duration-300 mt-2"
                        >
                            {loading ? (
                                <svg className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101">
                                    <path fill="#E5E7EB" d="..." />
                                    <path fill="currentColor" d="..." />
                                </svg>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                    <div className="text-center m-4">
                        <p className="text-white">Or</p>
                    </div>
                    <div className="text-center mt-4">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="cursor-pointer w-full flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 font-medium py-2 rounded-md hover:bg-gray-100 transition duration-300"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google Logo"
                                className="w-5 h-5"
                            />
                            Sign in with Google
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <span className="text-gray-400 text-sm">Forgot password?</span>
                    </div>
                    <div className="text-center mt-2">
                        <Link to={"/signup"} className="text-gray-400 text-sm hover:underline">
                            Don't have an account? <span className="text-blue-400">Register</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;