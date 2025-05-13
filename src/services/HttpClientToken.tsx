
import axios from 'axios';

const instance = axios.create({ baseURL: process.env.REACT_APP_URL_BASE });

const request = {
    get: (url: string, token: string) => instance.get(url, { headers: { 'Authorization': 'Bearer ' + token } } ),
    post: (url: string, body: any, token: string) => instance.post(url, body, { headers: { 'Authorization': 'Bearer ' + token } } ),
    put: (url: string, body: any, token: string) => instance.put(url, body, { headers: { 'Authorization': 'Bearer ' + token } } ),
    delete: (url: string, token: string) => instance.delete(url, { headers: { 'Authorization': 'Bearer ' + token } } )
}

export default request;