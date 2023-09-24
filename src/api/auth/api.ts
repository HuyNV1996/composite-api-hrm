import { request } from '../request';
import { AUTH } from '../constApi';
import { ILoginRes, IRegisterParams, LoginParams } from '@/interface/auth/login';

/** Login */
export const apiLogin = (params: LoginParams) =>
{
  let data = new FormData();
  data.append('username', params.username);
  data.append('password', params.password);
  return request<ILoginRes>('post', AUTH.LOGIN,data);
}

export const apiRegister = (paramms: IRegisterParams) => {
  const url = `/user/signup?username=${paramms.username}&password=${paramms.password}&email=${paramms.email}`
  return request<any>('post', url);
}