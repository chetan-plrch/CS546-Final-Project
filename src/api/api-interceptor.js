import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 2000,
    withCredentials: true
});

// axiosApi.interceptors.response.use(function (response) {
//     if (response.status === 301) {
//         const data = response.data
//         if (data.redirect) {
//             window.location = data.redirect
//         }
//     }
//     console.log('--- Interceptor response ---', response)
//     return response;
//   }, function (error) {
//     console.log('--- Interceptor error ---', error)
//     return Promise.reject(error);
// });

export {
    axiosApi
}