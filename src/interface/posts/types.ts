export interface IGetListPostParams {
  pageSize: string;
  pageNumber: string;
  sort: string;
  sortOrder: string;
  search: string;
  site: string;
}

export interface IGetListPostResponse {
  status: number;
  message: string;
  code: number;
  data: IGetListPostData[];
  total: number;
  page: number;
}

export interface IGetListPostData {
  postID: number;
  userId: string;
  title: string;
  description: string;
  type: number;
  sentiment: number;
  content: string;
  originalContent: string;
  language: string;
  priority: any;
  link: string;
  linkTitle: string;
  linkDescription: string;
  replyToPostID: any;
  totalLikes: number;
  totalReplies: number;
  totalShares: number;
  isTop: boolean;
  isExpertIdea: boolean;
  date: number;
}

export interface ICreateSeedingPostPrams {
  postId?: string;
  userId: string;
  userID?: string;
  groupId: string;
  site: string;
  content: string;
  tag?: string[];
  keywords?: string[];
  image?: IImage;
}
export interface IImage{
  url: string,
  type: string
}
export interface ISeedingPostCreateResponse {
  status: number;
  message: string;
  code: number;
  data: ICreateSeedingPostPrams;
}

export interface IGetPostByIdResponse {
  status: number;
  message: string;
  code: number;
  data: IGetPostByIdData;
  total: number;
  page: number;
}

export interface IGetPostByIdData {
  postId: string;
  site: string;
  userId: string;
  userEntity: IGetPostByIdUser;
  groupId: any;
  group: any;
  title: string;
  description: string;
  sentiment: number;
  content: any;
  originalContent: any;
  link: any;
  linkTitle: any;
  linkDescription: any;
  totalLikes: number;
  totalComments: any;
  totalShares: number;
  createdAt: number;
}

export interface IGetPostByIdUser {
  id: string;
  username: any;
  password: any;
  token: any;
  name: string;
  bio: any;
  email: any;
  address: any;
  totalPosts: number;
  totalLikes: number;
  followers: number;
  following: number;
  userLucky: any;
  site: string;
}

export interface ILikeSeedingPostRequest{
  site: string;
  postId: string;
}