export interface IEmployeeByLeave {
    id: number;
    code: string;
    name: string;
    department_name: string;
    workingday: string;
    severance_day: string;
    position: string;
    date_start: string;
    leave_date: string;
    "tang_bu_tv_1": number,
    "tang_bu_ct_1": number,
    "tang_ca_tv_1": number,
    "tang_ca_ct_1": number,
    "su_dung_tv_1": number,
    "su_dung_ct_1": number,
    "tang_bu_tv_2": number,
    "tang_bu_ct_2": number,
    "tang_ca_tv_2": number,
    "tang_ca_ct_2": number,
    "su_dung_tv_2": number,
    "su_dung_ct_2": number,
    "tang_bu_tv_3": number,
    "tang_bu_ct_3": number,
    "tang_ca_tv_3": number,
    "tang_ca_ct_3": number,
    "su_dung_tv_3": number,
    "su_dung_ct_3": number,
    "tang_bu_tv_4": number,
    "tang_bu_ct_4": number,
    "tang_ca_tv_4": number,
    "tang_ca_ct_4": number,
    "su_dung_tv_4": number,
    "su_dung_ct_4": number,
    "tang_bu_tv_5": number,
    "tang_bu_ct_5": number,
    "tang_ca_tv_5": number,
    "tang_ca_ct_5": number,
    "su_dung_tv_5": number,
    "su_dung_ct_5": number,
    "tang_bu_tv_6": number,
    "tang_bu_ct_6": number,
    "tang_ca_tv_6": number,
    "tang_ca_ct_6": number,
    "su_dung_tv_6": number,
    "su_dung_ct_6": number,
    "tang_bu_tv_7": number,
    "tang_bu_ct_7": number,
    "tang_ca_tv_7": number,
    "tang_ca_ct_7": number,
    "su_dung_tv_7": number,
    "su_dung_ct_7": number,
    "tang_bu_tv_8": number,
    "tang_bu_ct_8": number,
    "tang_ca_tv_8": number,
    "tang_ca_ct_8": number,
    "su_dung_tv_8": number,
    "su_dung_ct_8": number,
    "tang_bu_tv_9": number,
    "tang_bu_ct_9": number,
    "tang_ca_tv_9": number,
    "tang_ca_ct_9": number,
    "su_dung_tv_9": number,
    "su_dung_ct_9": number,
    "tang_bu_tv_10": number,
    "tang_bu_ct_10": number,
    "tang_ca_tv_10": number,
    "tang_ca_ct_10": number,
    "su_dung_tv_10": number,
    "su_dung_ct_10": number,
    "tang_bu_tv_11": number,
    "tang_bu_ct_11": number,
    "tang_ca_tv_11": number,
    "tang_ca_ct_11": number,
    "su_dung_tv_11": number,
    "su_dung_ct_11": number,
    "tang_bu_tv_12": number,
    "tang_bu_ct_12": number,
    "tang_ca_tv_12": number,
    "tang_ca_ct_12": number,
    "su_dung_tv_12": number,
    "su_dung_ct_12": number
}
export interface ILeaveManagementArgs {
    month: number;
    year: number;
    name: string;
    code: string;
    department_name: string;
    position: string;
}
export interface ILeaveManagement {
    id: number;
    code: string;
    name: string;
    department_name: string;
    workingday: string;
    severance_day: string;
    position: string;
    date_start: string;
    leave_date: string;
    tham_nien: string;
    tong_phep: string
    phep_1: number;
    phep_2: number;
    phep_3: number;
    phep_4: number;
    phep_5: number;
    phep_6: number;
    phep_7: number;
    phep_8: number;
    phep_9: number;
    phep_10: number;
    phep_11: number;
    phep_12: number;
    tong_tham_nien: number;
    tong_phep_nam: number;
}
export interface ILeaveAllocationArgs {
    type: string;
    code: string;
    date: string;
    minutes: number;
    annual_leave_fund: number;
}