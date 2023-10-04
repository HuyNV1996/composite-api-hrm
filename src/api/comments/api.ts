import {
  IGetListCommentParams,
  IGetListCommentResponse,
} from '@/interface/comments/types';
import { COMMENT } from '../constApi';
import { request } from '../request';
import { mapView } from './utils';

export const apiGeListComments = async (params: IGetListCommentParams) => {
  let sortord = params.sortOrder;
  if (sortord === 'ascend') {
    sortord = 'asc';
  }
  if (sortord === 'descend' || sortord === undefined) {
    sortord = 'desc';
  }
  const url = `${COMMENT.GETLIST}/paging`;
  let data = new FormData();
  data.append('pageNumber', String(Number(params.pageNumber) - 1));
  data.append('pageSize', params.pageSize);
  data.append('sort', params.sort || '');
  data.append('sortOrder', sortord);
  data.append('search', params.search || '');
  data.append('site', params.site || '');
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

export const apiGetCommentById = async (id: string) => {
  return await request<any>('get', `/comments/detail/${id}`);
};
