import { request } from "../request";
import { GET_LIST_WARD } from "../constApi";

export const getListWard = async () => {
    const res = await request("get", GET_LIST_WARD.GETALL);
    return res;
}