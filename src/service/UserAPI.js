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