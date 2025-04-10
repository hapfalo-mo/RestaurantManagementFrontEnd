import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/userAuth";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../hooks/useCart";
export default function NavBar() {
    const { user, logout } = useAuth();
    const { totalQuantity } = useCart();
    // Use Effect 
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
                {user && <li className="hover:text-yellow-500 cursor-pointer"><Link to={"/food-select"}>Order</Link></li>}
                {user && <li className="hover:text-yellow-500 cursor-pointer"><Link to={"/reservationhistory"}>History</Link></li>}
                {/* Giỏ hàng */}
                {user &&
                    <li className="relative hover:text-yellow-500 cursor-pointer">
                        <Link to={"/cart"}>
                            <FaShoppingCart size={20} />
                            {totalQuantity >= 1 && (
                                <span className="absolute -top-4 -right-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {totalQuantity}
                                </span>
                            )}
                        </Link>
                    </li>
                }
            </ul>
            <button className=" hover-pointer border border-yellow-500 px-4 py-1 rounded-md hover:bg-yellow-500 hover:text-black">
                {user ? <Link to={"/"} onClick={logout}>Logout</Link> : <Link to={"/"}>Login Here</Link>}
            </button>
        </nav>
    );
};