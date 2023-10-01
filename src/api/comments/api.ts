import {
  IGetListCommentParams,
  IGetListCommentResponse,
} from '@/interface/comments/types';
import { COMMENT_FA, COMMENT_FB, COMMENT_TW } from '../constApi';
import { request } from '../request';
import { mapView } from './utils';

export const apiGeListComments_FA = async (params: IGetListCommentParams) => {
  let sortord = params.sortOrder;
  if (sortord === 'ascend') {
    sortord = 'asc';
  }
  if (sortord === 'descend' || sortord === undefined) {
    sortord = 'desc';
  }
  const url = `${COMMENT_FA.GETLIST}/paging`;
  let data = new FormData();
  data.append('pageNumber', String(Number(params.pageNumber) - 1));
  data.append('pageSize', params.pageSize);
  data.append('sort', params.sort || '');
  data.append('sortOrder', sortord);
  data.append('search', params.search || '');
  const res = (await request<IGetListCommentResponse>(
    'post',
    url,
    data
  )) as IGetListCommentResponse;
  return {
    results: {
      data: mapView(res.data),
      total: res.total,
    },
  };
};

export const apiGetCommentById_FA = async (id: string) => {
  return await request<any>('get', `/comment/fa/detail/${id}`);
};

// Facebook API
export const apiGeListComments_FB = async (params: IGetListCommentParams) => {
  let sortord = params.sortOrder;
  if (sortord === 'ascend') {
    sortord = 'asc';
  }
  if (sortord === 'descend' || sortord === undefined) {
    sortord = 'desc';
  }
  const url = `${COMMENT_FB.GETLIST}/paging`;
  let data = new FormData();
  data.append('pageNumber', String(Number(params.pageNumber) - 1));
  data.append('pageSize', params.pageSize);
  data.append('sort', params.sort || '');
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

export const apiGetCommentById_FB = async (id: string) => {
  return await request<any>('get', `/comment/fb/detail/${id}`);
};

// Twitter API
export const apiGeListComments_TW = async (params: IGetListCommentParams) => {
  let sortord = params.sortOrder;
  if (sortord === 'ascend') {
    sortord = 'asc';
  }
  if (sortord === 'descend' || sortord === undefined) {
    sortord = 'desc';
  }
  const url = `${COMMENT_TW.GETLIST}/paging`;
  let data = new FormData();
  data.append('pageNumber', String(Number(params.pageNumber) - 1));
  data.append('pageSize', params.pageSize);
  data.append('sort', params.sort || '');
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

export const apiGetCommentById_TW = async (id: string) => {
  return await request<any>('get', `/comment/tw/detail/${id}`);
};