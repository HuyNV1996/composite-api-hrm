import {
  IEmployeeeList,
  IFilterEmployeesArgs,
  IFilterEmployeesParams,
  IFilterShiftsParams,
} from '@/interface/employees/employee';
import { EMPLOYEELIST, SHIFTSLIST } from '../constApi';
import { request } from '../request';
import { mapEmployee, mapEmployeeDtoToEmployeee } from './transform';
import { convertVietnameseToEnglish } from '@/utils/common';
import moment, { Moment } from 'moment';
import exp from 'constants';

export const getListEmployeeV2 = async () => {
  let url = EMPLOYEELIST.GETALL;
  const res = await request('post', url, {
    params: {
      args: [
        '', '', '', '', '', '', '', ''
      ]
    }
  });
  return res;
};
export const deleteEmployee = async (id: number) => {
  let url = EMPLOYEELIST.DELETE + id;
  try {
    const res = await request('delete', url);
    return res;
  } catch (error) {
    console.log(error);
  }
}
export const createNewEmployee = async (data: IEmployeeeList) => {
  let url = EMPLOYEELIST.CREATE;
  let requestBody = {
    params: {
      data: {
        ...data,
      }
    }
  }
  try {
    const res = await request('post', url, requestBody);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const changeUserPassword = async (id: number, password: string) => {
  let url = EMPLOYEELIST.CHANGEPASSWORD;
  let requestBody = {
    params: {
      args: [id, password],
    }
  }
  try {
    const res = await request('post', url, requestBody);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const createUserFromEmployee = async (id: number) => {
  let url = EMPLOYEELIST.CREATEUSER;
  let requestBody = {
    params: {
      args: [id],
    }
  }
  try {
    const res = await request('post', url, requestBody);
    return res;
  } catch (error) {
    console.log(error);
  }
}
export const getEmployeeByArgs = async (args: IFilterEmployeesArgs) => {
  let url = EMPLOYEELIST.GETALL;
  let requestBody = {
    params: {
      args: [
        args.name ? convertVietnameseToEnglish(args.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLowerCase().trim() : '',
        (args.code ?? '').trim(),
        (args.mobile_phone ?? '').trim(),
        args.department_id ?? '',
        (args.job_title ?? '').trim(),
        (args.work_email ?? '').trim(),
        (args.severance_day ?? '').trim(),
        args.page_size ?? '',
        args.name ? 1 : args.code ? 1 : args.department_id ? 1 : args.work_email ? 1 : args.severance_day ? 1 : args.page ?? '',
      ]
    }
  }
  try {
    const res = await request('post', url, requestBody);
    return {
      results: {
        data: mapEmployee(res?.result.result),
        total: res?.result.total_records,
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export const getListShifts = (filters: IFilterShiftsParams) => {
  return request(
    'get',
    SHIFTSLIST.SEARCH +
    `&filter=[["name","like",{{${filters.name}}}],["company","like",{{${filters.job}}}],["department_id","like",{{${filters.department_id}}}],["manager","like",{{${filters.manager}}}]]`
  );
};
export const getEmployeeById = async (id: string) => {
  let listquery =
    '/?query={id,religion_id{id,name},work_phone,personal_email,social_insurance_number,coach_id{id,name},parent_id{id,name},part_time_job_title,employee_type,code,name,time_keeping_code,work_email,company_id{id,name},department_id{id,name},job_id{id,name},city_id{id,name},place_of_birth,district_id{id,name},ward_id{id,name},country_id{id,name},mobile_phone,private_email,work_email,gender,certificate,study_field,resource_calendar_id{id,name},workingday,severance_day,bank,bank_branch,bank_account_number,tax_id,head_of_department_check,general_management_check,department_secretary_check,resource_calendar_type,union_day,part_time_company_id{id,name},part_time_department_id{id,name},annual_leave_fund,birthday,gender,nation_id{id,name},marital,identification_id,issued_by_identification{id,name},current_place_of_residence,certificate,highest_degree,study_school,study_field,car_registration,license_plates,range_of_vehicle,car_color,district_vietnam_id{id,name,state_id},state_id{id,name,country_id},ward_vietnam_id{id,name,district_id},probationary_contract_termination_date,job_title,permanent_address,issued_by_identification_text,issued_by_identification_day,user_id{id}}'
  let url = `${EMPLOYEELIST.GETBYID}${id}${listquery}`;
  return request(
    'get', url
  )
}
export const putEmployeeById = async (id: number, data: any) => {
  let url = `${EMPLOYEELIST.GETBYID}${id}`;
  console.log(data);

  return await request('post', url, data);


};
