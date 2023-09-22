import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { LoginState } from '@/interface/user/user';
import { getGlobalState } from '@/utils/getGloabal';

const initialState: LoginState = {
  ...getGlobalState(),
  name: localStorage.getItem('username') || '',
  job: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginInfo(state, action: PayloadAction<Partial<LoginState>>) {
      Object.assign(state, action.payload);
    },
    setisForgot(state, action: PayloadAction<Partial<LoginState>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setLoginInfo } = loginSlice.actions;

export default loginSlice.reducer;

export const storeLoginAsync = (payload: LoginState) => {
  return async (dispatch: Dispatch) => {
    localStorage.setItem('username', payload.name);
    localStorage.setItem('job', payload.job);
    dispatch(
      setLoginInfo({
        name: payload.name,
        job: payload.job,
      })
    );
    return true;
  };
};
