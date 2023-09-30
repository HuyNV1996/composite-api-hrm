import { POST_FA, POST_FB } from '../constApi';
import { request } from '../request';
import { mapView } from './utils';
import {
  IGetListPostParams,
  IGetListPostResponse,
} from '@/interface/posts/types';

export const apiGeListPosts_FA = async (params: IGetListPostParams) => {
  let sortord = params.sortOrder;
  if (sortord === 'ascend') {
    sortord = 'asc';
  }
  if (sortord === 'descend' || sortord === undefined) {
    sortord = 'desc';
  }
  const url = `${POST_FA.GETLIST}/paging`;
  let data = new FormData();
  data.append('pageNumber', String(Number(params.pageNumber) - 1));
  data.append('pageSize', params.pageSize);
  data.append('sort', params.sort || 'asc');
  data.append('sortOrder', sortord);
  data.append('search', params.search || '');
  const res = (await request<IGetListPostResponse>(
    'post',
    url,
    data
  )) as IGetListPostResponse;
  return {
    results: {
      data: mapView(res.data),
      total: res.total,
    },
  };
};

export const apiGetPostById_FA = async (id: string) => {
  return await request<any>('get', `${POST_FA.DETAIL}/${id}`);
};

// Facebook API
export const apiGeListPosts_FB = async (params: IGetListPostParams) => {
  let sortord = params.sortOrder;
  if (sortord === 'ascend') {
    sortord = 'asc';
  }
  if (sortord === 'descend' || sortord === undefined) {
    sortord = 'desc';
  }
  const url = `${POST_FB.GETLIST}/paging`;
  let data = new FormData();
  data.append('pageNumber', String(Number(params.pageNumber) - 1));
  data.append('pageSize', params.pageSize);
  data.append('sort', params.sort || 'asc');
  data.append('sortOrder', sortord);
  data.append('search', params.search || '');
  const res = (await request<any>(
    'post',
    url,
    data
  )) as any;
  return {
    results: {
      data: mapView(res.data),
      total: res.total,
    },
  };
};

export const apiGetPostById_FB = async (id: string) => {
  return await request<any>('get', `${POST_FB.DETAIL}/${id}`);
};