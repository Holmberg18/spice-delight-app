import axios from "axios";

export const createOrder = async (customerId: string, totalAmount: number, cart: cartItems): Promise<Order | void> => {
    const orderDetails: { 
        customerID: string, 
        totalAmount: number, 
        status: number, 
        items: string } = { 
        "customerID": customerId,
        "totalAmount": totalAmount,
        "status": 0,
        "items": JSON.stringify(cart) 
    }

    return axios.post('/api/order', orderDetails, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response: any) => {
        console.log("order created");
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    });
};
