import React from "react";
import NavBar from "../Basic/NavBar";
import Footer from "../Basic/Footer"

export default function FoodSelectionPage() {
    const foodItems = [
        {
            id: 1,
            title: "Double Patty Veg Burger",
            price: "$40.00",
            rating: 4.8,
            image: "https://via.placeholder.com/300x200",
            category: "Burger"
        },
        {
            id: 2,
            title: "Chicken Burger",
            price: "$17.56",
            rating: 4.8,
            image: "https://via.placeholder.com/300x200",
            category: "Burger"
        },
        {
            id: 3,
            title: "Pineapple Pizza",
            price: "$24.50",
            rating: 4.6,
            image: "https://via.placeholder.com/300x200",
            category: "Pizza"
        },
        {
            id: 4,
            title: "Pineapple Soup",
            price: "$11.02",
            rating: 4.5,
            image: "https://via.placeholder.com/300x200",
            category: "Soup"
        },
        {
            id: 5,
            title: "Momos",
            price: "$50.00",
            rating: 4.8,
            image: "https://via.placeholder.com/300x200",
            category: "Spicy"
        },
        {
            id: 6,
            title: "Pancake",
            price: "$12.20",
            rating: 4.7,
            image: "https://via.placeholder.com/300x200",
            category: "Sweets"
        },
        {
            id: 7,
            title: "Honey Bread",
            price: "$15.00",
            rating: 4.6,
            image: "https://via.placeholder.com/300x200",
            category: "Bread"
        },
        {
            id: 8,
            title: "Aloo Tikki Burger",
            price: "$50.00",
            rating: 4.8,
            image: "https://via.placeholder.com/300x200",
            category: "Burger"
        },
        {
            id: 9,
            title: "Green Salad",
            price: "$45.00",
            rating: 4.9,
            image: "https://via.placeholder.com/300x200",
            category: "Salad"
        }
    ];

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
                    {foodItems.map(item => (
                        <div key={item.id} className=" rounded-lg overflow-hidden shadow-lg">
                            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-full">{item.rating}</span>
                                    <span className="text-red-400 font-semibold">{item.price}</span>
                                </div>
                                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                                <p className="text-sm text-gray-400">Category: {item.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            < Footer />
        </div>
    );
}