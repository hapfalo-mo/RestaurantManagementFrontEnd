import Reacts, { useEffect } from "react";
import Navbar from "./Basic/Navbar";
import Footer from "./Basic/Footer";
import { useState } from "react";
import { Card, CardContent, CardActions, Typography, Pagination } from "@mui/material";
import { Button, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { Close } from "@mui/icons-material";
import * as BookingAPI from "../service/BookingAPI"
import Cookies from "js-cookie";
export default function ReservationHistory() {
    const [expanded, setExpanded] = useState(false);
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const user = JSON.parse(Cookies.get('user') || '{}');
    const [totalPages, setTotalPages] = useState(1);
    // Get All Orders from User
    const BookingPagingListByUserID = async () => {
        try {
            let data = {
                "page": currentPage,
                "pageSize": 5
            }
            const userId = user?.UserID
            const response = await BookingAPI.getBookingPagingList(data, userId)
            if (!userId) return;
            if (response?.data.Data) {
                setOrders(response?.data.Data);
                const totalRecords = response?.data.Data.length + 1
                setTotalPages(Math.ceil(totalRecords / data.pageSize));
            }

        } catch (error) {
            console.log(error)
        }
    }
    orders.forEach(order => console.log(typeof order.Status, order.Status));

    useEffect(() => {
        BookingPagingListByUserID();
    }, [currentPage])
    return (
        <div>
            <Navbar />
            <div className="bg-black text-white min-h-screen p-10 flex justify-center">
                <div className="max-w-5xl w-full">
                    <h1 className="text-4xl font-bold mb-8 text-center">Your Orders</h1>
                    <div className="space-y-6">
                        {orders?.length == 0 ? (
                            <p>Chưa có order</p>
                        ) : (
                            orders?.map((order, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        backgroundColor: "#222",
                                        color: "white",
                                        borderRadius: 3,
                                        boxShadow: "0px 4px 10px rgba(255,255,255,0.1)"
                                    }}
                                >
                                    <CardContent className="flex justify-between items-center p-6">
                                        <div className="flex items-center gap-6">
                                            <img
                                                src={order?.image || "/default-image.jpg"} // Use default image if null
                                                alt="Order Item"
                                                className="w-24 h-24 rounded-md object-cover"
                                            />
                                            <div>
                                                <Typography variant="h5" className="font-semibold">{order?.id}</Typography>
                                                <Typography variant="body2" color="gray">{order?.UserName}</Typography>
                                                <Typography variant="body2" color="gray">{order?.UserPhone}</Typography>
                                                <Typography variant="body2" color="gray">{order?.CustomerName}</Typography>
                                                <Typography variant="body2" color="gray">{order?.CustomerPhone}</Typography>
                                                <Typography variant="body2" color="gray">{order?.GuestCount}</Typography>
                                                <Typography variant="body2" color="gray">{order?.BookingDate}</Typography>
                                                <Typography variant="body2" color="gray">{order?.Description}</Typography>
                                                <Typography variant="body2" color="gray">{order?.Status}</Typography>
                                                <Typography variant="body2" color="gray">{order?.CreatedAt}</Typography>
                                                <span className={`px-3 py-1 rounded text-sm font-semibold 
                                                    ${order?.Status === "0" ? "bg-yellow-600" :
                                                        order?.Status === "1" ? "bg-green-600" :
                                                            "bg-red-600"}`}>
                                                    {order?.Status === "0" ? "In Waiting" :
                                                        order?.Status === "1" ? "Confirmed" :
                                                            "Cancelled"}
                                                </span>
                                            </div>
                                        </div>
                                        <CardActions>
                                            <IconButton onClick={() => setExpanded(expanded === index ? null : index)} color="inherit">
                                                {expanded === index ? <ExpandLess /> : <ExpandMore />}
                                            </IconButton>
                                            <IconButton color="inherit">
                                                <Close />
                                            </IconButton>
                                        </CardActions>
                                    </CardContent>
                                    {expanded === index && (
                                        <div className="p-4 bg-gray-800 text-gray-300 rounded-b-lg">
                                            <p className="text-sm">Order Details for {order.id}...</p>
                                        </div>
                                    )}
                                </Card>
                            ))
                        )}

                    </div>
                </div>
            </div>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                variant="outlined"
                color="primary"
                className="mt-6 flex justify-center"
            />
            <Footer />
        </div>
    )
}