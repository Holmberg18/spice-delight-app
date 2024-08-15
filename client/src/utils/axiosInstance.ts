// src/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_ENV === "Development" ? 'http://localhost:7071' : import.meta.env.VITE_AZURE_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export default axiosInstance;
