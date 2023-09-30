import {
  IUserListParams,
  IUserListResponse,
  IUserSeedingCreateParams,
} from '@/interface/users/types';
import { USER_FA, USER_FB } from '../constApi';
import { request } from '../request';
import { mapView } from './utils';

export const apiGeListUsers_FA = async (params: IUserListParams) => {
  let sortord = params.sortOrder;
  if (sortord === 'ascend') {
    sortord = 'asc';
  }
  if (sortord === 'descend' || sortord === undefined) {
    sortord = 'desc';
  }
  const url = `${USER_FA.GETLIST}/paging`;
  let data = new FormData();
  data.append('pageNumber', String(Number(params.pageNumber) - 1));
  data.append('pageSize', params.pageSize);
  data.append('sort', params.sort || '');
  data.append('sortOrder', sortord);
  data.append('search', params.search || '');
  const res = (await request<IUserListResponse>(
    'post',
    url,
    data
  )) as IUserListResponse;
  return {
    results: {
      data: mapView(res.data),
      total: res.total,
    },
  };
};

// Seeding
export const apiGeListSeedingUsers_FA = async (params: IUserListParams) => {
  let sortord = params.sortOrder;
  if (sortord === 'ascend') {
    sortord = 'asc';
  }
  if (sortord === 'descend' || sortord === undefined) {
    sortord = 'desc';
  }
  const url = `${USER_FA.GETLIST}/seeding`;
  let data = new FormData();
  data.append('pageNumber', String(Number(params.pageNumber) - 1));
  data.append('pageSize', params.pageSize);
  data.append('sort', params.sort);
  data.append('sortOrder', sortord);
  const res = (await request<IUserListResponse>(
    'post',
    url,
    data
  )) as IUserListResponse;
  return {
    results: {
      data: mapView(res.data),
      total: res.total,
    },
  };
};
export const apiCreateSeedingUser_FA = async (
  params: IUserSeedingCreateParams
) => {
  const res = (await request<IUserListResponse>(
    'post',
    '/users/create/seeding',
    params
  )) as IUserListResponse;
  return {
    results: {
      data: mapView(res.data),
      total: res.total,
    },
  };
};

export const apiDeleteSeedingUser_FA = async (id: string) => {
  return await request<any>('post', `/users/seeding/delete?userId=${id}`);
};

// Facebook API
export const apiGeListUsers_FB = async (params: IUserListParams) => {
  let sortord = params.sortOrder;
  if (sortord === 'ascend') {
    sortord = 'asc';
  }
  if (sortord === 'descend' || sortord === undefined) {
    sortord = 'desc';
  }
  const url = `${USER_FB.GETLIST}/paging`;
  let data = new FormData();
  data.append('pageNumber', String(Number(params.pageNumber) - 1));
  data.append('pageSize', params.pageSize);
  data.append('sort', params.sort || '');
  data.append('sortOrder', sortord);
  data.append('search', params.search || '');
  const res = (await request<IUserListResponse>(
    'post',
    url,
    data
  )) as IUserListResponse;
  return {
    results: {
      data: mapView(res.data),
      total: res.total,
    },
  };
};