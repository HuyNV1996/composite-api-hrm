import { request } from "../request";
import { DOMAIN_GET_CONTRACT_TYPE } from "../constApi";

export const getListContractType = async () => {
    try {
        const res = await request("get", DOMAIN_GET_CONTRACT_TYPE.GETALL);
        return res;
    } catch (error) {
        console.log(error)
    }
}