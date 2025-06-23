import React, { useEffect, useState } from "react";
import NavBar from "../Basic/NavBar";
import Footer from "../Basic/Footer"
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/userAuth";
import * as FoodAPI from "../../service/FoodAPI"
import * as OrderAPI from "../../service/OrderAPI"
import { toast } from 'react-toastify'
// import {}
import Cookies from "js-cookie";
export default function PizzaCart() {
    const [orderItem, setOrderItem] = useState([]);
    const [totalMoney, setTotal] = useState(0);
    const [OTPFormStatus, setOTPFormStatus] = useState(false);
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
                "UserId": user.id,
                "TotalPrice": totalMoney
            };

            const resultOrder = await OrderAPI.createNewOrder(OrderRequest);
            console.log(resultOrder?.data);
            if (!resultOrder) {
                console.log("Cannot get resultOrder");
                return;
            }

            const cart = Cookies.get("cart");
            const orderItemList = JSON.parse(cart);
            console.log(orderItemList);
            for (let item of orderItemList) {
                let data2 = {
                    "OrderId": resultOrder?.data.OrderId,
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

    // Open OTP Form and Notification
    const openOTPFormAndNoti = async () => {
        setOTPFormStatus(true);
        toast.info("Mã OTP đã được gửi qua email. Mã OTP chỉ có hiệu lực trong vòng 2 phút!");
    }

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
                                onClick={openOTPFormAndNoti()}
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
                        {/* OTP Confirmation */}
                        {/* {OTPFormStatus == true && (
                            <div className="fixed inset-50 flex flex-col items-center justify-center gap-4 bg-black border-1 border-yellow-900 p-6 rounded-2xl shadow-xl max-h-[90vh] max-w-sm mx-auto h-auto z-50">
                                <h3 className="text-xl text-yellow-900 font-semibold  mb-2">Vui lòng nhập OTP để xác nhận</h3>
                                <input
                                    type="text"
                                    maxLength={6}
                                    className="border border-1 text-white rounded-lg px-4 py-2 text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="6-digit OTP"
                                />
                                <div className="flex justify-between w-60">
                                    <button
                                        className="bg-yellow-900 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
                                    // onClick={() => handleOtpSubmit(otp)}
                                    >
                                        Xác nhận
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
                                    // onClick={() => handleOtpSubmit(otp)}
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        )} */}
                        {OTPFormStatus == true && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <div className="w-[380px] h-[300px] flex flex-col items-center justify-center gap-4 bg-black border border-yellow-900 p-6 rounded-2xl shadow-xl">
                                    <h3 className="text-xl text-white font-semibold mb-2">
                                        Vui lòng nhập mã OTP để xác nhận
                                    </h3>
                                    <input
                                        type="text"
                                        maxLength={6}
                                        className="border text-white rounded-lg px-4 py-2 text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="6-digit OTP"
                                    />
                                    <div className="flex flex-col gap-4 justify-between w-60">
                                        <button className="bg-yellow-700 text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-500 transition cursor-pointer">
                                            Xác nhận
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 transition cursor-pointer"
                                            onClick={() => setOTPFormStatus(false)}
                                        >
                                            Hủy
                                        </button>
                                        <p className=" cursor-pointer text-gray-400 w-full justify-center flex item-center underline">Bạn chưa nhận được mã ?</p>
                                    </div>
                                </div>
                            </div>
                        )}
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
