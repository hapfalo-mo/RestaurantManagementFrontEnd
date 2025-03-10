import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaPlus, FaDownload } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
export default function AdminRequestPage() {
    const products = [
        { name: "Phone 25.8", stock: "12,000", price: "$1200", category: "Electronics", status: "In Stock", tags: "Best Seller", rate: 4.5 },
        { name: "Smart Watch", stock: "37,128", price: "$250", category: "Electronics", status: "Low Inventory", tags: "Trending", rate: 4.3 },
        { name: "Potato Chips", stock: "0", price: "$2", category: "Food & Drinks", status: "Out of Stock", tags: "Popular", rate: 4.7 },
        { name: "Gaming Laptop", stock: "5,000", price: "$1500", category: "Electronics", status: "In Stock", tags: "High Performance", rate: 4.8 },
        { name: "Wireless Earbuds", stock: "8,500", price: "$99", category: "Electronics", status: "In Stock", tags: "Noise Cancelling", rate: 4.6 },
    ];
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-5 space-y-4">
                <h2 className="text-xl font-bold text-blue-600">ShopPoint</h2>
                <nav>
                    <ul className="space-y-2">
                        <li className="text-gray-700 font-semibold flex items-center">
                            <IoIosArrowForward className="mr-2" /> Products
                        </li>
                        <li className="text-gray-500 hover:text-gray-900 flex items-center">
                            <IoIosArrowForward className="mr-2" /> Orders
                        </li>
                        <li className="text-gray-500 hover:text-gray-900 flex items-center">
                            <IoIosArrowForward className="mr-2" /> Customers
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Products Management</h1>
                    <div className="flex space-x-3">
                        <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded">
                            <FaPlus className="mr-2" /> Add New Product
                        </button>
                        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded">
                            <FaDownload className="mr-2" /> Export CSV
                        </button>
                    </div>
                </div>

                {/* Product Table */}
                <div className="mt-6 bg-white shadow-md rounded p-4">
                    <div className="flex justify-between mb-4">
                        <input type="text" placeholder="Search Product" className="border p-2 w-1/3" />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Apply Filters</button>
                    </div>
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-left">Product Name</th>
                                <th className="border p-2 text-left">Stock</th>
                                <th className="border p-2 text-left">Price</th>
                                <th className="border p-2 text-left">Category</th>
                                <th className="border p-2 text-left">Status</th>
                                <th className="border p-2 text-left">Tags</th>
                                <th className="border p-2 text-left">Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index} className="border">
                                    <td className="border p-2">{product.name}</td>
                                    <td className="border p-2">{product.stock}</td>
                                    <td className="border p-2">{product.price}</td>
                                    <td className="border p-2">{product.category}</td>
                                    <td className="border p-2">{product.status}</td>
                                    <td className="border p-2">{product.tags}</td>
                                    <td className="border p-2 flex items-center">
                                        <FiStar className="text-yellow-500" /> {product.rate}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}