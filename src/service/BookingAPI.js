import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
const API_URL = "http://localhost:1611/api/v1/bookings";
const token = Cookies.get('token');
export const BookingTable = (data) => {
    return axios.post(`${API_URL}/bookTable`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}