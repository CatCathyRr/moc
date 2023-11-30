import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { showToast } from 'vant';

const service: AxiosInstance = axios.create({
  baseURL: '', // url = base api url + request url
  withCredentials: false,
  timeout: 10000,
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['Cache-Control'] = 'no-cache';
    // const myToken = 'NjU0MDA2NTIB';
    // config.headers['Authorization'] = `Bearer ${myToken}`;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);



service.interceptors.response.use(

  (response: AxiosResponse) => {
    const res = response.data;


    if (res.bizCode < 0) {
      // showToast(res.errorMsg);
      // return Promise.reject(res || 'Error');
      return res;
    } else {
      return res;
    }
  },
  (error: AxiosError) => {
    console.log('err' + error);
    showToast(error.message);
    return Promise.reject(error.message);
  },
);

// const BACK_END="https://3fgbsjjlca.execute-api.cn-northwest-1.amazonaws.com.cn/api"

export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    // url = url.replace('/api',BACK_END)
    return service.get(url, config);
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    // url = url.replace('/api',BACK_END);
    return service.post(url, data, config);
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    // url = url.replace('/api',BACK_END)
    return service.put(url, data, config);
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    // url = url.replace('/api',BACK_END)
    return service.delete(url, config);
  },
};

export default service;
