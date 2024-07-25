import axios from 'axios'
import { Meal } from '@/models/Meal'
import { getApiKey } from "@/utils/keyVault"
import { KeyVaultKey } from '@azure/keyvault-keys'

const fetchRecipe = (id: string | undefined): Promise<Meal> => {

    const recipe: Promise<Meal> = axios({
        url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response: any) => response.data)
    .then((data: any) => data.meals[0])
    .catch((error) => {
        console.log(error)
    })

    return recipe
}

const fetchProduct = async(id: string): Promise<Product> => {

    const apiKey: string | undefined | KeyVaultKey = await getApiKey()
    const products = axios({
        url: import.meta.env.VITE_SPICE_DELIGHT_API_URL + "Product/"+ id, 
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

    return products
    
}

const fetchProducts = async(): Promise<Product[]> => {

    const apiKey: string | undefined | KeyVaultKey = await getApiKey()
    const products = axios({
        url: import.meta.env.VITE_SPICE_DELIGHT_API_URL + "Product", 
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

    return products
    
}

const fetchRecipes = (type: string) => {

    const recipes: Promise<void | Meal[]> = axios({
        url: `https://www.themealdb.com/api/json/v1/1/filter.php?a=${type}`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response: any) => response.data)
    .then((data: any) => {
        let meals: any = data.meals
        if(Array.isArray(meals)){
            meals = meals.map((meal : Meal) => ({
                idMeal: meal.idMeal,
                name: meal.strMeal,
                price: (Math.random() * (50 - 10) + 10).toFixed(2),
                strMeal: meal.strMeal,
                strMealThumb: meal.strMealThumb,
                ratings: (Math.random() * (5 - 1) + 1).toFixed(),
                inStock: Math.random() <= 0.8,
                fastDelivery: Math.random() >= 0.5
            }))
        }
        return meals
    })
    .catch((error) => {
        console.log(error)
    })

    return recipes
}

const getBannerPhotos = ():any => {

    const bannerPhotos = axios({
        url: "https://api.unsplash.com/collections/dVF4uttpg3Y/photos?client_id=Svufk8F8y9unuqsZ6nrws9CSLsc_RvHXjQlo79XAEQ0&per_page=16",
        method: "GET",
        headers: {
            "Content-type": "application/json",
        }
    })
    .then((response) => response.data)
    .then((data:any) => data)
    .catch((error) => {
        console.log(error)
    })

        return bannerPhotos
}

export { 
    fetchRecipe,
    fetchRecipes,
    getBannerPhotos,
    fetchProduct,
    fetchProducts
}