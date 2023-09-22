export interface IViewHistoryShiftEdit{
    item: IViewHistoryShiftEditItem[]
}
export interface IViewHistoryShiftEditItem{
    create_date: string;
    user:IViewHistoryShiftUser[]
}
export interface IViewHistoryShiftUser{
    name: string
    value: IViewHistoryShiftValue[]
}
export interface IViewHistoryShiftValue{
    old_value_text: string
    new_value_text: string
}