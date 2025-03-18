import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaCircle, FaDotCircle, FaStar } from "react-icons/fa";
import { FaPlus, FaDownload } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import * as UserAPI from "../../service/UserAPI"
import { data } from "react-router-dom";
export default function AdminRequestPage() {
    const [userList, setUserList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    // Get All User List 
    const getAllUser = async () => {
        try {
            let requestPage = {
                "page": currentPage,
                "pageSize": 10
            }
            const response = await UserAPI.getAllUserPagingList(requestPage);
            setUserList(response?.data.Data)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllUser();
    }, [currentPage]);
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-auto shadow-md p-5 space-y-4 bg-blue-600">
                <h1 className="text-4xl font-bold text-white">SteakHouse Dashboard</h1>
                <nav>
                    <ul className="space-y-2">
                        <li className="text-white font-semibold flex items-center cursor-pointer">
                            <IoIosArrowForward className="mr-2 " /> User
                        </li>
                        <li className="text-white hover:text-gray-900 flex items-center  cursor-pointer">
                            <IoIosArrowForward className="mr-2 " /> Booking
                        </li>
                        <li className="text-white hover:text-gray-900 flex items-center cursor-pointer">
                            <IoIosArrowForward className="mr-2 " /> Menu
                        </li>
                    </ul>
                </nav>
            </aside>
            {/* Main Content */}
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <div className="flex space-x-3">
                        <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded">
                            <FaPlus className="mr-2" /> Add New User
                        </button>
                        <button onClick={UserAPI.exportCSVFile} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                            <FaDownload className="mr-2" /> Export CSV
                        </button>
                    </div>
                </div>
                {/* User Table */}
                <div className="mt-6 bg-white shadow-md rounded p-4">
                    <div className="flex justify-between mb-4">
                        <input type="text" placeholder="Search Product" className="border p-2 w-1/3" />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Apply Filters</button>
                    </div>
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-left">ID</th>
                                <th className="border p-2 text-left">PhoneNumber</th>
                                <th className="border p-2 text-left">Email</th>
                                <th className="border p-2 text-left">FullName</th>
                                <th className="border p-2 text-left">CreatedAt</th>
                                <th className="border p-2 text-left">UpdatedAt</th>
                                <th className="border p-2 text-left">DeletedAt</th>
                                <th className="border p-2 text-left">Role</th>
                                <th className="border p-2 text-left">Point</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(userList) && userList.length > 0 ? (
                                userList.map((item, index) => (
                                    <tr key={index} className="border">
                                        <td className="border p-2">{item?.id || ""}</td>
                                        <td className="border p-2">{item?.phone_number || ""}</td>
                                        <td className="border p-2">{item?.email || ""}</td>
                                        <td className="border p-2">{item?.full_name || ""}</td>
                                        <td className="border p-2">{item?.created_at ? new Date(item.created_at).toLocaleString() : ""}</td>
                                        <td className="border p-2">{item?.updated_at ? new Date(item.updated_at).toLocaleString() : ""}</td>
                                        <td className="border p-2">{item?.deleted_at?.String || ""}</td>
                                        <td className="border p-2">{item?.role || ""}</td>
                                        <td className="border p-2 flex items-center">
                                            <FaDotCircle className="text-yellow-500" /> {item?.point ?? 0}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center p-4">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}