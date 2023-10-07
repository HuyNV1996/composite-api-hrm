export interface IStorageResponse {
    status: number
    message: string
    code: number
    data: string
  }
export interface IStorageUploadRequest{
    file: File;
    fileType: string
}