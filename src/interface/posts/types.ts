export interface IGetListPostParams{
    pageSize: string;
    pageNumber: string;
    sort: string;
    sortOrder: string;
    search: string;
}

export interface IGetListPostResponse {
    status: number
    message: string
    code: number
    data: IGetListPostData[]
    total: number
    page: number
  }
  
  export interface IGetListPostData {
    postID: number
    userId: string
    title: string
    description: string
    type: number
    sentiment: number
    content: string
    originalContent: string
    language: string
    priority: any
    link: string
    linkTitle: string
    linkDescription: string
    replyToPostID: any
    totalLikes: number
    totalReplies: number
    totalShares: number
    isTop: boolean
    isExpertIdea: boolean
    date: number
  }
  