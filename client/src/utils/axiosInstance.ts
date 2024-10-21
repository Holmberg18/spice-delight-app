import axios from 'axios'
import { AxiosInstance } from 'axios'
import Cookies from "js-cookie"

const setCookie = (data: any): void => {
    const tokenString: string = JSON.stringify(data)
    Cookies.set("token", tokenString, { expires: 1 })
}


const getToken = async (): Promise<Object> => {
    try {
        const response = await axios.get("https://spice-delight-app-token-api.azurewebsites.net/token", {
            headers: {
                "Content-Type": "application/json"
            }
        });
        setCookie(response.data)
        return response.data;
    } catch (error: any) {
        console.log(error.message);
        return {}; // Return an empty object in case of error
    }
}


const buildAxiosInstance = async (): Promise<AxiosInstance> => {
    const savedToken: string | undefined = Cookies.get("token")
    const token: Object = savedToken?.length ? JSON.parse(savedToken) : await getToken()
    const axiosInstance = await axios.create({
        baseURL: "https://api-management-spicedelightappapi.azure-api.net",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.access_token || ''}` // Handle undefined access_token
        }
    });
    return axiosInstance
}

export default buildAxiosInstance;
