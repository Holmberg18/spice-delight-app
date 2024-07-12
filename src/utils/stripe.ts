import axios from "axios"
import { getApiKey } from "@/utils/keyVault"

export const getStripeKey = async (keyName: string): Promise<StripeKey | void> => {
    
    const apiKey: string | undefined = await getApiKey()
    const keys = await axios({
        url: import.meta.env.VITE_SPICE_DELIGHT_API_URL + "Stripe/" + keyName,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": apiKey
        }
    })
    .then((response: any) => response.data)
    .catch((error) => {
        console.log(error)
    })

    return keys
}