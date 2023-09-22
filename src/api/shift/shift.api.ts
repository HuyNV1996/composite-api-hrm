import { historyShiftEditBody } from './../../interface/weeklyreport/type';
import { HISTORY_SHIFT_EDIT, SHIFTSLIST } from "../constApi";
import { ICreateShiftBody, IFilterShiftsParams } from "@/interface/shifts/shifts";
import { request } from "../request";
import { mapShift } from "./transform";

export const deleteShiftById = async (id: number) => {
    try {
        const res = await request('delete', SHIFTSLIST.DELETE + "/" + id);
        return res;
    } catch (error) {
        console.log(error)
    }
}
export const getListShifts = async (params: IFilterShiftsParams) => {
    let url = SHIFTSLIST.SEARCH
    // let current_user_company_id = localStorage.getItem('company_id');
    let filterArr = [];
    // filterArr.push(`["company_id","=",${current_user_company_id}]`);
    if (params.name) {
        filterArr.push(`["name","like","${params.name.trim()}"]`)
    }
    if (params.c_start_work_time) {
        filterArr.push(`["c_start_work_time","like","${params.c_start_work_time}"]`)
    }
    if (params.c_end_work_time) {
        filterArr.push(`["c_end_work_time","like","${params.c_end_work_time}"]`)
    }
    if (params.c_start_rest_time) {
        filterArr.push(`["c_start_rest_time","like","${params.c_start_rest_time}"]`)
    }
    if (params.c_end_rest_time) {
        filterArr.push(`["c_end_rest_time","like","${params.c_end_rest_time}"]`)
    }
    if (filterArr.length > 0) {
        url += '&filter=' + '[' + [filterArr].toString() + ']';
    }


    const res = await request('get', url);
    return {
        results: {
            data: mapShift(res?.result?.reverse()),
            total: res?.count,
        },
    };
}

export const createShift = async (body: ICreateShiftBody) => {
    return await request('post', SHIFTSLIST.CREATE, body);
};

export const updateShift = async (body: ICreateShiftBody, id: string | undefined) => {
    return await request('post', SHIFTSLIST.UPDATE + "/" + id, body);
};

export const getHistoryEditById = async (body: historyShiftEditBody) => {
    return await request('post', HISTORY_SHIFT_EDIT.SEARCH, body)
}
