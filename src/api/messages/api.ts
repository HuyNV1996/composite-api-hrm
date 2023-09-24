import { IMessageParams } from "@/interface/message/api";
import { request } from "../request";

export const apiSendMessage = async (params: IMessageParams) =>
{
  const url = `/sent-message?user_id=${params.user_id}&message=${params.message}&num_trials=3`
  return await request<any>('post', url,null, true);
}