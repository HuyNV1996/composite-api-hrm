import { updateScheduleState } from './../interface/weeklyreport/type';
import { createSlice } from '@reduxjs/toolkit';
import { getGlobalState } from '@/utils/getGloabal';

const initialState: updateScheduleState = {
  ...getGlobalState(),
  UpdateScheduleList: [],
};

const updateScheduleSlice = createSlice({
  name: 'updateSchedule',
  initialState,
  reducers: {
    setUpdateScheduleList(state, action) {
        return {
            ...state,
            UpdateScheduleList: action.payload
        }
    },
  },
});

export const { setUpdateScheduleList } = updateScheduleSlice.actions;

export default updateScheduleSlice.reducer;
