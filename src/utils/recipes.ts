import axios from 'axios';
import { Meal } from '@/models/Meal';

const fetchRecipe = (id: string | undefined): Promise<Meal> => {
    return axios.get(`/api/recipe/${id}`)
        .then((response: any) => response.data)
        .catch((error) => {
            console.log(error);
        });
};

const fetchProduct = (id: string): Promise<Product> => {
    return axios.get(`/api/product/${id}`)
        .then((response: any) => response.data)
        .catch((error) => {
            console.log(error);
        });
};

const fetchProducts = (): Promise<Product[]> => {
    return axios.get(`/api/products`)
        .then((response: any) => response.data)
        .catch((error) => {
            console.log(error);
        });
};


export {
    fetchRecipe,
    fetchProduct,
    fetchProducts
};