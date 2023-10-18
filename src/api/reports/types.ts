export interface IGetListTopStockCodeResponse {
    status: number
    message: string
    code: number
    data: IGetListTopStockCodeData[]
  }
  
  export interface IGetListTopStockCodeData {
    id: number
    stock: string
    stockEntity: IStockEntity
    site: string
    total: number
    createdAt: number
  }
  
  export interface IStockEntity {
    ma: string
    ten: string
    san: string
  }