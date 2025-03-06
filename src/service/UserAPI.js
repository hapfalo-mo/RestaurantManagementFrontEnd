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