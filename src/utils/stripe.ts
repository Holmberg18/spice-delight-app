import axios from "axios";

export const getStripeKey = async (keyName: string): Promise<StripeKey | void> => {
    return axios.get(`/api/stripe/${keyName}`)
        .then((response: any) => response.data)
        .catch((error) => {
            console.log(error);
        });
};
