export interface IUserArgs {
  status: number;
  message: string;
  code: number;
  data: IUser[];
  total: number;
  page: number;
}

export interface IUser {
  id: string;
  username: any;
  password: any;
  name: string;
  bio?: string;
  email: any;
  address?: string;
  facebookLink: any;
  isExpert?: boolean;
  isTeacher?: boolean;
  blocked?: boolean;
  totalPosts?: number;
  totalLikes?: number;
  followers?: number;
  following?: number;
}
