import { IUserListParams, IUserListResponse } from "@/interface/users/types";
import { POST, USER } from "../constApi";
import { request } from "../request";
import { mapView } from "./utils";
import { IGetListPostParams, IGetListPostResponse } from "@/interface/posts/types";

/** Login */
export const apiGeListPosts = async (params: IGetListPostParams) =>
{
  let sortord = params.sortOrder;
  if(sortord === "ascend"){
    sortord = 'asc'
  }
  if(sortord === "descend"  || sortord === undefined){
    sortord = 'desc'
  }
  const url = `${POST.GETLIST}/paging`;
  let data = new FormData();
  data.append('pageNumber', params.pageNumber);
  data.append('pageSize', params.pageSize);
  data.append('sort', params.sort);
  data.append('sortOrder', sortord);
  const res = await request<IGetListPostResponse>('post', url, data) as IGetListPostResponse;
  return {
    results: {
      data: mapView(res.data),
      total: res.total,
    },
  };
}