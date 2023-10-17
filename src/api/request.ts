import axios, { AxiosRequestConfig, Method } from 'axios';
import { message as $message, message } from 'antd';
import { setGlobalState } from '@/stores/global.store';
import store from '@/stores';
import jwtDecode from 'jwt-decode';
import { IDecoded } from '@/interface/users/types';
import { history } from '@/routes/history';

const axiosInstance = axios.create({
  timeout: 6000,
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    let token = localStorage.getItem('token');
    if (token && (config as any)?.requestOptions?.withToken !== false) {
      const decoded: IDecoded = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        (config as any).headers.Authorization = `${token}`;
      }
    }
    store.dispatch(
      setGlobalState({
        loading: true,
      })
    );

    return config;
  },
  error => {
    store.dispatch(
      setGlobalState({
        loading: false,
      })
    );
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  config => {
    store.dispatch(
      setGlobalState({
        loading: false,
      })
    );

    // if (config?.data?.message) {
    //   $message.success(config.data.message)
    // }

    return config?.data;
  },
  error => {
    store.dispatch(
      setGlobalState({
        loading: false,
      })
    );
    if (error?.response?.status === 401) {
      history.replace('/login');
      localStorage.clear()
      $message.error('Unauthor. User logout!');
    }
    // if needs to navigate to login page when request exception
    // history.replace('/login');
    let errorMessage = '';

    if (error?.message?.includes('Network Error')) {
      errorMessage = error?.message;
    } else {
      errorMessage = error?.message;
    }
    error.message && $message.error(error.response?.data?.message);
    message.error(error.response?.data?.error)
    // return {
    //   status: error.status,
    //   message: error.response.data.message,
    //   result: null,
    // };
  }
);

export type Response<T = any> = {
  totalCount: number;
  items: [];
};

export type MyResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const requestMock = <T = any>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): MyResponse<T> => {
  // const prefix = '/api';
  const prefix = '';

  url = prefix + url;
  if (method === 'post') {
    return axiosInstance.post(url, data, config);
  } else {
    return axiosInstance.get(url, {
      params: data,
      ...config,
    });
  }
};
export const request = <T = any>(
  method: Lowercase<Method>,
  url: string,
  data?: any,
  domain?: boolean,
  config?: AxiosRequestConfig
): MyResponse<T> | T => {
  const prefix = '/api/v1';
  if(domain){
    url = 'http://103.199.16.127:8888' + url;
  }
  else{
    url = import.meta.env.VITE_BASE_URL + prefix + url;
  }
  if (method === 'post') {
    return axiosInstance.post(url, data, config);
  }
  if (method === 'put') {
    return axiosInstance.put(url, data, config);
  }
    if (method === 'delete') {
      return axiosInstance.delete(url);
  } else {
    return axiosInstance.get(url, {
      params: data,
      ...config,
    });
  }
};