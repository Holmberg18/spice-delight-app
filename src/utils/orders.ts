import axios from "axios";

export const createOrder = async (customerId: string, totalAmount: number): Promise<Order | void> => {
    const orderDetails = { "customerID": customerId, "totalAmount": totalAmount, "status": 0 };

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
