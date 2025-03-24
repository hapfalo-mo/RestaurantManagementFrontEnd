import React from "react";
import loginbackground from "../assets/loginbackground.jpg";
import { Outlet, Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import * as UserAPI from "../service/UserAPI";
import { useAuth } from "../hooks/userAuth"
function SubLogin() {
    const [loading, setLoading] = useState(false);
    const { user, saveUser } = useAuth()
    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        const data = Cookies.get("signupRequest");
        const parseData = JSON.parse(data);
        let request = {
            "phone_number": e.target.elements["phoneNumber"].value,
            "password": e.target.elements["password"].value,
            "email": parseData?.email,
            "full_name": parseData?.full_name
        }
        try {
            const response = await UserAPI.signup(request);
            if (response?.status === 200) {
                Cookies.remove("signupRequest", { path: "/" })
                let loginRequest = {
                    "phone": e.target.elements["phoneNumber"].value,
                    "password": e.target.elements["password"].value
                }
                const response = await UserAPI.login(loginRequest);
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
                    // setError(true);
                    // setErrorMessage(response.data.Message);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="h-screen w-screen bg-cover flex items-center justify-center relative"
            /* Background Image */
            style={{ backgroundImage: `url(${loginbackground})` }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-90"></div>
            {/* Login Form */}
            <div className="relative z-10  flex gap-4 border-1 border-gray-600 p-8 rounded-lg">
                {/* Carouesel Picture */}
                <div className=" relative z-10 bg-red- p-8 rounded-lg shadow-md w-110">
                    <img alt="Login Background" className="rounded-xl" />
                </div>
                {/* Login Form */}
                <div className=" relative z-10 bg-black-200 p-8 rounded-lg shadow-md w-96">
                    <h4 className="text-2xl font-bold text-white  text-center mb-6">Add Information</h4>
                    <form onSubmit={handleSignup}>
                        {/* Email Input */}
                        <div className="mb-3">
                            <label className="block text-white text-sm font-semibold mb-2">
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
                        {/* Password Input */}
                        <div className="mb-3">
                            <label className="block text-white text-sm font-semibold mb-2">
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
                        {/* Error Message */}
                        {
                            // error && (
                            //     <div id="toast-danger" class="flex items-center w-full max-w-xs p-2 mb-2 text-gray-500 bg-red-200 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert">
                            //         <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                            //             <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            //                 <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                            //             </svg>
                            //             <span class="sr-only">Error icon</span>
                            //         </div>
                            //         <div class="ms-3 text-sm text-red-600  font-normal">{errorMessage}</div>
                            //         <button type="button" class="ms-auto -mx-1.8 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-6 w-6 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 hover-pointer" data-dismiss-target="#toast-danger" aria-label="Close" onClick={closeErrorMessage}>
                            //             <span class="sr-only">Close</span>
                            //             <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            //                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            //             </svg>
                            //         </button>
                            //     </div>
                            // )
                        }
                        {/* Login Button */}
                        <button
                            type="submit"
                            className="cursor-pointer w-full bg-yellow-700 hover:bg-yellow-900 text-white font-semibold py-2 rounded-md transition duration-300 mt-2"
                        >
                            {loading ? (
                                <svg
                                    aria-hidden="true"
                                    role="status"
                                    className="inline w-4 h-4 me-3 text-white animate-spin"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            ) : (
                                `Continue..`
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SubLogin