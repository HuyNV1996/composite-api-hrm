import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getGlobalState } from '@/utils/getGloabal';
import { CommonState, ICellActive } from '@/interface/common/type';
import { checkObjectExists } from '@/utils/common';

const initialState: CommonState = {
  ...getGlobalState(),
  cellsActive: [],
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setCellsActive(state, action) {
      const cell = action.payload;
      const isExistedItem = checkObjectExists(state.cellsActive, {
        code: cell.code,
        date: cell.date,
        id: cell.id,
      });
      if (isExistedItem) {
        return {
          ...state,
          cellsActive: state.cellsActive.filter(
            item =>
              item.code !== cell.code ||
              item.date !== cell.date ||
              item.id !== cell.id
          ),
        };
      } else {
        return {
          ...state,
          cellsActive: [...state.cellsActive, cell], //add item
        };
      }
    },
    setACellActive(state, action){
      const cell = action.payload;
      const isExistedItem = checkObjectExists(state.cellsActive, {
        code: cell.code,
        date: cell.date,
        id: cell.id,
      });
      if (isExistedItem) {
        return {
          ...state,
          cellsActive: state.cellsActive.filter(
            item =>
              item.code !== cell.code ||
              item.date !== cell.date ||
              item.id !== cell.id
          ),
        };
      } else {
        return {
          ...state,
          cellsActive: [cell], //add item
        };
      }
    },
    clearCellsActive() {
      return {
        cellsActive: [],
      };
    },
  },
});

export const { setCellsActive, clearCellsActive,setACellActive } = commonSlice.actions;

export default commonSlice.reducer;
