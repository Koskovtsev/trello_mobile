import axios, { AxiosResponse } from 'axios';
import api from '../common/constants/api';

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 123', // до цього ми ще повернемося якось потім
  },
});

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
