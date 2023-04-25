import axos from 'axios';

export const axiosApi = axos.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    // TODO - check if this header is required
    headers: {"Content-Type": "application/json"}
});
