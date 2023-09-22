import {
    IGetAttendanceParams,
  } from '@/interface/weeklyreport/type';
  import {
    GET_ATTENDANCE,
  } from '../constApi';
  import { request } from '../request';
import { mapTimeKeeping } from './transform';
  
  export const getTimeKeepingList = async (data: IGetAttendanceParams) => {
    const res = await request('post', GET_ATTENDANCE.SEARCH_PAGE, data);
    console.log(res);
    return {
        results: {
          data: mapTimeKeeping(res?.result?.result),
          total: res?.result?.count,
        },
  }
};