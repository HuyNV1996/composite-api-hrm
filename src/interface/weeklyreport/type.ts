export interface IGetAttendanceParams {
  params: IGetAttendanceContentParams;
}

export interface IGetAttendanceContentParams {
  args: string[];
}
export interface IUpdateScheduleParams {
  params: IUpdateScheduleContenttParams;
}

export interface IUpdateScheduleContenttParams {
  args: string[];
}
// =================================================================
export interface IUpdateAttendanceMoreParams {
  params: IUpdateAttendanceMoreContentParams;
}

export interface IUpdateAttendanceMoreContentParams {
  args: IUpdateAttendanceMoreContentArg[][];
}

export interface IUpdateAttendanceMoreContentArg {
  employee_code: string;
  date: string;
  shift_name: string;
}

export interface WeeklyReportState {
  id?: number;
  date?: string;
  employee_code?: string;
  total_work_time?: number;
  shift_start?: number;
  shift_end?: number;
  total_shift_work_time?: number;
  holiday_start?: number;
  holiday_end?: number;
  rest_start?: number;
  rest_end?: number;
  employee_name?: string;
  shift_name?: string;
  explanation?: boolean;
  is_explanation?: boolean;
  type_shifts?: number;
  on_time?: boolean;
  wrong_time?: boolean;
  rest_shifts?: boolean;
  empty_shifts?: boolean;
  extra_hour?: number;
  approval_hour?: number;
  company?: string;
  department?: string;
  job_title?: string;
  attendance_attempt_1?: string;
  attendance_attempt_2?: string;
  attendance_attempt_3?: string;
  attendance_attempt_4?: string;
  attendance_attempt_5?: string;
  attendance_attempt_6?: string;
  attendance_attempt_7?: string;
  attendance_attempt_8?: string;
  attendance_attempt_9?: string;
  attendance_attempt_10?: string;
  attendance_attempt_11?: string;
  attendance_attempt_12?: string;
  attendance_attempt_13?: string;
  attendance_attempt_14?: string;
  attendance_attempt_15?: string;
  last_attendance_attempt?: string;
  time_keeping_code?: string;
  resource_calendar: number;
  missing_checkin_break: boolean;
  split_shift: boolean;
}

export interface DataWeeklyType {
  key: React.ReactNode;
  company?: string;
  department?: string;
  employee_name?: string;
  code?: string;
  children?: DataWeeklyType[];
  rest_shifts?: boolean;
  day_0: any;
  day_1: any;
  day_2: any;
  day_3: any;
  day_4: any;
  day_5: any;
  day_6: any;
}

export interface ShiftsState {
  selectedShift: string[];
  message: string;
}

export interface ShiftListRes {
  items: ShiftItemRes[];
}
export interface ShiftItemRes {
  name: string;
  id: number;
}

// Get attendance
export interface AttendanceRes {
  jsonrpc: string;
  id: any;
  result: AttendanceResult;
}

export interface AttendanceResult {
  count: number;
  prev: any;
  current: number;
  next: any;
  total_pages: number;
  result: AttendanceResult1[];
}

export interface AttendanceResult1 {
  key: number;
  company: string;
  department: any;
  children: Children[];
}

export interface Children {
  key: number;
  company: string;
  department: string;
  children: Children2[];
}

export interface Children2 {
  number_of_attendance: number;
  enough_attendance: boolean;
  rest_shifts: boolean;
  empty_shifts: boolean;
  on_time: boolean;
  wrong_time: boolean;
  type_shifts: number;
  extra_hour: number;
  approval_hour: boolean;
  explanation: boolean;
  is_explanation: boolean;
  day_of_week: number;
  employee_name: string;
  employee_code: string;
  time_keeping_code: string;
  department: string;
  company: string;
  job_title: string;
  shift_name: boolean;
  shift_name_6: boolean;
  explaination_type: boolean;
  explaination_content: boolean;
  holiday_name: boolean;
  join_date: boolean;
  probation_completion_wage: boolean;
  is_worked: boolean;
  check_is_enough_time: boolean;
  split_shift: boolean;
  is_old: boolean;
  last_attendance_attempt: boolean;
  holiday_start: boolean;
  holiday_end: boolean;
  probation_wage_rate: number;
  standard_working_day: number;
  shift_start: number;
  shift_end: number;
  rest_start: number;
  rest_end: number;
  total_shift_work_time: number;
  ot_normal: number;
  ot_holiday: number;
  missing_checkin_break: boolean;
  missing_checkout: boolean;
  missing_checkin: boolean;
  night_hours_normal: number;
  night_hours_holiday: number;
  minute_worked_day_normal: number;
  minute_worked_day_holiday: number;
  attendance_late: number;
  leave_early: number;
  total_work_time: number;
  date: string;
  day_0: IDayData;
  day_1: IDayData;
  day_2: IDayData;
  day_3: IDayData;
  day_4: IDayData;
  day_5: IDayData;
  day_6: IDayData;
}

