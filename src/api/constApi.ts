const DOMAIN_EMPLOYEE = 'api/hr.employee';
const DOMAIN_SHIFTS = 'api/shifts';
const DOMAIN_EXPLANATION_REQUEST = 'api/hr.apec.attendance.report';
const DOMAIN_GET_ATTENDANCE = 'object/hr.apec.attendance.report';
const DOMAIN_GET_ATTENDANCE_PAGE = 'page/get_attendance_reportv4';
const DOMAIN_LIST_SHIFTS = 'api';
const DOMAIN_SCHEDULING = 'object';
const DOMAIN_IMPORT_CONTRACT = 'object/hr.contract_import';
const DOMAIN_LIST_LEAVE = 'object/hr.leave';
const DOMAIN_GET_ATTENDANCE_BY_ID = 'object/hr.attendance';
const DOMAIN_EXPORT = 'object/hr.upload.attendance';
const DOMAIN_INVALID_TIMESHEET = 'object/hr.invalid.timesheet';
const Domain_GET_COMPANY = 'api/res.company';
const DOMAIN_GET_HR_LEAVE_TYPE = 'api/hr.leave.type';
const DOMAIN_HISTORY_SHIFT_EDIT =
  '/object/shift.edit.history/get_shift_edit_history_by_shift_id/';
const DOMAIN_GET_DEPARTMENT = 'api/hr.department';
const DOMAIN_HR_LEAVE_TYPE_LIST = 'api/hr.leave.type';
const DOMAIN_GET_JOB_LIST = 'api/hr.job';
const DOMAIN_GET_LIST_WORK_HOUR = 'api/resource.calendar';
const DOMAIN_GET_COUNTRY_LIST = 'api/res.country';
const DOMAIN_GET_CITY_LIST = 'api/res.city';
const DOMAIN_GET_RELIGION_LIST = 'api/religion';
const DOMAIN_GET_NATION_LIST = 'api/nation';
const DOMAIN_GET_STATE_LIST = 'api/res.country.state';
const DOMAIN_GET_DISTRICT_LIST = 'api/res.country.district';
const DOMAIN_GET_WARD_LIST = 'api/res.country.ward';
const DOMAIN_GET_EMPLOYEE_LEAVE = 'object/hr.employee/get_employee';
const DOMAIN_CREATE_LEAVE_ALLOCATION =
  'object/hr.leave.allocation/create_leave_allocation';
const DOMAIN_GET_EMPLOYEE_BY_LEAVE = 'object/hr.employee/get_employee_by_leave';
const DOMAIN_CONTRACT = 'object/hr.contract';
//
const DOMAIN_LUCKY = 'users';
export const DOMAIN_IMPORT_LUCKY = {
  IMPORT: `${DOMAIN_LUCKY}`,
};
export const DOMAIN_IMPORT_CONTRACT_API = {
  IMPORT: `upload_contract_file`,
};

export const DOMAIN_IMPORT_REPORT_SHIFT = {
  IMPORT: `upload_import_shift`,
};

const DOMAIN_CONTRACT_TYPE = 'api/hr.contract.type';
export const DOMAIN_GET_CONTRACT_TYPE = {
  GETALL: `${DOMAIN_CONTRACT_TYPE}/?query={id,name}`,
};
export const DOMAIN_GET_CONTRACT = {
  GET: `${DOMAIN_CONTRACT}/get_contracts`,
  PUT: `${DOMAIN_CONTRACT}/update_contract_by_args`,
  GETALL: `api/hr.contract`,
  CREATE: `${DOMAIN_CONTRACT}/create_contract_by_args`,
  UPDATE: `${DOMAIN_CONTRACT}/update_contract`,
};

