import { IExplanationColumn } from "@/interface/explanation/explanation";
import { request } from "../request";
import { mapShift } from "./transform";
import { EXPLANATION_REQUEST } from "../constApi";

export const getListExplanation = async (params: IExplanationColumn) => {
    let url = EXPLANATION_REQUEST.SEARCH;
    if(
        params.time_keeping_code ||
        params.employee_code ||
        params.employee_name 
    ) {
        url += `/?filter=`;
    }
    let filterArr = [];
    if (params.time_keeping_code) {
        filterArr.push(`"|"+ ["time_keeping_code","ilike","${params.time_keeping_code?.trim()}"]`)
    }
    if (params.employee_code) {
        filterArr.push(`"|"+ ["employee_code","ilike","${params.employee_code?.trim()}"]`)
    }
    if (params.employee_name) {
        filterArr.push(`"|"+ ["employee_name","ilike","${params.employee_name?.trim()}"]`)
    }
    if (params.shift_name) {
        filterArr.push(`["shift_name","ilike","${params.shift_name?.trim()}"]`)
    }
    if (filterArr.length > 0) {
        url += '[' + [filterArr].toString() + ']'+'&order="date asc';
    }
    // const url = 'api/hr.apec.attendance.report?filter=["|",["time_keeping_code","like","OFF"],"|",["employee_code","like","OFF"],"|",["employee_name","like","OFF"],["shift_name","like","OFF"]]&order="date asc"'
    const res = await request('get', url);
    return {
    results: {
      data: mapShift(res?.result),
      total: res?.count,
    },
}
}
