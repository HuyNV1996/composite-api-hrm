export interface ICampaignListParams{
    pageNumber: number;
    pageSize: number;
}

export interface ICampaignListResponse {
    status: number
    message: string
    code: number
    data: ICampaignListData[]
    total: number
    page: number
  }
  
  export interface ICampaignListData {
    id: number
    userCreated: ICampaignUserCreated
    site: string
    name: string
    description: string
    active: boolean
    rule: ICampaignRule
    totalUser: any
    totalSent: any
    createdAt: number
    updatedAt: number
  }
  
  export interface ICampaignUserCreated {
    id: number
    username: string
    password: string
    email: string
    role: number
    createdAt: number
    updatedAt: number
  }
  
  export interface ICampaignRule {
    name: string
    operator: string
    value: string
  }
  
  export interface ICampaignCreateResponse {
    status: number
    message: string
    code: number
    data: ICampaignCreateData
  }
  
  export interface ICampaignCreateData {
    id: number
    userCreated: ICampaignCreateUserCreated
    idUserCreated: number
    site: string
    name: string
    description: string
    active: boolean
    rule: string
    totalUser: number
    totalSent: any
    createdAt: number
    updatedAt: number
  }
  
  export interface ICampaignCreateUserCreated {
    id: number
    username: string
    password: any
    email: string
    role: number
    createdAt: number
    updatedAt: number
  }
  
  export interface IAddUser2Campaign{
    id_campaign: string,
    id_users: string
  }

  export interface IFormCampaign{
    id_campaign: string
  }