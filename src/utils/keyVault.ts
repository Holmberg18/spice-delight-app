import { KeyVaultSecret, SecretClient } from "@azure/keyvault-secrets"
import { DefaultAzureCredential, EnvironmentCredential } from "@azure/identity"

const getApiKey = async ():Promise<KeyVaultSecret> => {

    //Grab api key from key vault
    const credential: EnvironmentCredential = new DefaultAzureCredential();

    const keyVaultName: string | undefined = process.env.KEY_VAULT_NAME;
    if(!keyVaultName) throw new Error("KEY_VAULT_NAME is empty");
    const url: string = "https://" + keyVaultName + ".vault.azure.net";
  
    const client: SecretClient = new SecretClient(url, credential);
    const apiKeySecret: KeyVaultSecret = await client.getSecret("spice-delight-app-api-key")

    return apiKeySecret
}

export {
    getApiKey
}