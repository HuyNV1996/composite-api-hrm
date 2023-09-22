import { request } from '../request';
import { DOMAIN_IMPORT_LUCKY } from '../constApi';

export interface IGetAllComments {
  page_size: number;
  page_number: number;
}

export const getAllComments = async (params: IGetAllComments) => {
  console.log(params);

  let url = `comment/paging?pageNumber=${String(
    params.page_number - 1
  )}&pageSize=${String(params.page_size)}`;
  console.log(url);

  const res = await request('get', url);
  return res;
};
