import { request } from "../request";
import { GET_LIST_WORK_HOUR } from "../constApi";

export const getListWorkHour = async () => {
    const res = await request("get", GET_LIST_WORK_HOUR.GETALL);
    return res;
}