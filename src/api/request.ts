import axios, { AxiosRequestConfig, Method } from 'axios';
import { message as $message } from 'antd';
import { setGlobalState } from '@/stores/global.store';
import store from '@/stores';
import { history } from '@/routes/history';
const axiosInstance = axios.create({
  timeout: 6000,
});

// axiosInstance.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   const _config = {
//     ...config,
//     headers: {
//       ...config.headers,
//       'access-token': token,
//     },
//   };
//   return _config;
// });
axiosInstance.interceptors.response.use(
  config => {
    store.dispatch(
      setGlobalState({
        loading: false,
      })
    );

    if (config?.data?.message) {
      // $message.success(config.data.message);
    }

    return config?.data;
  },
  error => {
    store.dispatch(
      setGlobalState({
        loading: false,
      })
    );
    // if needs to navigate to login page when request exception
    // history.replace('/login');
    let errorMessage = '';
    console.log(error?.message);
    if (error?.message?.includes('Network Error')) {
      errorMessage = error?.message;
    } else {
      errorMessage = error?.message;
    }
    $message.error(errorMessage);
    // error.message && $message.error(error.response?.data?.message);
    // throw new Error(error.response?.data?.message);
    // return {
    //   status: error.status,
    //   message: error.response.data.message,
    //   result: null,
    // };
  }
);

export type Response<T = any> = {
  status: string;
  result: any;
  reason?: string;
  message?: string;
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
  config?: AxiosRequestConfig
): MyResponse<T> | T => {
  const prefix = '/api/v1/';
  url = import.meta.env.VITE_BASE_URL + prefix + url;
  if (method === 'post') {
    return axiosInstance.post(url, data, config);
  }
  if (method === 'delete') {
    return axiosInstance.delete(url, {
      data: data,
      ...config,
    });
  } else {
    return axiosInstance.get(url, {
      params: data,
      ...config,
    });
  }
};