export const GET_EMPLOYEE_BY_LEAVE = {
  GETALL: `${DOMAIN_GET_EMPLOYEE_BY_LEAVE}`,
};
export const CREATE_LEAVE_ALLOCATION = {
  CREATE: `${DOMAIN_CREATE_LEAVE_ALLOCATION}`,
};
export const GET_EMPLOYEE_LEAVE = {
  GETALL: `${DOMAIN_GET_EMPLOYEE_LEAVE}`,
};
export const GET_LIST_WARD = {
  GETALL: `${DOMAIN_GET_WARD_LIST}/?query={id,name,district_id{id,name}}`,
};
export const GET_DISTRICT_LIST = {
  GETALL: `${DOMAIN_GET_DISTRICT_LIST}/?query={id,name,state_id{id,name}}`,
};
export const GET_STATE_LIST = {
  GETALL: `${DOMAIN_GET_STATE_LIST}/?query={id,name,country_id{id,name}}`,
};
export const GET_NATION_LIST = {
  GETALL: `${DOMAIN_GET_NATION_LIST}/?query={id,name}`,
};

export const GET_RELIGION_LIST = {
  GETALL: `${DOMAIN_GET_RELIGION_LIST}/?query={id,name}`,
};
export const GET_CITY_LIST = {
  GETALL: `${DOMAIN_GET_CITY_LIST}/?query={id,name}`,
};
export const GET_COUNTRY_LIST = {
  GETALL: `${DOMAIN_GET_COUNTRY_LIST}/?query={id,name}`,
};
export const GET_LIST_WORK_HOUR = {
  GETALL: `${DOMAIN_GET_LIST_WORK_HOUR}/?query={id,name}`,
};
export const GET_JOB_LIST = {
  GETALL: `${DOMAIN_GET_JOB_LIST}/?query={id,name,department_id{id,name},company_id{id,name},no_of_employee}&filter=[["company_id","=",${localStorage.company_id}]]`,
  GETWITHFILTER: `${DOMAIN_GET_JOB_LIST}/?query={id,name,department_id{id,name},company_id{id,name},no_of_employee}`,
};
export const GET_INVALID_TIMESHEET_BY_ARGS = {
  GETALL: `${DOMAIN_INVALID_TIMESHEET}/get_invalid_timesheets`,
  DELETE: `${DOMAIN_INVALID_TIMESHEET}/delete_invalid_timesheet_by_id`,
  CREATE: `${DOMAIN_INVALID_TIMESHEET}/create_invalid_timesheet`,
};

export const GET_HR_LEAVE_TYPE = {
  GETALL: `${DOMAIN_GET_HR_LEAVE_TYPE}/?query={id,name}`,
};

export const GET_COMPANY = {
  GETALL: `${Domain_GET_COMPANY}/?query={id,name}`,
};

export const GET_DEPARTMENT = {
  GETALL: `${DOMAIN_GET_DEPARTMENT}/?query={id,name}`,
  GETALLFILTER: `${DOMAIN_GET_DEPARTMENT}/`,
  CREATE: `${DOMAIN_GET_DEPARTMENT}/create`,
  PUT: `${DOMAIN_GET_DEPARTMENT}/`,
  GETBYID: `${DOMAIN_GET_DEPARTMENT}/`,
  DELETE: `${DOMAIN_GET_DEPARTMENT}/`,
};

