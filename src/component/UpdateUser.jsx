import React from "react";
import NavBar from "./Basic/NavBar";
import Footer from "./Basic/Footer";
import image1 from "../assets/information2.png";
import image3 from "../assets/information3.png";
import { useState } from "react";
import { useAuth } from "../hooks/userAuth";
import * as UserAPI from "../service/UserAPI";
import Cookies from "js-cookie";
export default function UpdateUser() {
    const [isReadOnly, setIsReadOnly] = useState(true);
    const { user, setUser } = useAuth();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    if (!user) {
        return <p className="text-black text-center">Loading user data...</p>;
    }
    // Function 
    const toggleReadOnly = (e) => {
        e.preventDefault();
        setIsReadOnly(!isReadOnly);
    }
    const onChangeValue = (e) => {
        setUser(prevUser => ({
            ...prevUser,
            [e.target.name]: e.target.value
        }));
    };
    const updateUser = async (e) => {
        e.preventDefault();
        const data = {
            "id": user?.UserID,
            "email": user?.email,
            "password": user?.password,
            "fullName": user?.fullName,
            "phoneNumber": user?.phone,
        };
        const token = Cookies.get('token');
        console.log(token);
        try {
            const response = await UserAPI.updateUser(data);
            if (response.status === 200) {
                alert("Update Successfully")
            } else if (response.status === 400) {
                setError(true);
                setErrorMessage(response.data.Message);
            } else {
                setError(true);
                setErrorMessage(response.data.error);
            }
        } catch (error) {
            console.error("Update failed:", error);
            alert(error);
        }
    }
    // Close Error Message
    const closeErrorMessage = () => {
        setError(false);
    }
    return (
        <div>
            <NavBar />
            <div className="bg-black text-white font-sans">
                {/* Header Section */}
                <div className="relative lg:h-[500px] lg:mx-10 flex items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: `url(${image1})` }}>
                    <div className="absolute inset-0 bg-black/50"></div>
                    <h1 className="relative text-6xl font-bold uppercase text-white z-10">Information</h1>
                </div>
                {/* Contact Info Section */}
                <div className="flex flex-col md:flex-row px-10 py-16 max-w-6xl mx-auto">
                    {/* Left Side - Contact Info */}
                    <div className="md:w-1/2 pr-10 pt-10">
                        <div className="flex w-full items-center mb-6 gap-4">
                            <hr className="w-1/8 border border-yellow-600" />
                            <p className="text-xl text-yellow-600 uppercase">Keep Close</p>
                        </div>
                        <h3 className="text-4xl font-semibold mb-5">GET IN TOUCH</h3>
                        <p className="text-gray-400 mb-6 menu-content">
                            Something wrong, contact us via
                        </p>
                        <p className="mb-2 menu-content"><strong>SteakHouse Restaurant, 350 NVL 16 Dis HCM City</strong></p>
                        <p className="mb-2 menu-content">📞 0906371703</p>
                        <p className="mb-2 menu-content">📧 chuongnguyen16112002@gmail.com</p>
                        <p className="mb-6 menu-content">🕒 Open 14:00 - 22:00</p>
                        <div className="flex space-x-4 text-yellow-500">
                            <i className="fab fa-facebook text-2xl cursor-pointer"></i>
                            <i className="fab fa-instagram text-2xl cursor-pointer"></i>
                            <i className="fab fa-twitter text-2xl cursor-pointer"></i>
                        </div>
                    </div>
                    {/* Right Side - Contact Form */}
                    <div className="md:w-1/2 p-8 rounded-lg">
                        <h3 className="text-2xl font-semibold mb-5">Your Information</h3>
                        <form onSubmit={updateUser}>
                            {/* Name & Email Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <span className="text-gray-400 text-sm">Full Name</span>
                                    <input required name="fullName" onChange={onChangeValue} readOnly={isReadOnly} type="text" value={user?.fullName} placeholder="Enter Your Name" className="p-3 bg-black text-white border border-gray-600 w-full rounded-md" />
                                </div>
                                <div>
                                    <span className="text-gray-400 text-sm">Phone Number</span>
                                    <input required name="phone" onChange={onChangeValue} readOnly={isReadOnly} type="text" value={user?.phone} placeholder="Enter Your Phone Number" className="p-3 bg-black text-white border border-gray-600 w-full rounded-md" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="text-gray-400 text-sm"> Email</span>
                                <input name="email" onChange={onChangeValue} readOnly={isReadOnly} type="email" value={user?.email} placeholder="Enter Your Email" className="p-3 bg-black text-white border border-gray-600 w-full rounded-md" />
                            </div>
                            <div className="mt-4">
                                <span className="text-gray-400 text-sm">Password</span>
                                <input required name="password" onChange={onChangeValue} readOnly={isReadOnly} type="password" placeholder="Password" className="p-3 bg-black text-white border border-gray-600 w-full rounded-md" ></input>
                            </div>
                            {/* Error Site */}
                            {
                                error && (
                                    <div id="toast-danger" class="flex items-center w-full max-w-xs p-2 mb-2 text-gray-500 bg-red-200 rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800 mt-8" role="alert">
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
                            {/* Submit Button */}
                            <button onClick={toggleReadOnly} className="mt-6 cursor-pointer border-1 border-grey-400 b text-gray-400 px-6 py-3 font-semibold rounded-md w-1/4 menu-content mr-2">Update</button>
                            <button type="submit" className={`mt-6 cursor-pointer bg-yellow-600 text-black px-6 py-3 font-semibold rounded-md hover:bg-yellow-500 w-1/4 menu-content ml-2 ${isReadOnly ? "hidden" : ""}`}>
                                Save
                            </button>
                        </form>
                    </div>
                </div>

                {/* Reservation Section */}
                <div className="relative h-[400px] flex flex-col items-center justify-center bg-cover bg-center lg:mx-10" style={{ backgroundImage: `url(${image3})` }}>
                    <div className="absolute inset-0 bg-black/50"></div>
                    <h4 className=" relative z-10 text-6xl font-bold uppercase mb-4">Reserve A Table Now</h4>
                    <button className=" relative z-10 bg-yellow-700 text-black px-6 py-3 font-semibold hover:bg-yellow-500 mt-5">Make a Reservation</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}