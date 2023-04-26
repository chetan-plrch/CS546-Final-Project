import axos from 'axios';

export const axiosApi = axos.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
});
