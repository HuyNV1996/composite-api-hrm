import { IShiftIdDtoResult } from "@/interface/shifts/shifts";

export const mapShift = (res:IShiftIdDtoResult[]) =>{
    return res && res.length >0 && res.map((item,index) =>{
        return {
            no: index +1,
            id: item?.id,
            name: item?.name,
            company: item?.company_id ,
            c_start_work_time: item?.c_start_work_time ,
            c_end_work_time: item?.c_end_work_time,
            c_start_rest_time: item?.c_start_rest_time,
            c_end_rest_time: item?.c_end_rest_time,
            total_work_time: item?.total_work_time,
            total_rest_time: item?.total_rest_time,
            breakfast: item?.breakfast,
            lunch: item?.lunch,
            dinner: item?.dinner,
            night: item?.night,
            shifts_eat: item?.shifts_eat,
            fix_rest_time: item?.fix_rest_time ,
            rest_shifts: item?.rest_shifts ,
            display_name: item?.display_name,
            rest_shift_id: item?.rest_shift_id,
            number_of_attendance: item?.number_of_attendance,
            day_work_value: item?.day_work_value,
            create_date: item?.create_date,
            write_date: item?.write_date,
            __last_update: item?.__last_update,
        }
    })
} 