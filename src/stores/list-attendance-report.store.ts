import { createSlice } from '@reduxjs/toolkit';
interface IAttendanceList {
    listAttendance: any
}
const initialState: IAttendanceList = {
  listAttendance: [],
};

const listAttendanceSlice = createSlice({
  name: 'listAttendance',
  initialState,
  reducers: {
    setListAttendance(state, action) {
      return {
        ...state,
        listAttendance: action.payload
      };
    },
  },
});
export const { setListAttendance } = listAttendanceSlice.actions;

export default listAttendanceSlice.reducer;
