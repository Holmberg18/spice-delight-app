import axios from "axios";

export const login = async (username: string, password: string): Promise<Customer | void> => {
    const credentials = { "username": username, "password": password };

    return axios.post('/api/login', credentials, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response: any) => response.data)
    .catch((error) => {
        console.log(error);
    });
};
