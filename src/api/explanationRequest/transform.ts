import { IExplanationColumn } from "@/interface/explanation/explanation"

export const mapShift = (res:IExplanationColumn[]) =>{
    return res && res.length >0 && res.map((item,index) =>{
        return {
            no: index +1,
            time_keeping_code: item?.time_keeping_code,
            employee_code: item?.employee_code,
            employee_name: item?.employee_name,
            department: item?.department,
            job_title: item?.job_title,
            date: item?.date,
            shift_name: item?.shift_name,
            attendance_attempt_1: item?.attendance_attempt_1,
            attendance_attempt_2: item?.attendance_attempt_2,
            attendance_attempt_3: item?.attendance_attempt_3,
            attendance_attempt_4: item?.attendance_attempt_4,
            attendance_attempt_5: item?.attendance_attempt_5,
            attendance_attempt_6: item?.attendance_attempt_6,
            attendance_attempt_7: item?.attendance_attempt_7,
            attendance_attempt_8: item?.attendance_attempt_8,
            attendance_attempt_9: item?.attendance_attempt_9,
            attendance_attempt_10: item?.attendance_attempt_10,
            attendance_attempt_11: item?.attendance_attempt_11,
            attendance_attempt_12: item?.attendance_attempt_12,
            attendance_attempt_13: item?.attendance_attempt_13,
            attendance_attempt_14: item?.attendance_attempt_14,
            attendance_attempt_15: item?.attendance_attempt_15,
            last_attendance_attempt: item?.last_attendance_attempt,
            attendance_late: item?.attendance_late,
            leave_early: item?.leave_early,
            total_work_time: item?.total_work_time
            
        }
    })
} 