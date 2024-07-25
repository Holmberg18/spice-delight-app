import axios from "axios"
import { getApiKey } from "@/utils/keyVault"
import { KeyVaultKey } from "@azure/keyvault-keys"

export const createOrder = async (customerId: string, totalAmount: number): Promise<Order | void> => {

    const apiKey: string | undefined | KeyVaultKey = await getApiKey()
    const orderDetails = { "customerID": customerId, "totalAmount": totalAmount, "status": 0}
    return axios.post(import.meta.env.VITE_SPICE_DELIGHT_API_URL + "Order", orderDetails, {
        headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": typeof apiKey === "string" ? apiKey : ""
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