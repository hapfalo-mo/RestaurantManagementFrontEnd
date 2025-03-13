import React from "react";
import NavBar from "./Basic/NavBar";
import Footer from "./Basic/Footer";
import image1 from "../assets/reservation1.png";
import image2 from "../assets/reservation2.png";
import image3 from "../assets/reservation3.png";
import "flatpickr/dist/themes/material_green.css";
import { useRef, useEffect } from "react";
import flatpickr from "flatpickr";
import * as BookingAPI from "../service/BookingAPI";
import { useAuth } from "../hooks/userAuth";
export default function Reservation() {
    const dateInputRef = useRef(null);
    const { user, setUser } = useAuth();

    useEffect(() => {
        flatpickr(dateInputRef.current, {
            enableTime: true,
            noCalendar: false,
            dateFormat: "Y-m-d H:i:S",
            minDate: "today",
        });
    }, []);

    const bookingTable = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const guests = form.guests.value;
        const date = form.date.value;
        const request = form.request.value;
        const data = {
            "UserId": user?.UserID,
            "CustomerName": name,
            "CustomerPhone": phone,
            "GuestCount": parseInt(guests),
            "BookingDate": date.toString(),
            "Description": request
        }
        console.log(data);
        try {
            const response = await BookingAPI.BookingTable(data);
            if (response.status === 200) {
                alert("Booking Successfully");
            } else if (response.status === 400) {
                alert(response.data.Message);
            }
        } catch (error) {
            console.error("Booking failed:", error);
        }
    }
    return (
        <div>
            <NavBar />
            <div className=" w-full h-auto bg-black text-white">
                {/* Header Section */}
                <div
                    className="relative h-[500px] flex items-center justify-center bg-cover bg-center mx-12"
                    style={{ backgroundImage: `url(${image1})` }}
                >
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <h1 className=" relative text-5xl font-bold uppercase">Reservation</h1>
                </div>

                {/* Booking Section */}
                <div className="max-w-4xl mx-auto text-center py-16 px-6 border-1 border-gray-800 rounded-sm lg:mt-12 lg:mb-12">
                    <h3 className="text-6xl font-semibold mb-3 menu-content">Book A Table</h3>
                    <p className="text-gray-400 mb-6 menu-content">
                        Select your date and time to make a reservation.
                    </p>
                    <form onSubmit={bookingTable} className="p-6 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            name="name"
                            className="w-full p-3 bg-black text-white border border-gray-500 rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            className="w-full p-3 bg-black text-white border border-gray-600 rounded-md"
                        />
                        <input
                            type="number"
                            placeholder="Number of Guests"
                            name="guests"
                            className="w-full p-3 bg-black text-white border border-gray-600 rounded-md"
                        />
                        <input
                            type="text"
                            ref={dateInputRef}
                            placeholder="Select Date & Time"
                            name="date"
                            className="w-full p-3 bg-black text-white border border-gray-600 rounded-md"
                        />

                        <textarea
                            placeholder="Special Request"
                            className="w-full col-span-4 p-3 bg-black text-white border border-gray-600 rounded-md h-24"
                            name="request"
                        ></textarea>
                        {/* Note from Restaurant */}
                        <div className="w-full col-span-4 lg:col-span-4 text-left">
                            <p className="menu-content text-gray-500">* Your booking will be confirmed via telephone number. Please wait for it</p>
                            <p className="menu-content text-gray-500">* Confirmed booking just allow for 15 minutes late, so you should consider the time please !</p>
                            <p className="menu-content text-gray-500">*Thank you for choosing us. Have a good day !</p>
                        </div>
                        <div className="w-full col-span-4 lg:mt-8">
                            <button type="submit" className="w-1/4 bg-yellow-600 text-black px-6 py-3 font-semibold hover:bg-yellow-600 menu-content">
                                Book Now
                            </button>
                        </div>
                    </form>
                </div>

                {/* Restaurant Locations */}
                <div className=" relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 pb-16">
                    <div className="absolute inset-0 bg-black/70 unded-lg"></div>
                    <div className=" relative  p-6 rounded-lg text-center">
                        <img
                            src={image2}
                            alt="New York Restaurant"
                            className="rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-semibold">Go Vap Restaurant </h3>
                        <p className="text-gray-400">350 NVL, 16 Dis, HCM city</p>
                    </div>
                    <div className=" relative p-6 rounded-lg text-center">

                        <img
                            src={image3}
                            alt="Paris Restaurant"
                            className="rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-semibold">Binh Thanh Restaurant </h3>
                        <p className="text-gray-400">Lanmark81, BT Dis, HCM city</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}