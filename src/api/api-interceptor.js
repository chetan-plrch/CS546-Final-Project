import axios from 'axios';
import helper from '../helper';

const axiosApi = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 2000,
    withCredentials: true
});

export {
    axiosApi
}