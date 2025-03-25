import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
const API_URL = "http://localhost:1611/api/v1/foods";

export const getAllFoodPagingList = async (data) => {
    const response = await axios.post(`${API_URL}/get-all-foods`, data)
    return response
}