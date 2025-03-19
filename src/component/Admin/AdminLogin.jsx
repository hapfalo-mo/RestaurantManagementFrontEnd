import React, { useState } from "react";
import * as UserAPI from "../../service/UserAPI"
import { jwtDecode } from "jwt-decode"
import { useAuth } from "../../hooks/userAuth";
import { useNavigate } from "react-router-dom";
export default function AdminLogin() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { use, saveUser } = useAuth();
    const loginAdmin = async (e) => {
        e.preventDefault();
        const data = {
            "phone": e.target.phone.value,
            "password": e.target.password.value,
        };
        const response = await UserAPI.login(data)
        setLoading(true)
        const userData = jwtDecode(response?.data.Data)
        if (userData?.role !== 1) {
            console.log(userData)
            alert("Forbidden! Only Admin could login this page!")
        } else {
            saveUser(userData)
            navigate("/admin/dashboard")
        }
    }
    return (
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    SteakHouse Admin
                </a>
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form class="space-y-4 md:space-y-6" onSubmit={loginAdmin}>
                            <div>
                                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Private Phone</label>
                                <input type="number" name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="private@email" required></input>
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required></input>
                            </div>
                            <button type="submit" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}