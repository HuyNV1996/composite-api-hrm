import { request } from '../request';

export interface IGetAllPosts {
  page_size: number;
  page_number: number;
}

export const getAllPosts = async (params: IGetAllPosts) => {
  console.log(params);

  let url = `post/paging?pageNumber=${String(
    params.page_number - 1
  )}&pageSize=${String(params.page_size)}`;
  console.log(url);

  const res = await request('get', url);
  return res;
};
