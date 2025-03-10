import Reacts from "react";
import Navbar from "./Basic/Navbar";
import Footer from "./Basic/Footer";
import { useState } from "react";
import { Card, CardContent, CardActions, Typography } from "@mui/material";
import { Button, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { Close } from "@mui/icons-material";
export default function ReservationHistory() {
    const orders = [
        {
            id: "#9385839",
            date: "24.06.2024",
            location: "France, Avenue 905-45",
            status: "Delivered",
            image: "https://via.placeholder.com/80",
            items: 2,
        },
        {
            id: "#9385839",
            date: "26.06.2024",
            location: "France, Avenue 905-45",
            status: "Delivered",
            image: "https://via.placeholder.com/80",
            items: 1,
        },
        {
            id: "#9385839",
            date: "27.06.2024",
            location: "France, Avenue 905-45",
            status: "Delivered",
            image: "https://via.placeholder.com/80",
            items: 12,
        },
    ];
    const [expanded, setExpanded] = useState(false);
    return (
        <div>
            <Navbar />
            <div className="bg-black text-white min-h-screen p-10 flex justify-center">
                <div className="max-w-5xl w-full">
                    <h1 className="text-4xl font-bold mb-8 text-center">Your Orders</h1>
                    <div className="space-y-6">
                        {orders.map((order, index) => (
                            <Card key={index} sx={{ backgroundColor: "#222", color: "white", borderRadius: 3, boxShadow: "0px 4px 10px rgba(255,255,255,0.1)" }}>
                                <CardContent className="flex justify-between items-center p-6">
                                    <div className="flex items-center gap-6">
                                        <img
                                            src={order.image}
                                            alt="Order Item"
                                            className="w-24 h-24 rounded-md object-cover"
                                        />
                                        <div>
                                            <Typography variant="h5" className="font-semibold">{order.id}</Typography>
                                            <Typography variant="body2" color="gray">{order.date}</Typography>
                                            <Typography variant="body2" color="gray">{order.location}</Typography>
                                            <span className={`px-3 py-1 rounded text-sm font-semibold ${order.status === "Delivered" ? "bg-green-600" : "bg-yellow-600"}`}>
                                                {order.status}
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
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}