import { request } from '../request';
import { DOMAIN_IMPORT_LUCKY } from '../constApi';

export interface IGetAllUsers {
  page_size: number;
  page_number: number;
}

export const getAllUsers = async (params: IGetAllUsers) => {
  console.log(params);

  let url = `users/paging?pageNumber=${String(
    params.page_number - 1
  )}&pageSize=${String(params.page_size)}`;
  console.log(url);

  const res = await request('get', url);
  return res;
};
