import axios from 'axios';
import store from './redux/store/store';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
