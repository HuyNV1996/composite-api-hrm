export interface IPostArgs {
  status: number;
  message: string;
  code: number;
  data: IPost[];
  total: number;
  page: number;
}

export interface IPost {
  id: number;
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
