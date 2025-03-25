import React, { useEffect } from "react";
import NavBar from "./Basic/NavBar";
import loginSub1 from "../assets/loginSub1.jpg";
import loginSub2 from "../assets/loginSub2.jpg";
import Footer from "./Basic/Footer";
import image3 from "../assets/information3.png";
import { useState } from "react";
import * as FoodAPI from "../service/FoodAPI"
export default function Menu() {
    const [menu, setMenu] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const getAllFood = async () => {
        try {
            let data = {
                "page": currentPage,
                "pageSize": 10
            }
            const response = await FoodAPI.getAllFoodPagingList(data);
            console.log(response)
            if (response?.status === 200) {
                setMenu(response?.data);
                const totalRecords = response?.data.Data.length + 1
                setTotalPage(Math.ceil(totalRecords / data.pageSize));
            }
        } catch (error) {
            console.log(error)
        }
    }
    // Use Effect 
    useEffect(() => {
        getAllFood()
    }, [currentPage])
    return (
        <div>
            <NavBar />
            <div className=" h-auto w-screen bg-black text-white py-10 px-5">
                {/* Selection Food */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 justify-center lg:mx-95">
                    {menu.map((item, index) => (
                        <div key={index} className="bg-black opacity-50 hover:opacity-100 rounded-lg overflow-hidden">
                            <img src={item?.ImageURL} alt={item?.FoodName} className="w-full h-60 object-cover" />
                            <div className=" menu-content p-4 text-center flex justify-between items-center gap-5">
                                <div className="flex flex-col justify-between items-start text-left">
                                    <h3 className="text-xl">{item?.FoodName}</h3>
                                    <span className=" text-left flex">{item?.Description}</span>
                                </div>
                                <h3 className="text-xl">{item?.Price}</h3>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <Footer />
        </div>
    )
}