import { POST_FA, POST_FB, POST_TW } from '../constApi';
import { request } from '../request';
import { mapView } from './utils';
import {
  ICreateSeedingPostPrams,
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

// Twitter API
export const apiGeListPosts_TW = async (params: IGetListPostParams) => {
  let sortord = params.sortOrder;
  if (sortord === 'ascend') {
    sortord = 'asc';
  }
  if (sortord === 'descend' || sortord === undefined) {
    sortord = 'desc';
  }
  const url = `${POST_TW.GETLIST}/paging`;
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

export const apiGetPostById_TW = async (id: string) => {
  return await request<any>('get', `${POST_TW.DETAIL}/${id}`);
};


// Post Seeding
export const apiCreateSeedingPost = async (params: ICreateSeedingPostPrams) => {
  const body = {
    userId: params.userId,
    groupId: params.groupId,
    site: params.site,
    content: params.content
  }
  return await request<any>(
    'post',
    '/post/seeding/create',
    body
  )
};

export const apiGeListSeedingPosts = async (params: IGetListPostParams) => {
  let sortord = params.sortOrder;
  if (sortord === 'ascend') {
    sortord = 'asc';
  }
  if (sortord === 'descend' || sortord === undefined) {
    sortord = 'desc';
  }
  const url = `/post/seeding/paging`;
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