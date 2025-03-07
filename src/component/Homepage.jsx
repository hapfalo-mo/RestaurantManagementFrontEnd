import React from "react";
import NavBar from "./Basic/NavBar";
import Footer from "./Basic/Footer";
import homepage1 from "../assets/homepage1.png";
export default function Homepage() {
    return (
        <div>
            <NavBar />
            {/* Side 1 */}
            <div className="relative w-full h-screen flex items-center justify-center bg-black text-white">
                <div className="relative text-center max-w-3xl px-5">
                    <h2 className="text-5xl font-semibold font-alegreya">A Premium And Authentic <span className=" text-yellow-700 font-bold">SteakHouse</span> </h2>
                    <p className="mt-4 text-lg font-poppins text-gray-400">Experience the finest quality steaks cooked to perfection.</p>
                    <button className="mt-6 border-1 border-white text-white hover:bg-yellow-700 hover:text-black hover:font-bond hover:border-yellow-700 px-12 py-3 font-light rounded-md">
                        Book A Table
                    </button>
                </div>
                <div className="relative z-10">
                    <img
                        src={homepage1}
                        alt="Steak"
                        className="w-full h-full object-cover opacity-100"
                    />
                </div>

            </div>
            <Footer />
            {/* <p className="w-full border-2 border-yellow-600 "></p> */}
        </div>
    )
}