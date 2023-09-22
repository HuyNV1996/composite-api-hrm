import { request } from "../request";
import { GET_DEPARTMENT } from "../constApi";

export const getListDepartment = async () => {
  const res = await request("get", GET_DEPARTMENT.GETALL+'&filter=[["company_id" , "=" , ' + localStorage.company_id+"]]");
  console.log(GET_DEPARTMENT.GETALL+'&filter=[["company_id" , "=" , ' + localStorage.company_id+"]]");
  return res;
  };
