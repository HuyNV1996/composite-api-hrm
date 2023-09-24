import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { ILoginRes, LoginParams, Role, } from '@/interface/auth/login';
import { Locale, UserState } from '@/interface/auth/user';
import { createAsyncAction } from './utils';
import { getGlobalState } from '@/utils/getGloabal';
import { apiLogin } from '@/api/auth/api';

const initialState: UserState = {
  ...getGlobalState(),
  noticeCount: 0,
  locale: (localStorage.getItem('locale')! || 'en_US') as Locale,
  newUser: JSON.parse(localStorage.getItem('newUser')!) ?? true,
  logged: localStorage.getItem('t') ? true : false,
  menuList: [],
  username: localStorage.getItem('username') || '',
  role: (localStorage.getItem('username') || '') as Role,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserItem(state, action: PayloadAction<Partial<UserState>>) {
      const { username } = action.payload;
      if (username !== state.username) {
        localStorage.setItem('username', action.payload.username || '');
      }

      Object.assign(state, action.payload);
    },
  },
});

export const { setUserItem } = userSlice.actions;

export default userSlice.reducer;
export const loginAsync = (payload: LoginParams) => {
  return async () => {
    const body: LoginParams = {
      username: payload.username,
      password: payload.password,
    };
    const res = (await apiLogin(body)) as ILoginRes;
    if (res.code === 200 && res.status === 1) {
      localStorage.setItem('token', res.data.token);
      return true;
    }
    return false;
  };
};
export const logoutAsync = () => {
  return async (dispatch: Dispatch) => {
    localStorage.clear();
    dispatch(
      setUserItem({
        logged: false,
      })
    );

    return true;
  };
};
