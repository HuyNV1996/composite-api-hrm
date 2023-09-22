import { request } from "../request";
import { GET_COMPANY } from "../constApi";

export const getListCompany = async () => {
    return await request('get', GET_COMPANY.GETALL);
  };
  