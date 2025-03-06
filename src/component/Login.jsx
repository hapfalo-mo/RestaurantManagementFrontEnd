import React from "react";
import loginbackground from "../assets/loginbackground.jpg";
import loginSub2 from "../assets/loginSub2.jpg";
import * as UserAPI from "../service/UserAPI";
function Login() {
    // Login Function
    const login = async (e) => {
        e.preventDefault();
        const data = {
            "phone": e.target.phoneNumber.value,
            "password": e.target.password.value,
        };
        const response = await UserAPI.login(data);
        if (response.status === 200) {
            alert(response.data.Message);
        } else if (response.status === 400) {
            console.log(response);
            alert(response.data.Message);
        }
    };
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
                <div className=" relative z-10 bg-red- p-8 rounded-lg shadow-md w-100">
                    <img src={loginSub2} alt="Login Background" />
                </div>
                {/* Login Form */}
                <div className=" relative z-10 bg-black p-8 rounded-lg shadow-md w-96">
                    <h2 className="text-2xl font-bold text-white  text-center mb-6">Login</h2>
                    <form onSubmit={login}>
                        {/* Email Input */}
                        <div className="mb-4">
                            <label className="block text-white text-sm font-semibold mb-2" htmlFor="email">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phoneNumber"
                                placeholder="Enter your Phone Number"
                                className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm font-semibold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-yellow-700 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Forgot Password + Register */}
                    <div className="text-center mt-4">
                        <a href="#" className="text-gray-400 text-sm hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <div className="text-center mt-2">
                        <a href="#" className="text-gray-400 text-sm hover:underline">
                            Don't have an account? <span className="text-blue-400">Register</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
