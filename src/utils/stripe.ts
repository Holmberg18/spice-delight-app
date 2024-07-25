import axios from "axios"
import { getApiKey } from "@/utils/keyVault"
import { KeyVaultKey } from "@azure/keyvault-keys"

export const getStripeKey = async (keyName: string): Promise<StripeKey | void> => {
    
    const apiKey: string | undefined | KeyVaultKey = await getApiKey()
    const keys = await axios({
        url: import.meta.env.VITE_SPICE_DELIGHT_API_URL + "Stripe/" + keyName,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": typeof apiKey === "string" ? apiKey : ""
        }
    })
    .then((response: any) => response.data)
    .catch((error) => {
        console.log(error)
    })

    return keys
}