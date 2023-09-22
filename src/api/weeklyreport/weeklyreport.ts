import {
  IGetAttendanceDetails,
  IGetAttendanceParams,
  IUpdateAttendanceMoreParams,
  IUpdateScheduleParams,
} from '@/interface/weeklyreport/type';
import {
  GET_ATTENDANCE,
  GET_ATTENDANCE_DETAIL_BY_ID,
  SHIFTS,
  UPDATE_SCHEDULING,
  GET_LIST_LEAVE,
  INVALID_TIMESHEET,
} from '../constApi';
import { request } from '../request';
import { mapLeaveListView } from './transform';
export const deleteLeave = async (id: number) => {
  return await request('delete', GET_LIST_LEAVE.DELETE + id);
}
export const getAttendanceReport = async (data: IGetAttendanceParams) => {
  return await request('post', GET_ATTENDANCE.SEARCH, data);
};

export const calculateAttendanceReport = async (data: IGetAttendanceParams) => {
  return await request('post', GET_ATTENDANCE.CALCULATE, data);
};

export const getListShifts = async () => {
  return await request('get', SHIFTS.GETALL);
};

export const updateEmployeeScheduling = async (data: IUpdateScheduleParams) => {
  return await request('post', UPDATE_SCHEDULING.SEARCH, data);
};

export const updateEmployeeSchedulingMore = async (
  data: IUpdateAttendanceMoreParams
) => {
  return await request('post', UPDATE_SCHEDULING.UPDATE_ARR, data);
};

export const getAttendanceDetailById = async (data: IGetAttendanceDetails) => {
  return await request('post', GET_ATTENDANCE_DETAIL_BY_ID.SEARCH, data);
};

export const getListLeave = async (data: any) => {
  return await request('post', GET_LIST_LEAVE.GETALL, data);
};
export const searchListLeave = async (data: any) => {
  const res =  await request('post', GET_LIST_LEAVE.SEARCH, data);
  return {
    results: {
      data: mapLeaveListView(res.result.result),
      total: res?.result.count,
    },
  };
};
export const createLeaveByEmployeeId = async (data: any) => {
  return await request('post', GET_LIST_LEAVE.CREATE, data);
};

export const createExplainLeave = async (data: any) => {
  return await request('post', INVALID_TIMESHEET.CREATE, data);
};