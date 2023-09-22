import { request } from "../request";
import { GET_CITY_LIST } from "../constApi";

export const getListCity = async () => {
    const res = await request("get", GET_CITY_LIST.GETALL);
    return res;
}