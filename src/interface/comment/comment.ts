export interface ICommentArgs {
  status: number;
  message: string;
  code: number;
  data: IComment[];
  total: number;
  page: number;
}

export interface IComment {
  postID: number;
  userId: string;
  title: any;
  description: any;
  type: number;
  sentiment: number;
  content: string;
  originalContent: string;
  language: string;
  priority: number;
  link?: string;
  linkTitle?: string;
  linkDescription?: string;
  replyToPostID: number;
  totalLikes: number;
  totalReplies: number;
  totalShares: number;
  isTop: boolean;
  isExpertIdea: boolean;
  date: number;
}