export const EMPLOYEELIST = {
  SEARCH: `${DOMAIN_EMPLOYEE}/?query={id,religion_id{id,name},employee_type,work_phone,coach_id{id,name},parent_id{id,name},code,name,time_keeping_code,work_email,company_id{id,name},department_id{id,name},job_id{id,name},city_id{id,name},place_of_birth,district_id{id,name},ward_id{id,name},country_id{id,name},mobile_phone,private_email,work_email,gender,certificate,study_field,resource_calendar_id{id,name},workingday,severance_day,bank,bank_branch,bank_account_number,tax_id,head_of_department_check,general_management_check,department_secretary_check,resource_calendar_type,union_day,part_time_company_id{id,name},part_time_department_id{id,name},part_time_job_title,annual_leave_fund,birthday,gender,nation_id{id,name},marital,identification_id,issued_by_identification{id,name},current_place_of_residence,certificate,highest_degree,study_school,study_field,car_registration,license_plates,range_of_vehicle,car_color,district_vietnam_id{id,name,state_id},state_id{id,name,country_id},ward_vietnam_id{id,name,district_id},probationary_contract_termination_date,job_title,probationary_salary_rate,date_sign}`,
  GETBYID: `${DOMAIN_EMPLOYEE}/`,
  GETALL: `/object/hr.employee/get_employee_list`,
  CREATEUSER: `/object/hr.employee/create_user_from_employee`,
  CHANGEPASSWORD: `/object/hr.employee/change_user_password_general_manager`,
  CREATE: `${DOMAIN_EMPLOYEE}/create`,
  DELETE: `${DOMAIN_EMPLOYEE}/`,
};
export const SHIFTSLIST = {
  SEARCH: `${DOMAIN_SHIFTS}/?query={id,name,company_id,c_start_work_time,c_end_work_time,c_start_rest_time,c_end_rest_time,total_work_time,total_rest_time,shifts_eat,fix_rest_time,rest_shifts,display_name,create_date, breakfast , lunch , dinner , night , rest_shift_id ,number_of_attendance,day_work_value,create_date,write_date,__last_update}`,
  CREATE: `${DOMAIN_SHIFTS}/create`,
  UPDATE: `${DOMAIN_SHIFTS}`,
  DELETE: `${DOMAIN_SHIFTS}`,
};
export const EXPLANATION_REQUEST = {
  SEARCH: `${DOMAIN_EXPLANATION_REQUEST}`,
};
export const GET_ATTENDANCE = {
  SEARCH: `${DOMAIN_GET_ATTENDANCE}/get_attendance_reportv3`,
  SEARCH_PAGE: `${DOMAIN_GET_ATTENDANCE_PAGE}`,
  CALCULATE: `${DOMAIN_GET_ATTENDANCE}/calculate_attendance_reportv2`,
};
export const SHIFTS = {
  GETALL: `${DOMAIN_LIST_SHIFTS}/shifts`,
  SEARCH: `${DOMAIN_LIST_SHIFTS}/shifts/?query={id,name,company_id,c_start_work_time,c_end_work_time,c_start_rest_time,c_end_rest_time,total_work_time,total_rest_time,shifts_eat,fix_rest_time,rest_shifts,display_name,create_date, number_of_attendance,day_work_value,create_date,write_date,__last_update}`,
};
export const HISTORY_SHIFT_EDIT = {
  SEARCH: `${DOMAIN_HISTORY_SHIFT_EDIT}?query={user_id{id,name},old_value_text,new_value_text,shift_id,create_date}`,
};
export const UPDATE_SCHEDULING = {
  SEARCH: `${DOMAIN_SCHEDULING}/update_employees_scheduling`,
  UPDATE_ARR: `${DOMAIN_SCHEDULING}/hr.apec.attendance.report/update_multiple_report `,
};

export const GET_LIST_LEAVE = {
  GETALL: `${DOMAIN_LIST_LEAVE}/get_list_leave`,
  CREATE: `${DOMAIN_LIST_LEAVE}/created_leave_by_employee_id`,
  SEARCH: `page/${DOMAIN_LIST_LEAVE}/get_leave_list`,
  UPDATE: `${DOMAIN_LIST_LEAVE}/update_sate_leave`,
  DELETE: `api/hr.leave/`,
};
export const GET_ATTENDANCE_DETAIL_BY_ID = {
  SEARCH: `${DOMAIN_GET_ATTENDANCE_BY_ID}/get_attendance_detail_by_id`,
};

export const EXPORT_EXCEL = {
  GETALL: `${DOMAIN_EXPORT}/json_hr_upload_attendance`,
};
export const INVALID_TIMESHEET = {
  CREATE: `${DOMAIN_INVALID_TIMESHEET}/update_invalid`,
};

export const GET_LEAVE_TYPE = {
  GETALL: `${DOMAIN_HR_LEAVE_TYPE_LIST}/?query={id,name,type}`,
};
