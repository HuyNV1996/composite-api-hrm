import { POST } from '../constApi';
import { request } from '../request';
import { mapView, mapViewImage } from './utils';
import {
  ICreateSeedingPostPrams,
  IGetListPostParams,
  IGetListPostResponse,
  ILikeSeedingPostRequest,
  ISeedingPostCreateResponse,
} from '@/interface/posts/types';

export const apiGeListPosts = async (params: IGetListPostParams) => {
  let sortord = params.sortOrder;
  if (sortord === 'ascend') {
    sortord = 'asc';
  }
  if (sortord === 'descend' || sortord === undefined) {
    sortord = 'desc';
  }
  const url = `${POST.GETLIST}/paging`;
  let data = new FormData();
  data.append('pageNumber', String(Number(params.pageNumber) - 1));
  data.append('pageSize', params.pageSize);
  data.append('sort', params.sort || 'asc');
  data.append('sortOrder', sortord);
  data.append('search', params.search || '');
  data.append('site', params.site || '');
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

export const apiGetPostById = async (id: string) => {
  return await request<any>('get', `${POST.DETAIL}/${id}`);
};

// Post Seeding
export const apiCreateSeedingPost = async (params: ICreateSeedingPostPrams) => {
  // console.log(params);
  const img =[]
  img.push(params?.image?.url.replace('http://103.199.16.127:9996/','')) 
  const body = {
    userId: params.userID,
    groupId: params.groupId,
    site: params.site,
    content: params.content,
    tag: params.tag,
    keywords: params.keywords,
    images: img
  };
  

  return await request<any>('post', '/post/seeding/create', body);
};

export const apiGetPostSeedingById = async (id: string) => {
  return await request<any>('get', `/post/seeding/detail/${id}`);
};

export const apiDeletePostSeeding = async (id: string) => {
  return await request<any>('delete', `/post/seeding/delete/${id}`);
};

export const apiUpdatePostSeeding = async (params: ICreateSeedingPostPrams,id: string) => {
  const body = {
    postId: id,
    userId: params.userID,
    groupId: params.groupId,
    site: params.site,
    content: params.content,
    keywords: params.keywords,
    tag: params.tag,
  };
  return (await request<ISeedingPostCreateResponse>(
    'put',
    `/post/seeding/update`,
    body
  )) as ISeedingPostCreateResponse;
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
  const res = (await request<any>('post', url, data)) as any;
  return {
    results: {
      data: mapView(res.data),
      total: res.total,
    },
  };
};

export const apiLikeSeedingPost = async (params: ILikeSeedingPostRequest) => {
  const url = `/post/seeding/like?site=${params.site}&postId=${params.postId}`
  return await request<any>('post', url);
};