export interface IDayData {
  number_of_attendance: number;
  enough_attendance: boolean;
  rest_shifts: boolean;
  empty_shifts: boolean;
  on_time: boolean;
  wrong_time: boolean;
  type_shifts: number;
  extra_hour: number;
  approval_hour: boolean;
  explanation: boolean;
  is_explanation: boolean;
  day_of_week: number;
  employee_name: string;
  employee_code: string;
  time_keeping_code: string;
  department: string;
  company: string;
  job_title: string;
  shift_name: boolean;
  shift_name_6: boolean;
  explaination_type: boolean;
  explaination_content: boolean;
  holiday_name: boolean;
  join_date: boolean;
  probation_completion_wage: boolean;
  is_worked: boolean;
  check_is_enough_time: boolean;
  split_shift: boolean;
  is_old: boolean;
  last_attendance_attempt: boolean;
  holiday_start: boolean;
  holiday_end: boolean;
  probation_wage_rate: number;
  standard_working_day: number;
  shift_start: number;
  shift_end: number;
  rest_start: number;
  rest_end: number;
  total_shift_work_time: number;
  ot_normal: number;
  ot_holiday: number;
  missing_checkin_break: boolean;
  missing_checkout: boolean;
  missing_checkin: boolean;
  night_hours_normal: number;
  night_hours_holiday: number;
  minute_worked_day_normal: number;
  minute_worked_day_holiday: number;
  attendance_late: number;
  leave_early: number;
  total_work_time: number;
  date: string;
}

export interface IGetAttendanceDetails {
  params: IGetAttendanceDetailsParams;
}

export interface IGetAttendanceDetailsParams {
  args: number[];
}

//

export interface IUpdateSchedulingMoreResult {
  id: number;
  day_of_week: number;
  total_attendance: number;
  create_uid: number;
  write_uid: number;
  employee_name: string;
  employee_code: string;
  time_keeping_code: string;
  department: string;
  company: string;
  job_title: string;
  shift_name: string;
  explaination_type: string;
  explaination_content: string;
  holiday_name: string;
  date: string;
  join_date: any;
  probation_completion_wage: any;
  is_worked: boolean;
  check_is_enough_time: boolean;
  missing_checkin_break: boolean;
  missing_checkout: boolean;
  missing_checkin: boolean;
  split_shift: boolean;
  is_holiday: boolean;
  is_old: boolean;
  attendance_attempt_1: string;
  attendance_attempt_2: string;
  attendance_attempt_3: string;
  attendance_attempt_4: any;
  attendance_attempt_5: any;
  attendance_attempt_6: any;
  attendance_attempt_7: any;
  attendance_attempt_8: any;
  attendance_attempt_9: any;
  attendance_attempt_10: any;
  attendance_attempt_11: any;
  attendance_attempt_12: any;
  attendance_attempt_13: any;
  attendance_attempt_14: any;
  attendance_attempt_15: any;
  last_attendance_attempt: string;
  holiday_start: string;
  holiday_end: string;
  create_date: string;
  write_date: string;
  surplus_minute_work: number;
  probation_wage_rate: number;
  standard_working_day: any;
  shift_start: number;
  shift_end: number;
  rest_start: number;
  rest_end: number;
  total_shift_work_time: number;
  ot_normal: number;
  ot_holiday: number;
  night_hours_normal: number;
  night_hours_holiday: number;
  minute_worked_day_normal: number;
  minute_worked_day_holiday: number;
  attendance_late: number;
  leave_early: number;
  total_work_time: number;
  severance_day: any;
  night_shift: any;
}

