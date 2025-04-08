import React, { useEffect, useState } from "react";
import NavBar from "../Basic/NavBar";
import Footer from "../Basic/Footer"
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/userAuth";
import * as FoodAPI from "../../service/FoodAPI"
import * as OrderAPI from "../../service/OrderAPI"
// import {}
import Cookies from "js-cookie";
export default function PizzaCart() {
    const [orderItem, setOrderItem] = useState([]);
    const [totalMoney, setTotal] = useState(0);
    const { addToCart, removeFromCart, subtractFromCart, carts, setCarts } = useCart();
    const { user } = useAuth();
    const getAllFood = async () => {
        let request = {
            "page": 1,
            "pageSize": 50
        }
        try {
            const response = await FoodAPI.getAllFoodPagingList(request);
            const list = response?.data;
            if (response) {
                const random = ([...list].sort(() => Math.random() - 0.5).slice(0, 3));
                setOrderItem(random);
            } else {
                console.log(response?.Error);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const paymentfunction = async () => {
        try {
            let OrderRequest = {
                "UserId": user.userID,
                "TotalPrice": totalMoney
            };

            const resultOrder = await OrderAPI.createNewOrder(OrderRequest);
            if (!resultOrder) {
                console.log("Cannot get resultOrder");
                return;
            }

            const cart = Cookies.get("cart");
            const orderItemList = JSON.parse(cart);

            for (let item of orderItemList) {
                let data2 = {
                    "OrderId": resultOrder?.Data.OrderId,
                    "FoodId": item?.Id,
                    "Quantity": item?.quantity,
                    "Price": item?.Price * item?.quantity
                };
                const response = await OrderAPI.createOrderItem(data2);
                console.log("Order item response:", response);
            }

            setCarts([]);
            Cookies.remove("cart");

            setTimeout(() => {
                alert("Đơn hàng đã được tạo thành công!");
            }, 500);

        } catch (error) {
            console.log("Error:", error);
        }
    };


    useEffect(() => {
        getAllFood();
    }, [])
    useEffect(() => {
        const t = carts.reduce((sum, item) => {
            return sum + Number(item?.Price) * Number(item?.quantity).toFixed(2);
        }, 0);
        setTotal(t);
    }, [carts]);
    //---------------------------
    return (
        <div>
            <NavBar />
            {carts && carts.length > 0 ? (
                <div className="dark bg-black text-white min-h-screen p-4">
                    <div className="max-w-4xl mx-auto bg-black border border-1 border-gray-600 rounded-xl shadow-lg p-6">
                        <h1 className="text-xl font-bold mb-4">Giỏ Hàng Của Bạn</h1>
                        {carts.map((item, index) => (
                            <div
                                key={index}
                                className="flex gap-4 items-center border-b border-gray-600 pb-4"
                            >
                                <img
                                    src={item?.ImageURL}
                                    alt={item?.FoodName}
                                    className="w-32 h-32 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{item?.FoodName}</h3>
                                    <p className="text-sm text-gray-400">{item?.Description}</p>
                                    <div
                                        onClick={() => removeFromCart(item)}
                                        className="text-sm text-red-400 cursor-pointer inline-block"
                                    >
                                        Xóa
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="w-8 h-8 bg-gray-700 rounded text-lg cursor-pointer"
                                        onClick={() => subtractFromCart(item)}
                                    >
                                        -
                                    </button>
                                    <span>{item?.quantity}</span>
                                    <button
                                        className="w-8 h-8 bg-gray-700 rounded text-lg cursor-pointer"
                                        onClick={() => addToCart(item)}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="font-bold w-24 text-right">
                                    {(item?.quantity * item?.Price).toLocaleString()}$
                                </div>
                            </div>
                        ))}
                        {/* Note Site */}
                        <div className="mt-6">
                            <h3 className="font-semibold mb-2">Yêu cầu thêm</h3>
                            <div className="flex gap-2">
                                <textarea
                                    placeholder="Ghi chú.."
                                    className="h-45 flex-1 p-2 rounded bg-black border-1 border-gray-200 text-white placeholder-gray-400"
                                />
                            </div>
                        </div>
                        {/* Promo Code */}
                        <div className="mt-6">
                            <h3 className="font-semibold mb-2">Nhập Mã Khuyến Mãi</h3>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Nhập mã..."
                                    className="flex-1 p-2 rounded bg-black border-1 border-gray-200 text-white placeholder-gray-400"
                                />
                                <button className="cursor-pointer bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700">Áp Dụng</button>
                            </div>
                        </div>
                        {/* Summary */}
                        <div className="mt-6 text-sm text-gray-300">
                            <div className="flex justify-between py-1">
                                <span>Tổng</span>
                                <span>{totalMoney.toLocaleString()}$</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span>Giảm K.Mãi</span>
                                <span>0$</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span>Giảm Vouchers</span>
                                <span>0$</span>
                            </div>
                            <div className="flex justify-between py-1 mb-2">
                                <span>Phí Giao Hàng</span>
                                <span>0$</span>
                            </div>
                            <div className="bg-yellow-700 hover:bg-yellow-900 cursor-pointer text-white rounded-lg px-4 py-3 text-center font-semibold"
                                onClick={paymentfunction}
                            >
                                Thanh Toán {totalMoney.toLocaleString()}$
                            </div>
                        </div>

                        {/* Suggested Items */}
                        <div className="mt-10">
                            <h3 className="text-xl font-semibold mb-4">Có Thể Bạn Sẽ Thích</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {orderItem?.map((item, idx) => (
                                    <div key={idx} className="bg-black rounded-lg p-4 text-center">
                                        <img src={item.ImageURL} alt={item?.FoodName} className="w-full h-48 object-cover rounded-md mb-2" />
                                        <div className="font-medium">{item?.FoodName}</div>
                                        <div className="text-sm text-gray-400 mb-2">{item.Price.toLocaleString()}$</div>
                                        <button className="cursor-pointer bg-black border-1 border-yellow-700 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-700 hover:text-white text-sm">
                                            Thêm Vào Giỏ Hàng
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="dark bg-black text-white min-h-screen p-10 text-center text-gray-400 text-lg">
                    Giỏ hàng của bạn đang trống.
                </div>
            )}
            <Footer />
        </div>
    );
}
