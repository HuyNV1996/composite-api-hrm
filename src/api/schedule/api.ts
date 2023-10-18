import { request } from "../request";
import { IFormScheduleRequest } from "./types";

export const getListSchedule = async () =>{
    const res = await request<any>('get', '/schedule/get-list');
    return {
        results: {
          data: res.data,
          total: res.total,
        },
      };
}
export const getScheduleById = async (id: string) =>{
    return await request<any>('get', `/schedule/detail/${id}`);
}
export const createSchedule = async (body: IFormScheduleRequest) =>{
    return await request<any>('post', '/schedule/create',body);
}
export const updateSchedule = async (body: IFormScheduleRequest,id: number) =>{
    const data = {
        ...body,
        id: id
    }
    return await request<any>('put', '/schedule/update',data);
}