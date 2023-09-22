import { request, requestMock } from './request';
import {
  ILoginParams,
  IApiLoginResponse,
} from '../interface/user/login';

/** Login */
export const apiLogin = (data: ILoginParams) => {
  return request<IApiLoginResponse>('post', 'auth', data);
};
export const logoutAsync = () => {
  return async () => {
    console.log('logout');
    localStorage.clear();
  };
};