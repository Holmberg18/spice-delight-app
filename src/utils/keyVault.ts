import { KeyVaultSecret, SecretClient } from "@azure/keyvault-secrets";
import { DefaultAzureCredential } from "@azure/identity";

export const getApiKey = async ():Promise<string | undefined> => {

    if(import.meta.env.VITE_REACT_ENV === "Development"){
        return import.meta.env.VITE_API_KEY
    }
    
    const keyVaultName: string | undefined = import.meta.env.VITE_KEY_VAULT_NAME;
    if(!keyVaultName) throw new Error("KEY_VAULT_NAME is empty");
    const url: string = "https://" + keyVaultName + ".vault.azure.net";
    const secretClient: SecretClient = new SecretClient(url, new DefaultAzureCredential())
    //Grab api key from key vault
    try {
        const secret: KeyVaultSecret = await secretClient.getSecret("spice-delight-app-api-key");
        return secret.value;
    } catch (error: any) {
        console.error("Error fetching Key Vault secret:", error.message);
        throw error;
    }
    
}