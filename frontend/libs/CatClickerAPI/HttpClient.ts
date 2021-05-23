import axios, { AxiosInstance } from 'axios';

export function HttpClient(): AxiosInstance {
    if (!process.env.CAT_CLICKER_API_URL) {
        throw new Error('No base url for CatClicker API');
    }

    return axios.create({ 
        baseURL: process.env.CAT_CLICKER_API_URL,
    });
}
