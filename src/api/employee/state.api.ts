import { request } from "../request";
import { GET_STATE_LIST } from "../constApi";

export const getListState = async () => {
    const res = await request("get", GET_STATE_LIST.GETALL);
    return res;
}