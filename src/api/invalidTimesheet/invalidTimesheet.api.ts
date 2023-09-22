import { request } from "../request"
import { ICreateInvalidTimesheetArgs, IInvalidTimesheet } from "@/interface/weeklyreport/type"
import { mapShift } from "./transform"
import { GET_INVALID_TIMESHEET_BY_ARGS, INVALID_TIMESHEET } from "../constApi"
import { convertVietnameseToEnglish } from "@/utils/common"

export const createInvalidTimeSheet = async (args: ICreateInvalidTimesheetArgs) => {
    let url = GET_INVALID_TIMESHEET_BY_ARGS.CREATE;
    let requestBody = {
        params: {
            args: [
                args.employee_code ?? '',
                args.invalid_date ?? '',
                args.invalid_type ?? '',
                args.shift_from ?? '',
                args.shift_to ?? '',
                args.shift_break ?? '',
                args.real_time_attendance_data ?? '',
                args.validation_data ?? '',
                args.reason ?? '',
                args.remarks ?? '',
                args.owner ?? '',
                args.reviewer ?? '',
                args.validated ?? '',
            ]
        }
    }
    try {
        const res = await request('post', url, requestBody);
        return {
            results: res?.result,
        }
    } catch (error) {
        console.log(error)
    }
}
export const deleteInvalidTimeeSheetById = async (id: number) => {
    let url = GET_INVALID_TIMESHEET_BY_ARGS.DELETE;
    let requestBody = {
        params: {
            args: [id ?? '']
        },
    }
    try {
        const res = await request('post', url, requestBody);
        return {
            results: res?.result,
        }
    } catch (error) {
        console.log(error)
    }
}
export const getInvalidTimeeSheetByArgs = async (args: IInvalidTimesheet) => {
    let url = GET_INVALID_TIMESHEET_BY_ARGS.GETALL;
    let requestBody = {
        params: {
            args: [
                (args.employee_id ?? '').trim(),
                (args.employee_code ?? '').trim(),
                convertVietnameseToEnglish((args.employee_name)?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())?.trim() ?? '',
                (args.department ?? '').trim(),
                (args.position ?? '').trim(),
                (args.invalid_type ?? '').trim(),
                (args.reason ?? '').trim(),
                (args.reviewer ?? '').trim(),
                (args.invalid_date ?? ''),
                (args.real_time_attendance_data ?? ''),
                (args.validation_data ?? ''),
                (args.shift_from ?? ''),
                (args.shift_to ?? ''),
                (args.shift_break ?? ''),
                (args.validated ?? ''),
                (args.remarks ?? ''),
                (args.page_size ?? ''),
                (args.employee_id ? 1 : args.employee_code ? 1 : args.employee_name ? 1 : args.department ? 1 : args.position ? 1 : args.invalid_type ? 1 : args.reason ? 1 : args.reviewer ? 1 : args.invalid_date ? 1 : args.real_time_attendance_data ? 1 : args.validation_data ? 1 : args.shift_from ? 1 : args.shift_to ? 1 : args.shift_break ? 1 : args.validated ? 1 : args.remarks ? 1 : args.page ?? ''),
            ],
        },
    };
    try {
        const res = await request('post', url, requestBody);
        return {
            results: {
                data: mapShift(res?.result.result),
                total: res?.result.total_records,
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}
export interface IUpdateInvalidTimesheetArgs {
    id: number;
    reason: string;
    remarks: string;
    validated: string;
    invalid_type: string;
}
export const updateInvalidTimeeSheet = async (args: IUpdateInvalidTimesheetArgs) => {
    let url = INVALID_TIMESHEET.CREATE;
    let requestBody = {
        params: {
            args: [
                args.id ?? '',
                args.reason ?? '',
                args.remarks ?? '',
                args.validated ?? '',
                args.invalid_type ?? '',
            ],
        },
    };
    try {
        const res = await request('post', url, requestBody);
        return {
            results: res?.result,
        }
    } catch (error) {

    }
}