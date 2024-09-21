// src/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:7071",
    headers: {
        "Content-Type": "application/json"
    }
});

export default axiosInstance;
