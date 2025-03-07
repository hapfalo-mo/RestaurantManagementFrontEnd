import React from "react";
import NavBar from "./Basic/NavBar";
import loginSub1 from "../assets/loginSub1.jpg";
import loginSub2 from "../assets/loginSub2.jpg";
import Footer from "./Basic/Footer";
export default function Menu() {
    const menuItems = [
        { title: "Breads", image: loginSub1, money: 1000000 },
        { title: "Pastries", image: loginSub1, money: 1000000 },
        { title: "Sandwiches", image: loginSub2, money: 1000000 },
        { title: "Cookies", image: loginSub2, money: 1000000 },
        { title: "Sandwiches", image: loginSub2, money: 1000000 },
        { title: "Cookies", image: loginSub2, money: 1000000 },
    ];
    return (
        <div>
            <NavBar />
            <div className=" h-auto w-screen bg-black text-white py-10 px-5">
                {/* Selection Food */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 justify-center lg:mx-95">
                    {menuItems.map((item, index) => (
                        <div key={index} className="bg-black opacity-50 hover:opacity-100 rounded-lg overflow-hidden">
                            <img src={item.image} alt={item.title} className="w-full h-60 object-cover" />
                            <div className=" menu-content p-4 text-center flex justify-between items-center gap-5">
                                <div className="flex flex-col justify-between items-start text-left">
                                    <h3 className="text-xl">{item.title}</h3>
                                    <span className=" text -left flex">Sốt: Tiêu Xanh, Mù Tạt Hạt , Nấm Truffle Thượng Hạng, Pho-Mát Kem Kiểu Pháp</span>
                                </div>
                                <h3 className="text-xl">{item.money}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}