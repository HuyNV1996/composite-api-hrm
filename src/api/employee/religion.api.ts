import { request } from "../request";
import { GET_RELIGION_LIST } from "../constApi";

export const getListReiligion = async () => {
    const res = await request("get", GET_RELIGION_LIST.GETALL);
    return res;
}