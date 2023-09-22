import { AttendanceDetailState } from '../interface/weeklyreport/type';
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { getGlobalState } from '@/utils/getGloabal';
import { getAttendanceDetailById } from '@/api/weeklyreport/weeklyreport';
import { setGlobalState } from './global.store';

const initialState: AttendanceDetailState = {
  ...getGlobalState(),
  is_leave_shift_data: {},
  invalid_timesheet: [],
  is_leave: false,
  list_leave: [],
};

const detailAttendanceSlice = createSlice({
  name: 'detailAttendance',
  initialState,
  reducers: {
    setDetailAttendanceItem(state, action) {
      return {
        ...state,
        list_leave: action.payload.list_leave,
        invalid_timesheet: action.payload.invalid_timesheet,
        is_leave: action.payload.is_leave,
        is_leave_shift_data: action.payload.is_leave_shift_data,
      };
      // Object.assign(state, action.payload);
    },
  },
});
export const { setDetailAttendanceItem } = detailAttendanceSlice.actions;

export default detailAttendanceSlice.reducer;
