import { convertVietnameseToEnglish } from "@/utils/common";
import { GET_EMPLOYEE_BY_LEAVE } from "../constApi";
import { request } from "../request";
import { IEmployeeByLeave } from "@/interface/leaveManagement";

export interface IEmployeeByLeaveArgs {
    year: string;
    name: string;
    code: string;
    department_name: string;
    position: string
}
export const getEmployeeByLeave = async (args: IEmployeeByLeaveArgs) => {
    let currentYear = new Date().getFullYear();
    currentYear = parseInt(currentYear.toString());
    let url = GET_EMPLOYEE_BY_LEAVE.GETALL;
    let requestBody = {
        params: {
            args: [
                (new Date(args.year ?? currentYear)).getFullYear().toString(),
                convertVietnameseToEnglish((args.name)?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())?.trim() ?? '',
                (args.code ?? '').trim(),
                (args.department_name ?? '').trim(),
                (args.position ?? '').trim(),
            ]
        }
    }
    try {
        const res = await request('post', url, requestBody);
        return {
            results: {
                data: mapEmployeeByLeave(res?.result),
                total: res?.result.length,
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const mapEmployeeByLeave = (res: IEmployeeByLeave[]) => {
    return res && res.length > 0 && res.map((item, index) => {
        return {
            no: index + 1,
            id: item?.id,
            code: item?.code,
            name: item?.name,
            department_name: item?.department_name,
            workingday: item?.workingday,
            position: item?.position,
            date_start: item?.date_start,
            leave_date: item?.leave_date,
            severance_day: item?.severance_day,
            "tang_bu_tv_1": item?.tang_bu_tv_1,
            "tang_bu_ct_1": item?.tang_bu_ct_1,
            "tang_ca_tv_1": item?.tang_ca_tv_1,
            "tang_ca_ct_1": item?.tang_ca_ct_1,
            "su_dung_tv_1": item?.su_dung_tv_1,
            "su_dung_ct_1": item?.su_dung_ct_1,
            "tang_bu_tv_2": item?.tang_bu_tv_2,
            "tang_bu_ct_2": item?.tang_bu_ct_2,
            "tang_ca_tv_2": item?.tang_ca_tv_2,
            "tang_ca_ct_2": item?.tang_ca_ct_2,
            "su_dung_tv_2": item?.su_dung_tv_2,
            "su_dung_ct_2": item?.su_dung_ct_2,
            "tang_bu_tv_3": item?.tang_bu_tv_3,
            "tang_bu_ct_3": item?.tang_bu_ct_3,
            "tang_ca_tv_3": item?.tang_ca_tv_3,
            "tang_ca_ct_3": item?.tang_ca_ct_3,
            "su_dung_tv_3": item?.su_dung_tv_3,
            "su_dung_ct_3": item?.su_dung_ct_3,
            "tang_bu_tv_4": item?.tang_bu_tv_4,
            "tang_bu_ct_4": item?.tang_bu_ct_4,
            "tang_ca_tv_4": item?.tang_ca_tv_4,
            "tang_ca_ct_4": item?.tang_ca_ct_4,
            "su_dung_tv_4": item?.su_dung_tv_4,
            "su_dung_ct_4": item?.su_dung_ct_4,
            "tang_bu_tv_5": item?.tang_bu_tv_5,
            "tang_bu_ct_5": item?.tang_bu_ct_5,
            "tang_ca_tv_5": item?.tang_ca_tv_5,
            "tang_ca_ct_5": item?.tang_ca_ct_5,
            "su_dung_tv_5": item?.su_dung_tv_5,
            "su_dung_ct_5": item?.su_dung_ct_5,
            "tang_bu_tv_6": item?.tang_bu_tv_6,
            "tang_bu_ct_6": item?.tang_bu_ct_6,
            "tang_ca_tv_6": item?.tang_ca_tv_6,
            "tang_ca_ct_6": item?.tang_ca_ct_6,
            "su_dung_tv_6": item?.su_dung_tv_6,
            "su_dung_ct_6": item?.su_dung_ct_6,
            "tang_bu_tv_7": item?.tang_bu_tv_7,
            "tang_bu_ct_7": item?.tang_bu_ct_7,
            "tang_ca_tv_7": item?.tang_ca_tv_7,
            "tang_ca_ct_7": item?.tang_ca_ct_7,
            "su_dung_tv_7": item?.su_dung_tv_7,
            "su_dung_ct_7": item?.su_dung_ct_7,
            "tang_bu_tv_8": item?.tang_bu_tv_8,
            "tang_bu_ct_8": item?.tang_bu_ct_8,
            "tang_ca_tv_8": item?.tang_ca_tv_8,
            "tang_ca_ct_8": item?.tang_ca_ct_8,
            "su_dung_tv_8": item?.su_dung_tv_8,
            "su_dung_ct_8": item?.su_dung_ct_8,
            "tang_bu_tv_9": item?.tang_bu_tv_9,
            "tang_bu_ct_9": item?.tang_bu_ct_9,
            "tang_ca_tv_9": item?.tang_ca_tv_9,
            "tang_ca_ct_9": item?.tang_ca_ct_9,
            "su_dung_tv_9": item?.su_dung_tv_9,
            "su_dung_ct_9": item?.su_dung_ct_9,
            "tang_bu_tv_10": item?.tang_bu_tv_10,
            "tang_bu_ct_10": item?.tang_bu_ct_10,
            "tang_ca_tv_10": item?.tang_ca_tv_10,
            "tang_ca_ct_10": item?.tang_ca_ct_10,
            "su_dung_tv_10": item?.su_dung_tv_10,
            "su_dung_ct_10": item?.su_dung_ct_10,
            "tang_bu_tv_11": item?.tang_bu_tv_11,
            "tang_bu_ct_11": item?.tang_bu_ct_11,
            "tang_ca_tv_11": item?.tang_ca_tv_11,
            "tang_ca_ct_11": item?.tang_ca_ct_11,
            "su_dung_tv_11": item?.su_dung_tv_11,
            "su_dung_ct_11": item?.su_dung_ct_11,
            "tang_bu_tv_12": item?.tang_bu_tv_12,
            "tang_bu_ct_12": item?.tang_bu_ct_12,
            "tang_ca_tv_12": item?.tang_ca_tv_12,
            "tang_ca_ct_12": item?.tang_ca_ct_12,
            "su_dung_tv_12": item?.su_dung_tv_12,
            "su_dung_ct_12": item?.su_dung_ct_12
        }
    }
    )
}
