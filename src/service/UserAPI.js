import { Cookie } from '@mui/icons-material';
import axios from 'axios';
import Cookies from 'js-cookie';
const API_URL = 'http://localhost:1611/api/v1/users';
const token = Cookies.get('token');
// Login function 
export const login = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data, {
            withCredentials: true
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

// Signup function 
export const signup = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, data);
        return response;
    } catch (error) {
        return error.response;
    }
}

// Update User function 
export const updateUser = async (data) => {
    try {
        const response = await axios.put(`${API_URL}/updateUser`, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        return error.response;
    }
}

// Get All User 
export const getAllUserPagingList = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/getAllUser`, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response
    } catch (error) {
        console.log(error.response)
    }
}

// Export File CSV User List 
export const exportCSVFile = async () => {
    try {
        const response = await axios.get(`${API_URL}/export-csvFile`, {
            responseType: "blob"
        });
        const blob = new Blob([response.data], { type: "text/csv" });

        // Create a blob from the response data 
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "users.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.log(error.response)
    }
}

// Block or UnBlock User 
export const blockOrUnblockUser = async (userId) => {
    try {
        const response = await axios.put(`${API_URL}/block-unblock-user/${userId}`, {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        console.log(error)
    }
}