import { AxiosRequestConfig } from 'axios';
import { request } from "../request";
import { IStorageResponse, IStorageUploadRequest } from "./types";

export const uploadFile = (payload: IStorageUploadRequest) => {
    const formData = new FormData()
  // Append the uploaded file directly
  formData.append('file', payload.file)
  const config: AxiosRequestConfig = {
    headers: {
      accept: '*/*',
      'content-type': 'multipart/form-data',
    },
  }
    return request('post',`storage/upload?fileType=${payload.fileType}`,formData,false,config);
  };