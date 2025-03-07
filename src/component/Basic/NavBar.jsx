import React from "react";
import { Link } from "react-router-dom";
export default function NavBar() {
    return (
        <nav className="flex justify-between items-center py-5 px-10 bg-black text-white">
            <h1 className="text-3xl font-semibold text-yellow-500 brand italic">SteakHouse</h1>
            <ul className="flex gap-6">
                <li className="hover:text-yellow-500 cursor-pointer"><Link to={"/homepage"}>Home</Link></li>
                <li className="hover:text-yellow-500 cursor-pointer">About Us</li>
                <li className="hover:text-yellow-500 cursor-pointer"><Link to={"/menu"}>Menu</Link></li>
                <li className="hover:text-yellow-500 cursor-pointer">Events</li>
                <li className="hover:text-yellow-500 cursor-pointer">Contact</li>
                <li className="hover:text-yellow-500 cursor-pointer">Reservations</li>
            </ul>
            <button className="border border-yellow-500 px-4 py-1 rounded-md hover:bg-yellow-500 hover:text-black">
                EN ▾
            </button>
        </nav>
    );
};