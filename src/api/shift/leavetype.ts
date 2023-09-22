import { request } from "../request";
import { GET_HR_LEAVE_TYPE, GET_LEAVE_TYPE, GET_LIST_LEAVE } from "../constApi";

export const getListLeaveType = async () => {
    return await request('get', GET_HR_LEAVE_TYPE.GETALL);
  }
export const getLeaveTypeSource = async () => {
  return await request('get', GET_LEAVE_TYPE.GETALL);
}

export const updateStatusLeave = async (body: any) => {
  return await request('post',GET_LIST_LEAVE.UPDATE,body);
}