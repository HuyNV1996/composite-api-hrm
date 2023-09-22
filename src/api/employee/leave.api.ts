import { ILeaveAllocationArgs, ILeaveManagement } from "@/interface/leaveManagement"
import { request } from "../request";
import { CREATE_LEAVE_ALLOCATION, GET_EMPLOYEE_LEAVE } from "../constApi";
import { ILeaveManagementArgs } from "@/interface/leaveManagement";
import { convertVietnameseToEnglish } from "@/utils/common";

export const createLeaveAllocation = async (args: ILeaveAllocationArgs) => {
    let url = CREATE_LEAVE_ALLOCATION.CREATE;
    let requestBody = {
        params: {
            args: [
                args?.type ?? "",
                args?.code ?? "",
                args?.date ?? "",
                args?.minutes ?? 0,
                args?.annual_leave_fund ?? 0,
            ]
        }
    }
    try {
        const res = await request('post', url, requestBody);
        return res;
    }
    catch (error) {
        console.log(error)
    }
}
export const getEmployeeLeaveList = async (args: ILeaveManagementArgs) => {
    let url = GET_EMPLOYEE_LEAVE.GETALL;
    let currentMonth = new Date().getMonth() - 1;
    let currentYear = new Date().getFullYear();
    currentMonth = parseInt(currentMonth.toString());
    currentYear = parseInt(currentYear.toString());
    let requestBody = {
        params: {
            args: [
                (args.month ?? currentMonth).toString(),
                (args.year ?? currentYear).toString(),
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
                data: mapLeave(res?.result, args),
                total: res?.result.length,
            }
        }
    }

    catch (error) {
        console.log(error)
    }
}
const mapLeave = (res: ILeaveManagement[], args: ILeaveManagementArgs) => {
    return res && res.length > 0 && res.map((item, index) => {
        let currentMonth = new Date().getMonth() - 1;
        let currentYear = new Date().getFullYear();
        currentMonth = parseInt(currentMonth.toString());
        currentYear = parseInt(currentYear.toString());
        const tham_nien = calculateThamNien(item?.workingday, args?.month ?? currentMonth, args?.year ?? currentYear).toFixed(1);
        const so_phep_tang_theo_tham_nien = calculatePhepTangTheoThamNien(Number(tham_nien), item?.leave_date).toFixed(0);
        const soNgayPhep = calculateTongPhep(item?.leave_date, item?.severance_day, args?.month ?? currentMonth, args?.year ?? currentYear)
        const tong_phep = calculateTongPhep(item?.leave_date, item?.severance_day, args?.month ?? currentMonth, args?.year ?? currentYear) * 480 + Number(so_phep_tang_theo_tham_nien) * 480;
        console.log({
            "currentMonth": args.month,
            "currentYear": args.year,
            "name": item?.name,
            "tong_phep": tong_phep,
            "tham_nien": tham_nien,
            "so_phep_tang_theo_tham_nien": so_phep_tang_theo_tham_nien,
            "api_tong_phep": item?.tong_phep,
            "api_tham_nien": item?.tham_nien,
        })
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
            tham_nien: item?.tham_nien ?? 0,
            tong_phep: item?.tong_phep ?? 0,
            phep_1: item?.phep_1 ?? 0,
            phep_2: item?.phep_2 ?? 0,
            phep_3: item?.phep_3 ?? 0,
            phep_4: item?.phep_4 ?? 0,
            phep_5: item?.phep_5 ?? 0,
            phep_6: item?.phep_6 ?? 0,
            phep_7: item?.phep_7 ?? 0,
            phep_8: item?.phep_8 ?? 0,
            phep_9: item?.phep_9 ?? 0,
            phep_10: item?.phep_10 ?? 0,
            phep_11: item?.phep_11 ?? 0,
            phep_12: item?.phep_12 ?? 0,
            tong_tham_nien: tham_nien,
            tong_phep_nam: tong_phep,
            phep_tang_theo_tham_nien: Number(so_phep_tang_theo_tham_nien).toFixed(0),
            phep_nam_con_lai: Number(item?.tong_phep) - Number(item?.phep_1 + item?.phep_2 + item?.phep_3 + item?.phep_4 + item?.phep_5 + item?.phep_6 + item?.phep_7 + item?.phep_8 + item?.phep_9 + item?.phep_10 + item?.phep_11 + item?.phep_12),
            so_ngay_phep: soNgayPhep,
        }
    })
}
const calculatePhepTangTheoThamNien = (tham_nien: number, leave_date: string) => {
    if (!leave_date) {
        return 0;
    }
    else {
        return tham_nien / 5
    }
}
const calculateTongPhep = (date_start: string, severance_day: string, targetMonth: number, targetYear: number) => {
    const lastDayOfMonth = new Date(targetYear, targetMonth, 0).getDate();
    const targetDate = new Date(targetYear, targetMonth - 1, lastDayOfMonth);
    const dateStart = new Date(date_start);
    const lastDayOfMonthDateStart = new Date(dateStart.getFullYear(), dateStart.getMonth() + 1, 0).getDate();
    const monthDiff = targetDate.getMonth() - dateStart.getMonth();
    const daysDiff = targetDate.getDate() - dateStart.getDate();
    const fraction_of_month = daysDiff / lastDayOfMonthDateStart;
    const result = monthDiff + fraction_of_month
    console.log({
        "daysDiff": daysDiff,
        "monthDiff": monthDiff,
        "fraction_of_month": fraction_of_month,
        "result": result,
        "dateStart": dateStart,
        "lastDayOfMonth": lastDayOfMonth,
    })
    const severanceDate = new Date(severance_day);
    if (!date_start) {
        return 0;
    }
    else if (!severance_day) {
        return result;
    }
    else {
        const severanceMonthDiff = severanceDate.getMonth() - dateStart.getMonth();
        const severanceDaysDiff = severanceDate.getDate() - dateStart.getDate();
        const fraction_of_month = severanceDaysDiff / lastDayOfMonthDateStart;
        return severanceMonthDiff + fraction_of_month;
    }

}
const calculateThamNien = (workingday: string, targetMonth: number, targetYear: number) => {
    const lastDayOfMonth = new Date(targetYear, targetMonth, 0).getDate();
    const targetDate = new Date(targetYear, targetMonth - 1, lastDayOfMonth);
    const workingDate = new Date(workingday);

    const timeDiffInMs = targetDate.getTime() - workingDate.getTime();
    const daysDifference = timeDiffInMs / (1000 * 3600 * 24);
    const tham_nien = daysDifference / 365;

    return tham_nien;
}

