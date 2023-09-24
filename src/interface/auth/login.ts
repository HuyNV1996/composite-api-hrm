/** user's role */
export type Role = 'guest' | 'admin';

export interface LoginParams {
  /** 用户名 */
  username: string;
  /** 用户密码 */
  password: string;
}

export interface LoginResult {
  /** auth token */
  access_token: string | null;
  expires_in: number;
  token_type: string | null;
  refresh_token: string | null;
  user_info: {
    address: string;
    department: string;
    email: string;
    name: string;
    phoneNumber: string;
  };
}
export interface ProfileResult {
  name: string;
  phoneNumber: string;
  email: string | null;
  address: string | null;
  department: string | null;
}
export interface LogoutParams {
  token: string;
}

export interface LogoutResult {}

export interface IDecoded {
  id: string;
  iat: number;
  exp: number;
}

export interface ILoginRes {
  status: number
  message: string
  code: number
  data: ILoginData
}

export interface ILoginData {
  id: number
  username: string
  email: string
  role: number
  token: string
  createdAt: number
  updatedAt: number
}

export interface IRegisterParams{
  username: string
  password: string
  email: string
}