import axios from 'axios';

export const axiosInstance = axios.create( {
    // baseURL : 'http://localhost:4000'
    baseURL : 'https://crm-app-backend-chi.vercel.app/'
});

