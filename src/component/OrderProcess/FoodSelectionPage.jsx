import React from "react";
import NavBar from "../Basic/NavBar";
import Footer from "../Basic/Footer";
import { useState } from "react";
import * as FoodAPI from "../../service/FoodAPI";
import { useEffect } from "react";

export default function FoodSelectionPage() {
    const [menu, setMenu] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const getAllFood = async () => {
        try {
            let data = {
                "page": currentPage,
                "pageSize": 5
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
            < NavBar />
            <div className="bg-black min-h-screen text-white p-6">
                {/* <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-4 text-sm">
                        <button className="bg-red-500 px-4 py-1 rounded-full text-white">All</button>
                        <button className="bg-gray-700 px-4 py-1 rounded-full">Drinks</button>
                        <button className="bg-gray-700 px-4 py-1 rounded-full">Pizza</button>
                        <button className="bg-gray-700 px-4 py-1 rounded-full">Salad</button>
                        <button className="bg-gray-700 px-4 py-1 rounded-full">Spicy</button>
                        <button className="bg-gray-700 px-4 py-1 rounded-full">Sweets</button>
                    </div>
                    <button className="bg-red-600 px-4 py-1 rounded-md text-white">View All</button>
                </div> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {menu.map((item) => (
                        <div
                            key={item?.Id}
                            className="relative rounded-lg overflow-hidden shadow-lg"
                        >
                            <img
                                src={item?.ImageURL}
                                alt={item?.FoodName}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 pb-12"> {/* padding-bottom to make space for button */}
                                <div className="flex justify-between items-center mb-2">
                                    {/* <span className="bg-yellow-700 text-black text-xs px-2 py-0.5 rounded-full">
                                        {item.rating || "⭐"}
                                    </span> */}
                                    <span className="text-red-400 font-semibold">{item?.Price}$</span>
                                </div>
                                <h3 className="text-lg font-bold mb-1">{item?.FoodName}</h3>
                                <p className="text-sm text-gray-400">
                                    Category: {item?.Description}
                                </p>
                            </div>

                            {/* Add to cart button */}
                            <button
                                // onClick={() => addToCart(item)}
                                className=" cursor-pointer absolute bottom-2 right-2 bg-yellow-500 text-black text-sm px-3 py-1 rounded hover:bg-yellow-400"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            < Footer />
        </div>
    );
}