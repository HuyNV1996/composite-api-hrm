import { createSlice } from '@reduxjs/toolkit';
import { getGlobalState } from '@/utils/getGloabal';
import { ShiftsState } from '@/interface/weeklyreport/type';

const initialState: ShiftsState = {
  ...getGlobalState(),
  selectedShift: [],
  message: '',
};

const shiftsSlice = createSlice({
  name: 'shift',
  initialState,
  reducers: {
    setSelectedShifts(state, action) {
      const item = action.payload;
      const existItem = Array.isArray(state.selectedShift) ? state.selectedShift.find(x => x === item):true;
      var tempArr = []
      if(state.selectedShift.length >= 2){
        tempArr = [state.selectedShift[0], item];
      }
      else{
        tempArr = [...state.selectedShift, item];
      }
      const isCoupleShiftExitst = JSON.parse(
        localStorage.getItem('coupleShift')! ?? []
      )
        .toString()
        .includes(tempArr.join('/'));
      if (state.selectedShift.length >= 2 && !existItem){
        if(isCoupleShiftExitst){
          return {
            ...state,
            message: '',
            selectedShift: tempArr,
          };
        }
        else{
          return {
            ...state,
            message: '',
            selectedShift: item,
          };
        }
      }
      if (existItem) {
        return {
          ...state,
          message: '',
          selectedShift: Array.isArray(state.selectedShift) ?state.selectedShift.filter(x => x !== action.payload):[], //remove item
        };
      } else {
        if (state.selectedShift.length == 1 && !isCoupleShiftExitst) {
          return { selectedShift: [item], message: '' };
        }
        return {
          ...state,
          message: '',
          selectedShift: [...state.selectedShift, item], //add item
        };
      }
    },
    clearSelectedShifts() {
      return {
        selectedShift: [],
        message: '',
      };
    },
  },
});

export const { setSelectedShifts ,clearSelectedShifts} = shiftsSlice.actions;

export default shiftsSlice.reducer;
