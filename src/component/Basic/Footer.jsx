import React from "react";
const Footer = () => {
    return (
        <footer className="bg-black text-white py-6 px-10">
            <div className="flex flex-col lg:flex-col md:flex-row justify-between items-center gap-5">
                <ul className="flex gap-6 text-sm lg:flex-col uppercase mt-4 md:mt-0 justify-between items-center">
                    <li className="hover:text-yellow-500 cursor-pointer">Privacy Policy</li>
                    <li className="hover:text-yellow-500 cursor-pointer">Terms of Service</li>
                    <li className="hover:text-yellow-500 cursor-pointer">FAQ</li>
                </ul>
                <p className="text-gray-400 text-sm mt-8 md:mt-0">© 2025 SteakHouse. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;