import { request } from './request';
import { PageData } from '@/interface';
import { BuniesssUser } from '@/interface/business';

export const getBusinessUserList = (params: any) => {
  return request<PageData<BuniesssUser>>('get', '/business/list', params);
};

export const createTestApi = (params: any) => {
  return request('post', '/categories', params);
};
