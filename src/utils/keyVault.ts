import { ClientSecretCredential } from "@azure/identity";
import { KeyClient, KeyVaultKey } from "@azure/keyvault-keys"

export const getApiKey = async ():Promise<string | undefined | KeyVaultKey> => {

    if(import.meta.env.VITE_REACT_ENV === "Development"){
        return import.meta.env.VITE_API_KEY
    }
    
    const credential = new ClientSecretCredential(import.meta.env.VITE_TENANT_ID, import.meta.env.VITE_CLIENT_ID, import.meta.env.VITE_CLIENT_SECRET);        
    const client = new KeyClient(import.meta.env.VITE_VAULT_URL, credential);
    return await client.getKey("spice-delight-app-api-key")
    
}