export interface IMessageParams {
    account: IMessageAccount
    item: IMessageItem
  }
  
  export interface IMessageAccount {
    username: string
    password: string
  }
  
  export interface IMessageItem {
    user_id: string
    message: string
    num_trials: number
  }
  
export interface IFormMessage{
    message: string
}