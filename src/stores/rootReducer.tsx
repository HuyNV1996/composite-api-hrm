import { combineReducers } from '@reduxjs/toolkit';
import tagsViewReducer from './tags-view.store';
import globalReducer from './global.store';
import userReducer from './user.store';
import loginReducer from './login.store';
import weeklyReducer from './weekly.store';
import shiftsReducer from './shifts.store';
import commonReducer from './common.store';
import scheduleReducer from './update-schedule.store';
import detailAttendanceReducer from './detail-attendance.store';
import listAttendanceReportStore from './list-attendance-report.store';
const rootReducer = combineReducers({
  tagsView: tagsViewReducer,
  user: userReducer,
  global: globalReducer,
  login: loginReducer,
  weekly: weeklyReducer,
  shifts: shiftsReducer,
  common: commonReducer,
  schedule: scheduleReducer,
  detailAttendance: detailAttendanceReducer,
  listAttendance: listAttendanceReportStore
});

export default rootReducer;
