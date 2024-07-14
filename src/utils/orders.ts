import axios from "axios"
import { getApiKey } from "@/utils/keyVault"

export const createOrder = async (customerId: string, totalAmount: number): Promise<Order | void> => {

    const apiKey: string | undefined = await getApiKey()
    const orderDetails = { "customerID": customerId, "totalAmount": totalAmount, "status": 0}
    return axios.post(import.meta.env.VITE_SPICE_DELIGHT_API_URL + "Order", orderDetails, {
        headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": apiKey
        }
    })
    .then((response: any) => {
        console.log("order created")
        return response.data
    })
    .catch((error) => {
        console.log(error)
    })
    
}