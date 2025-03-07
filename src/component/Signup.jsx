import React, { useState } from "react";
import loginbackground from "../assets/loginbackground.jpg";
import signupSub1 from "../assets/signupSub1.jpg";
import * as UserAPI from "../service/UserAPI";
import { Outlet, Link, useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(false); //
    const [errorMessage, setErrorMessage] = useState(""); //    
    // Signup Function
    const signup = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = {
            "phone_number": form.elements.phoneNumber.value,
            "password": form.elements.password.value,
            "email": form.elements.email.value,
            "full_name": form.elements.full_name.value
        };
        console.log(data);
        const response = await UserAPI.signup(data);
        if (response.status === 200) {
            alert("Sign up successfully");
            navigate("/");
        } else if (response.status === 400) {
            setError(true);
            setErrorMessage(response.data.Message);
        }
    };
    // Close Error Message
    const closeErrorMessage = () => {
        setError(false);
    }
    return (
        <div className="h-screen w-screen bg-cover flex items-center justify-center relative"
            /* Background Image */
            style={{ backgroundImage: `url(${loginbackground})` }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-90"></div>
            {/* Sign up Form */}
            <div className="relative z-10  flex gap-4 border-1 border-gray-600 p-8 rounded-lg">
                {/* Carouesel Picture */}
                <div className=" relative z-10 flex p-8 rounded-lg shadow-md w-100">
                    <img src={signupSub1} alt="Login Background" className="rounded-xl" />
                </div>
                {/* Sing up form */}
                <div className=" relative z-10 bg-black-200 p-8 rounded-lg shadow-md w-96">
                    <h4 className="text-2xl font-bold text-white  text-center mb-6">Sign up</h4>
                    <form onSubmit={signup}>
                        {/* Email Input */}
                        <div className="mb-3">
                            <label className="block text-white text-sm font-semibold mb-2" htmlFor="phoneNumber">
                                Phone Number
                            </label>
                            <input
                                name="phoneNumber"
                                required
                                type="text"
                                id="phoneNumber"
                                placeholder="Enter your Phone Number"
                                className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        {/* Password Input */}
                        <div className="mb-3">
                            <label className="block text-white text-sm font-semibold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                name="password"
                                required
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        {/* Full Name Input */}
                        <div className="mb-3">
                            <label className="block text-white text-sm font-semibold mb-2" htmlFor="full_Name">
                                Full Name
                            </label>
                            <input
                                name="full_name"
                                required
                                type="text"
                                id="fullName"
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        {/* Full Email  Input */}
                        <div className="mb-3">
                            <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                name="email"
                                required
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        {/* Error Message */}
                        {
                            error && (
                                <div id="toast-danger" class="flex items-center w-full max-w-xs p-2 mb-2 text-gray-500 bg-red-200 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert">
                                    <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                                        </svg>
                                        <span class="sr-only">Error icon</span>
                                    </div>
                                    <div class="ms-3 text-sm text-red-600  font-normal">{errorMessage}</div>
                                    <button type="button" class="ms-auto -mx-1.8 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-6 w-6 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 hover-pointer" data-dismiss-target="#toast-danger" aria-label="Close" onClick={closeErrorMessage}>
                                        <span class="sr-only">Close</span>
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                    </button>
                                </div>
                            )
                        }
                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-yellow-700 hover:bg-yellow-900 text-white font-semibold py-2 rounded-md transition duration-300 mt-3"
                        >
                            Sign up
                        </button>
                    </form>

                    {/* Forgot Password + Register */}
                    <div className="text-center mt-4">
                        <a href="#" className="text-gray-400 text-sm hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <div className="text-center mt-2">
                        <Link to={"/"}>
                            <a href="#" className="text-gray-400 text-sm hover:underline">
                                Have already account ? <span className="text-blue-400">Login</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
