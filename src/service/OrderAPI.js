import axios from 'axios';
import Cookies from 'js-cookie';
const API_URL = 'http://localhost:1611/api/v1/orders';
const token = Cookies.get("token");

export const createNewOrder = async (data) => {
    try {
        let token = Cookies.get("token");

        if (!token) {
            console.log("No token found in cookies. Trying to reload...");
            token = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(Cookies.get("token"));
                }, 2000);
            });

            if (!token) {
                console.log("Token still not found after reload.");
                return;
            }
        }
        // Gọi hàm tạo đơn hàng khi có token
        return await sendCreateOrderRequest(data, token);

    } catch (error) {
        console.log(error);
    }
};
const sendCreateOrderRequest = async (data, token) => {
    try {
        const response = await axios.post(`${API_URL}/create-order`, data, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const createOrderItem = async (data) => {
    try {
        if (!token) {
            console.log("No token found in cookies");
            return;
        }
        const response = await axios.post(`${API_URL}/create-order-items`, data, {
            headers:
                { "Authorization": `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}


// Get Order By UserID
export const getAllOrder = async (id, data) => {
    try {
        if (!token) {
            console.log("No token found in cookies");
            return;
        }
        const response = await axios.post(`${API_URL}/get-all-order/${id}`, data, {
            headers:
                { "Authorization": `Bearer ${token}` }
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

// Get All Order Item Detail 
export const getAllOrderDetails = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/get-order-detail/${id}`, {
            headers:
                { "Authorization": `Bearer ${token}` }
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// Generate and Send OTP    
export const generateOTP = async (email) => {
    var tokenReal = await getToken();
    try {
        const response = await axios.post(`${API_URL}/send-otp/${email}`, {}, {
            headers:
                { "Authorization": `Bearer ${tokenReal}` }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

// Authen API 
export const isValidOTP = async (data) => {
    var tokenReal = await getToken();
    try {
        const response = await axios.post(`${API_URL}/isvalid-otp`, data, {
            headers:
                { "Authorization": `Bearer ${tokenReal}` }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

// Get token 

const getToken = async () => {
    return Cookies.get("token");
}