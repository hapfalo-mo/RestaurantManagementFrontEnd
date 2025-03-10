import React from "react";
import axios from "axios";
const API_URL = "http://localhost:1611/api/v1/bookings";
export const BookingTable = (data) => {
    return axios.post(`${API_URL}/bookTable`, data);
}