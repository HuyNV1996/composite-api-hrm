import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getGlobalState } from '@/utils/getGloabal';
import { WeeklyReportState } from '@/interface/weeklyreport/type';

const initialState: WeeklyReportState = {
  ...getGlobalState(),
  date: '',
  employee_code: '',
  rest_start: 0,
  rest_end: 0,
  total_shift_work_time: 0,
  total_work_time: 0,
  holiday_start: 0,
  holiday_end: 0,
  employee_name: '',
  shift_name: '-',
  explanation: false,
  is_explanation: false,
  type_shifts: 1,
  on_time: false,
  wrong_time: false,
  rest_shifts: false,
  empty_shifts: false,
  extra_hour: 0,
  approval_hour: 0,
  department: '',
  job_title: '',
  id: 0,
  company: '',
  resource_calendar: 0,
  attendance_attempt_1: '',
  attendance_attempt_2: '',
  attendance_attempt_3: '',
  attendance_attempt_4: '',
  attendance_attempt_5: '',
  attendance_attempt_6: '',
  attendance_attempt_7: '',
  attendance_attempt_8: '',
  attendance_attempt_9: '',
  attendance_attempt_10: '',
  attendance_attempt_11: '',
  attendance_attempt_12: '',
  attendance_attempt_13: '',
  attendance_attempt_14: '',
  attendance_attempt_15: '',
  last_attendance_attempt: '',
  missing_checkin_break: false,
  split_shift: false,
};

const weeklySlice = createSlice({
  name: 'weekly',
  initialState,
  reducers: {
    setWeeklyData(state, action) {
      return state = { ...action.payload }
    },
  },
});

export const { setWeeklyData } = weeklySlice.actions;

export default weeklySlice.reducer;
