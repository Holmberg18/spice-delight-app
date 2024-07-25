export const getApiKey = async ():Promise<string | undefined> => {

    if(import.meta.env.VITE_REACT_ENV === "Development"){
        return import.meta.env.VITE_API_KEY
    }

    return process.env.VITE_API_PROD_KEY
    
}