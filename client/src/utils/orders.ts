import { AxiosInstance } from 'axios';
import buildAxiosInstance from './axiosInstance';

export const createOrder = async (customerId: string, totalAmount: number, cart: cartItems): Promise<Order | void> => {
    const orderDetails = { 
        customerID: customerId,
        totalAmount: totalAmount,
        status: 0,
        items: JSON.stringify(cart) 
    }
    try{
        const instance: AxiosInstance = await buildAxiosInstance()
        const response: Object = await instance.post('/Order', orderDetails)
        return response.data
    }catch(e: any){
        console.error("Error fetching products")
    }
};
