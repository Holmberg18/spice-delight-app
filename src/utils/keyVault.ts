export const getApiKey = (): string | undefined => {

    if(import.meta.env.VITE_REACT_ENV === "Development"){
        return import.meta.env.VITE_API_KEY
    }

    return import.meta.env.VITE_API_PROD_KEY
    
}