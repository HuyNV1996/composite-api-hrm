import { request } from "../request";
import { GET_COUNTRY_LIST } from "../constApi";

export const getListCountry = async () => {
    const res = await request("get", GET_COUNTRY_LIST.GETALL);
    return res;
}