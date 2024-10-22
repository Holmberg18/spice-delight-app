import axios from 'axios';
import { AxiosInstance } from 'axios';

const getToken = async (): Promise<Object> => {
    try {
        const response = await axios.get("https://spice-delight-app-token-api.azurewebsites.net/token", {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error: any) {
        console.log(error.message);
        return {}; // Return an empty object in case of error
    }
}


const buildAxiosInstance = async (): Promise<AxiosInstance> => {
    const token = await getToken()
    const axiosInstance = await axios.create({
        baseURL: "https://api-management-spicedelightappapi.azure-api.net",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.access_token || ''}`
        }
    });
    return axiosInstance
}

export default buildAxiosInstance;