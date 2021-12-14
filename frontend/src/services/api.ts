import axios from 'axios';

const BASE_URL: string = process.env.REACT_APP_BACKEND_URL || '';

const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(configuration => {
    const token = localStorage.getItem('@Inter:Token') || '';
    configuration.headers = {
        'Authorization': `Bearer ${token}`,
    };
    return configuration;
});

//if ()

export default api;