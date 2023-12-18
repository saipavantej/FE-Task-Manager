import axios from 'axios';
import {getItem} from '@utils/asyncStorage';

const interceptorsFunc = async (config: any) => {
  const token = await getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const errorHandler = (error: any) => {
  Promise.reject(error);
};

const appService = axios.create({
  baseURL: 'https://onemtucia.onrender.com/api/',
  timeout: 50000,
});

appService.interceptors.request.use(interceptorsFunc, errorHandler);

export {appService};