export interface updateScheduleState {
  UpdateScheduleList: IUpdateSchedulingMoreResult[];
}

export interface AttendanceDetailByIdRes {
  jsonrpc: string;
  id: any;
  result: AttendanceDetailByIdResult;
}
export interface AttendanceDetailByIdResult {
  is_leave_shift_data: IsLeaveShiftData;
  invalid_timesheet: IInvalidTimesheet[];
  is_leave: boolean;
  list_leave: IListleave[];
}
// Đơn
export interface IsLeaveShiftData { }

// Giải trình
export interface ICreateInvalidTimesheetArgs {
  employee_code: number;
  invalid_date: string;
  invalid_type: string;
  shift_from: string;
  shift_to: string,
  shift_break: string;
  real_time_attendance_data: string;
  validation_data: string;
  reason: string;
  remarks: string;
  owner: number;
  reviewer: number;
  validated: string;
}
export interface IInvalidTimesheet {
  id: number;
  employee_id: any;
  employee_code: string;
  employee_name: string;
  department: string;
  position: string;
  invalid_type: string;
  reason: string;
  reviewer: any;
  invalid_date: string;
  real_time_attendance_data: string;
  validation_data: string;
  shift_from: string;
  shift_to: string;
  shift_break: string;
  validated: string;
  remarks: string;
  page_size: number;
  page: number;
  create_date: string;
}
export interface IListleave {
  id: number;
  reason: any;
  remarks: string;
  validated: string;
  employee_id: string;
  employee_code: string;
  department: string;
  position: boolean;
  invalid_date: string;
  invalid_type: string;
  shift_from: string;
  shift_to: string;
  shift_break: any;
  real_time_attendance_data: string;
  validation_data: string;
  content: boolean;
  time: string;
}

export interface AttendanceDetailState extends IDetailAttendanceByIdResult { }

export interface IListLeaveRes {
  jsonrpc: string;
  id: number;
  result: IListLeaveResult[];
}

export interface IListLeaveResult {
  name: string;
  id: number;
  data?: any;
}

// Tree Selector
export interface IItemData {
  name: string;
  id: number;
  coefficient: number;
}

export interface IItem {
  name: string;
  id: number;
  type: string | boolean;
  data: IItemData[] | null;
}

export interface ITreeNode {
  title: string;
  value: string;
  children: ITreeNode[];
}

// Attendance details
export interface IDetailAttendanceByIdRes {
  jsonrpc: string;
  id: number;
  result: IDetailAttendanceByIdResult;
}

export interface IDetailAttendanceByIdResult {
  is_leave_shift_data: IsLeaveShiftData;
  invalid_timesheet: InvalidTimesheet[];
  is_leave: boolean;
  list_leave: IListLeave[];
}

export interface IsLeaveShiftData { }

export interface InvalidTimesheet {
  last_attendance_attempt: string;
  first_attendance_attempt: string;
  id: number;
  reason: boolean;
  remarks: string;
  validated: string;
  employee_id: number;
  employee_name: string;
  employee_code: string;
  department: string;
  position: boolean;
  invalid_date: string;
  invalid_type: string;
  shift_from: string;
  shift_to: string;
  shift_break: boolean;
  real_time_attendance_data: string;
  validation_data: string;
  content: boolean;
  create_date: string;
}

export interface IListLeave {
  id: number;
  created_date: string;
  from_date: string;
  holiday_status_id: HolidayStatusId;
  state: string;
  employee_id: EmployeeId;
  date_to: string;
  config_id: ConfigId;
  for_reasons: string;
  reasons: string;
  time: number;
  minutes: number;
}

export interface ConfigId {
  id: number | boolean;
  name: string | boolean;
}

export interface HolidayStatusId {
  id: number;
  name: string;
  type: string;
}

export interface EmployeeId {
  id: number;
  name: string;
}

export interface historyShiftEditBody {
  params: historyShiftEditParams
}
export interface historyShiftEditParams {
  args: string[]
}
