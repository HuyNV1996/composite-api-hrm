import { BaseInfo } from '../base';

export interface IUser extends BaseInfo {
  id: string;
  username: string;
  staffCode: string;
  fullname: string;
  phone: string;
  email: string;
  department: string;
}

export type IFormUser = Omit<IUser, 'id'>;
