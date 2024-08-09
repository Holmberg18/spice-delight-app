import axios from 'axios';
import { Meal } from '@/models/Meal';

//TODO: Creat env variable to check if development or production, change the other utility functions to use the axiosInstance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
});

const fetchRecipe = (id: string | undefined): Promise<Meal> => {
    return axiosInstance.get(`/api/recipe/${id}`)
        .then((response: any) => response.data)
        .catch((error) => {
            console.error('Error fetching recipe:', error);
        });
};

const fetchProduct = (id: string): Promise<Product> => {
    return axiosInstance.get(`/api/product/${id}`)
        .then((response: any) => response.data)
        .catch((error) => {
            console.error('Error fetching product:', error);
        });
};

const fetchProducts = (): Promise<Product[]> => {
    return axiosInstance.get(`/api/products`)
        .then((response: any) => response.data)
        .catch((error) => {
            console.error('Error fetching products:', error);
        });
};

export {
    fetchRecipe,
    fetchProduct,
    fetchProducts
};