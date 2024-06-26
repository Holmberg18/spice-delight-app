import axios from "axios"
import { getApiKey } from "@/utils/keyVault"

export const login = async (username:string, password:string): Promise<Customer | void> => {
    
    const apiKey: string | undefined = await getApiKey()
    const credentials = { "username": username, "password": password }
    return axios.post(import.meta.env.VITE_SPICE_DELIGHT_API_URL + "Customer/Login", credentials, {
        headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": apiKey
        }
    })
    .then((response: any) => response.data)
    .catch((error) => {
        console.log(error)
    })
    
}