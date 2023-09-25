import { ICampaignCreateResponse, ICampaignListParams, ICampaignListResponse } from "@/interface/campaign/types";
import { request } from "../request";
import { mapView } from "./utils";
import { ICreateCampaignParams } from "@/pages/campaign/handle/form_create/types";

export const apiGeListCampaign = async (params: ICampaignListParams) =>
{
  const url = `/campaign/get-list?pageNumber=${params.pageNumber-1}&pageSize=${params.pageSize}`
  const res = await request<ICampaignListResponse>('get', url) as ICampaignListResponse;
  return {
    results: {
      data: mapView(res.data),
      total: res.total,
    },
  };
}

export const apiDeleteCampaign = async (id: string) => {
  return await request<any>('delete', `/campaign/delete/${id}`);
}

export const apiCreateCampaign = async (params: ICreateCampaignParams) =>
{
  return await request<ICampaignCreateResponse>('post', '/campaign/create', params) as ICampaignCreateResponse;
}

export const apiUpdateCampaign = async (params: ICreateCampaignParams,id: string) =>
{
  return await request<ICampaignCreateResponse>('put', `/campaign/update/${id}`, params) as ICampaignCreateResponse;
}