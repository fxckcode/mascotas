import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:3333',
})

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['token'] = token;
    }
    return config;
})

axiosClient.interceptors.response.use((response) => {
    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/logout';
        return;
    }
    return response
})

export default axiosClient;