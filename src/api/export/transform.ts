
export interface IExportExcel {
    id: number,
    name: string,
    url: string,
    template: string,
    month: number,
    year: number,
}
export const mapExportExcel = (res: IExportExcel[]) => {
    return res && res.length > 0 && res.map((item, index) => {
        return {
            no: index + 1,
            id: item?.id,
            name: item?.name,
            url: item?.url,
            template: item?.template,
            month: item?.month,
            year: item?.year,
        }
    })
}