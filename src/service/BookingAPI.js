import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
const API_URL = "http://localhost:1611/api/v1/bookings";
const token = Cookies.get('token');
export const BookingTable = async (data) => {
    return await axios.post(`${API_URL}/bookTable`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

// Paging Booking History 
export const getBookingPagingList = async (data, id) => {
    return await axios.post(`${API_URL}/getBooking/${id}`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

// Get All Paging Booking List (Admin)
export const getAllBookingPaging = async (data) => {
    const response = await axios.post(`${API_URL}/get-all-bookings`, data, {
        headers: {
            "Authorization": `Bearer ${token} `
        }
    })
    return response?.data
}