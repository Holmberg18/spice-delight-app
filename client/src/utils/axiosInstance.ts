// src/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:5000',
    headers: {
        "Content-Type": "application/json"
    }
});

export default axiosInstance;