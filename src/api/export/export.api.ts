
import { EXPORT_EXCEL , DOMAIN_IMPORT_REPORT_SHIFT} from "../constApi";
import { request } from "../request";
import { IExportExcel, mapExportExcel } from './transform';
export interface IArgsExportExcel {
    month: number,
    year: number,
}

export const getListExport = async ( args: IArgsExportExcel) => {
    let requestBody = {
        "params": {
            "args": [
                args?.month ?? "",
                args?.year ?? "",
            ]
        }
    }
    const res = await request('post', EXPORT_EXCEL.GETALL, requestBody);
    return  {
        data: mapExportExcel(res?.result),
        total: res?.result?.length,
    }
}



export const importReportShift = async (data: any) => {
    return await request('post' ,DOMAIN_IMPORT_REPORT_SHIFT.IMPORT ,data )
}