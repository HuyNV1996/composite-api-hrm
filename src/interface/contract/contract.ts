export interface IContractArgs {
    name: string;
    employee_code: string;
    employee_id: number;
    department_id: number;
    job_title: string;
    page: number;
    page_size: number;
    contract_type_id: number;
    state: string;
}
export interface ICreateContractArgs {
    name: string;
    employee_id: number;
    salary_rate: number;
    date_start: string;
    date_end: string;
    date_sign: string;
    contract_type_id: number;
    resource_calendar_id: number;
    wage: number
}
export interface IUpdateContractArgs {
    id: number;
    name: string;
    salary_rate: number;
    date_start: string;
    date_end: string;
    date_sign: string;
    contract_type_id: number;
    resource_calendar_id: number;
    wage: number
}
export interface IContract {
    id: number;
    name: string;
    employee_code: string;
    employee_id: Array<any>;
    employee_name: string;
    department_id: Array<any>;
    department_name: string;
    job_title: string;
    contract_type_id: Array<any>;
    contract_type_name: string;
    state: string;
    date_start: string;
    date_end: string;
    resource_calendar_id: Array<any>;
    resource_caldendar_name: string;
    date_sign: string;
    salary_rate: number;
    wage:number
}
