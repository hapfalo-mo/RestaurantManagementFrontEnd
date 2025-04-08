import React, { useEffect, useState } from "react";
import Navbar from "../../component/Basic/NavBar";
import Footer from "../../component/Basic/Footer";
import * as OrderAPI from "../../service/OrderAPI"
import Cookies from "js-cookie";
const OrderHistory = () => {
    const [orderList, setOrderList] = useState([]);
    const [orderItemList, setOrderItemList] = useState([]);
    const [currenPage, setCurrentPage] = useState(1);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const getAllOrderList = async () => {
        try {
            let pageRequest = {
                "page": currenPage,
                "pageSize": 10
            }
            var user = Cookies.get("user");
            var userObject = JSON.parse(decodeURIComponent(user));
            const userId = userObject.userID;
            const response = await OrderAPI.getAllOrder(userId, pageRequest);
            setOrderList(response?.Data);
        } catch (error) {
            console.log(error);
        }
    }
    const getAllOrderDetail = async (id) => {
        try {
            const response = await OrderAPI.getAllOrderDetails(id);
            setOrderItemList(response);
        } catch (error) {
            console.log(error);
        }
    }
    const handleOrderList = (orderId) => {
        if (expandedOrderId === orderId) {
            setExpandedOrderId(null);
            setOrderItemList([]);
        } else {
            setExpandedOrderId(orderId);
            getAllOrderDetail(orderId);
        }
    };
    useEffect(() => {
        getAllOrderList();
    }, [currenPage])
    return (
        <div>
            <Navbar />
            <div className="  bg-black min-h-screen p-8 text-white">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold text-white">Your Orders</h3>
                </div>

                <div className="space-y-6">
                    {orderList.length === 0 ? (
                        <p className="text-center text-lg">No orders yet.</p>
                    ) : (
                        orderList.map((order) => (
                            <div
                                key={order?.OrderId}
                                className=" border-1 border-yellow-700 p-6 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0"
                            >
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-yellow-400">#{order?.OrderId || ""}</h3>
                                    <p className="mt-2 text-gray-400">{order?.Feedback}</p>
                                    <span>Ngày tạo:</span><p className="mt-2 text-gray-500">{order?.OrderedAt}</p>
                                    {/* <p className="mt-1 text-sm text-gray-400">Tracking Code: {order.tracking}</p>
                                    <p className="mt-1 text-sm text-gray-400">Address: {order.address}</p> */}
                                    <p className="mt-3 text-lg">
                                        <strong>Total:</strong> ${order?.TotalPrice}
                                    </p>
                                    {expandedOrderId && orderItemList.length > 0 && expandedOrderId === order?.OrderId && (
                                        <div className="mt-8">
                                            <h4 className="text-lg font-bold text-white">Order Items:</h4>
                                            <div className="space-y-4">
                                                {orderItemList.map((item) => (
                                                    <div key={item?.ItemId} className="border-b border-gray-700 py-2">
                                                        <p className="text-yellow-400">{item?.FoodName}</p>  {/* Adjust FoodName */}
                                                        <p className="text-gray-400">Quantity: {item?.Quantity}</p>
                                                        <p className="text-gray-500">Price: ${item?.Price}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <p className="underline text-yellow-600 italic cursor-pointer"
                                            onClick={() => handleOrderList(order?.OrderId)} // Toggle the clicked order
                                        >
                                            {expandedOrderId === order?.OrderId ? "Ẩn" : "Xem thêm"} {/* Toggle text */}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span
                                        className={`px-4 py-2 rounded-full ${order?.OrderStatus === 0 ? "bg-yellow-500" : "bg-red-600"
                                            } text-white text-xs font-semibold uppercase`}
                                    >
                                        {order?.OrderStatus == 0 && "Đang trong quá trình xử lý ...."}
                                    </span>
                                    {/* <div className="mt-4 w-full h-48 rounded-xl overflow-hidden shadow-lg">
                                        <iframe
                                            title={`order-${order.id}-map`}
                                            width="100%"
                                            height="100%"
                                            style={{ border: "0" }}
                                            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${order.location.lat},${order.location.lon}`}
                                            allowFullScreen
                                        ></iframe>
                                    </div> */}
                                </div>
                            </div>
                        ))
                    )}

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrderHistory;

