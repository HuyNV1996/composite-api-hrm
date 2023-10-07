import { IMessageParams } from "@/interface/message/api";
import { request } from "../request";

export const apiSendMessage = async (params: IMessageParams) =>
{
  const body =  {
    ...params,
    num_trials: 3
  }
  const url = `/sent-message`
  return await request<any>('post', url,params, true);
}