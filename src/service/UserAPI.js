import axios from 'axios';

const API_URL = 'http://localhost:1611/api/v1/users';


// Login function 
export const login = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data);
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
        const response = await axios.put(`${API_URL}/updateUser`, data);
        return response;
    } catch (error) {
        return error.response;
    }
}