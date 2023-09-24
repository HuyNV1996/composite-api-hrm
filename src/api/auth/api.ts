import { request } from '../request';
import { AUTH } from '../constApi';
import { ILoginRes, LoginParams } from '@/interface/auth/login';
import { AxiosRequestConfig } from 'axios';

/** Login */
export const apiLogin = (params: LoginParams) =>
{
  let data = new FormData();
  data.append('username', params.username);
  data.append('password', params.password);
  return request<ILoginRes>('post', AUTH.LOGIN,data);
}
