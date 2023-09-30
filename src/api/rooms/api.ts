import { ROOM } from "../constApi";
import { request } from "../request";
import { mapView } from "./utils";
import { IRoomsListParams, RoomsListResponse } from "@/interface/rooms/types";

export const apiGeListRooms = async (params: IRoomsListParams) =>
{
  const url = `${ROOM.GETLIST}/paging?pageNumber=${params.pageNumber-1}&pageSize=${params.pageSize}`
  const res = await request<RoomsListResponse>('get', url) as RoomsListResponse;
  return {
    results: {
      data: mapView(res.data),
      total: res.total,
    },
  };
}