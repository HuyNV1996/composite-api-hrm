export interface IRoomArgs {
  status: number;
  message: string;
  code: number;
  data: IRoom[];
  total: number;
  page: number;
}

export interface IRoom {
  roomID: number;
  name: string;
  description: string;
  status: number;
  privacy: number;
  visibility: number;
  role: number;
  approved: boolean;
  blocked: boolean;
  verified: boolean;
  createdDate: number;
}
