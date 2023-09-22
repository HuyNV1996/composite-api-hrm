import { request } from "../request";
import { GET_NATION_LIST } from "../constApi";

export const getListNation = async () => {
    const res = await request("get", GET_NATION_LIST.GETALL);
    return res;
}