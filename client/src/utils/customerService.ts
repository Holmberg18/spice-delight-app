import buildAxiosInstance from './axiosInstance'
import { AxiosInstance } from 'axios'


export const login = async (username: string, password: string): Promise<Customer | void> => {
    const credentials: Object = { "username": username, "password": password }
    try{
        const instance: AxiosInstance = await buildAxiosInstance()
        const response: Object = await instance.post('/Customer/Login', credentials)
        return response.data
    }catch(e: any){
        console.error("Error loggin in customer")
    }
};

export const register = async (customerData: CustomerDetails): Promise<Customer | void> => {
    try{
        const instance: AxiosInstance = await buildAxiosInstance()
        const response: Object = await instance.post('/Customer', customerData)
        return response.data
    }catch(e: any){
        console.error("Error creating a new customer")
    }
};
