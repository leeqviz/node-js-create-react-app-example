import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

instance.interceptors.request.use((conf) => {
    conf.headers.Authorization = window.localStorage.getItem('token');
    return conf;
});

export default instance;