export interface IFormScheduleRequest{
    id?:number
    name: string
    crontab: string
    description: string
    active: boolean
}