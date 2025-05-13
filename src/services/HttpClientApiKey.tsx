
import axios from 'axios';

const instance = axios.create({ 
    baseURL: process.env.REACT_APP_URL_BASE,
    headers: { "X-Api-Key" : process.env.REACT_APP_API_KEY }
});

const request = {
    get: (url: string) => instance.get(url),
    post: (url: string, body: any) => instance.post(url, body),
    put: (url: string, body: any) => instance.put(url, body),
    delete: (url: string) => instance.delete(url)
}

export default request;