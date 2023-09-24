export interface IGetListCommentParams{
    pageSize: string;
    pageNumber: string;
    sort: string;
    sortOrder: string;
}

export interface IGetListCommentResponse {
    status: number
    message: string
    code: number
    data: IGetListCommentData[]
    total: number
    page: number
  }
  
  export interface IGetListCommentData {
    postID: number
    userId: string
    title: any
    description: any
    type: number
    sentiment: number
    content: string
    originalContent: string
    language: string
    priority: number
    link: any
    linkTitle: any
    linkDescription: any
    replyToPostID: number
    totalLikes: number
    totalReplies: number
    totalShares: number
    isTop: boolean
    isExpertIdea: boolean
    date: number
  }
  