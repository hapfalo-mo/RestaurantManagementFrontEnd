import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/userAuth";
export default function NavBar() {
    const { user, logout } = useAuth();
    return (
        <nav className="flex justify-between items-center py-5 px-10 bg-black text-white">
            <h1 className="text-3xl font-semibold text-yellow-500 brand italic">SteakHouse</h1>
            <ul className="flex gap-6">
                <li className="hover:text-yellow-500 cursor-pointer"><Link to={"/homepage"}>Home</Link></li>
                <li className="hover:text-yellow-500 cursor-pointer">About Us</li>
                <li className="hover:text-yellow-500 cursor-pointer"><Link to={"/menu"}>Menu</Link></li>
                <li className="hover:text-yellow-500 cursor-pointer">Contact</li>
                {user && <li className="hover:text-yellow-500 cursor-pointer"><Link to={"/reservation"}>Reservation</Link></li>}
                {user && <li className="hover:text-yellow-500 cursor-pointer"><Link to={"/infor"}>Information</Link></li>}
            </ul>
            <button className=" hover-pointer border border-yellow-500 px-4 py-1 rounded-md hover:bg-yellow-500 hover:text-black">
                {user ? <Link to={"/"} onClick={logout}>Logout</Link> : <Link to={"/"}>Login Here</Link>}
            </button>
        </nav>
    );
};