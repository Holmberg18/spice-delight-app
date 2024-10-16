import buildAxiosInstance from './axiosInstance';
import { AxiosInstance } from 'axios';

export const getStripeKey = async (keyName: string): Promise<StripeKey | void> => {
    try{
        const instance: AxiosInstance = await buildAxiosInstance()
        const response: Object = await instance.get(`/stripe/${keyName}`)
        return response.data
    }catch(e: any){
        console.error("Error fetching products")
    }
};
