import { IUserListParams, IUserListResponse, IUserSeedingCreateParams } from "@/interface/users/types";
import { USER } from "../constApi";
import { request } from "../request";
import { mapView } from "./utils";

/** Login */
export const apiGeListUsers = async (params: IUserListParams) =>
{
  let sortord = params.sortOrder;
  if(sortord === "ascend"){
    sortord = 'asc'
  }
  if(sortord === "descend"  || sortord === undefined){
    sortord = 'desc'
  }
  const url = `${USER.GETLIST}/paging`;
  let data = new FormData();
  data.append('pageNumber', params.pageNumber);
  data.append('pageSize', params.pageSize);
  data.append('sort', params.sort);
  data.append('sortOrder', sortord);
  const res = await request<IUserListResponse>('post', url, data) as IUserListResponse;
  return {
    results: {
      data: mapView(res.data),
      total: res.total,
    },
  };
}

export const apiCreateSeedingUser = async (params: IUserSeedingCreateParams) =>
{
  const res = await request<IUserListResponse>('post', '/users/create/seeding', params) as IUserListResponse;
  return {
    results: {
      data: mapView(res.data),
      total: res.total,
    },
  };
}

export const apiDeleteSeedingUser = async (id: string) => {
  return await request<any>('post', `/users/seeding/delete?userId=${id}`);
}