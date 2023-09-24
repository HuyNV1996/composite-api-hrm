export interface IRoomsListParams{
    pageNumber: number;
    pageSize: number;
}

export interface RoomsListResponse {
    status: number
    message: string
    code: number
    data: RoomsListData[]
    total: number
    page: number
  }
  
  export interface RoomsListData {
    roomID: number
    name: string
    description: string
    status: number
    privacy: number
    visibility: number
    role: number
    approved: boolean
    blocked: boolean
    verified: boolean
    createdDate: number
  }
  