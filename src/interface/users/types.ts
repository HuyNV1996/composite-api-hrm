export interface IUserListResponse {
    status: number
    message: string
    code: number
    data: IUserListData[]
    total: number
    page: number
  }
  
  export interface IUserListData {
    id: string
    username: any
    password: any
    name: string
    bio?: string
    email: any
    address?: string
    facebookLink: any
    isExpert?: boolean
    isTeacher?: boolean
    blocked?: boolean
    totalPosts?: number
    totalLikes?: number
    followers?: number
    following?: number
  }

export interface IUserListParams{
    pageNumber: string;
    pageSize: string;
    sort: string;
    sortOrder: string;
}
export interface IDecoded {
    id: string;
    iat: number;
    exp: number;
  }

  export interface IUserSeedingCreateParams {
    username: string
    password: string
    name: string
    bio: string
    email: string
    address: string
    facebookLink: string
    isExpert: boolean
    isTeacher: boolean
    blocked: boolean
    totalPosts: number
    totalLikes: number
    followers: number
    following: number
    userLucky: boolean
  }