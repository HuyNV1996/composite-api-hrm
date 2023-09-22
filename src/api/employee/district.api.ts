import { request } from "../request";
import { GET_DISTRICT_LIST } from "../constApi";

export const getListDistrict = async () => {
    const res = await request("get", GET_DISTRICT_LIST.GETALL);
    return res;
}