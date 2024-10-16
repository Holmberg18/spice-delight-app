import axios, { AxiosInstance } from 'axios';
import buildAxiosInstance from './axiosInstance';
import { Meal } from '@/models/Meal';

const fetchRecipe = async(id: string | undefined): Promise<Meal | {}> => {
    try{
        const response: Object = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return response.data.meals[0]
    }catch(e: any){
        console.error("Error fetching recipe")
        return {}
    }
};

const fetchProduct = async(id: string): Promise<Product | {}> => {
    try{
        const instance: AxiosInstance = await buildAxiosInstance()
        const response: Object = await instance.get(`/Product/${id}`)
        return response.data
    }catch(e: any){
        console.error("Error fetching products")
        return {}
    }
};

const fetchProducts = async(): Promise<Product[] | []> => {
    try{
        const instance: AxiosInstance = await buildAxiosInstance()
        const response: Object = await instance.get('/Product')
        return response.data
    }catch(e: any){
        console.error("Error fetching products")
        return []
    }
}

export {
    fetchRecipe,
    fetchProduct,
    fetchProducts
};