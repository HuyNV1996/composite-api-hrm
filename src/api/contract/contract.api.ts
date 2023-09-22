import { IContractArgs, IUpdateContractArgs, ICreateContractArgs } from "@/interface/contract/contract"
import { request } from "../request"
import { DOMAIN_GET_CONTRACT, DOMAIN_IMPORT_CONTRACT_API } from "../constApi";
import { mapContract } from "./transform";

export const updateContractState = async () => {
    let url = DOMAIN_GET_CONTRACT.UPDATE;
    try {
        const res = await request('post', url);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const createContractByArgs = async (args: ICreateContractArgs) => {
    let url = DOMAIN_GET_CONTRACT.CREATE;
    let requestBody = {
        params: {
            args: [
                (args.name ?? '').trim(),
                args.employee_id ?? '',
                args.salary_rate ?? 0,
                args.date_sign ?? '',
                args.date_start ?? '',
                args.date_end ?? '',
                args.contract_type_id ?? '',
                args.resource_calendar_id ?? '',
                args.wage ?? 0,

            ]
        }
    }
    try {
        const res = await request('post', url, requestBody);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const getContractById = async (id: number) => {
    let url = DOMAIN_GET_CONTRACT.GETALL + `/${id}` + '/?query={id,name,employee_code,employee_id{id,name},job_title,department_id{id,name},resource_calendar_id{id,name},contract_type_id{id,name},date_start,date_end,date_sign,salary_rate,state,wage}';
    try {
        const res = await request('get', url);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const deleteContractById = async (id: number) => {
    let url = DOMAIN_GET_CONTRACT.GETALL + `/${id}`;
    try {
        const res = await request('delete', url);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const updateContract = async (args: IUpdateContractArgs) => {
    let url = DOMAIN_GET_CONTRACT.PUT;
    let requestBody = {
        params: {
            args: [
                args.id ?? '',
                (args.name ?? '').trim(),
                args.salary_rate ?? '',
                args.date_sign ?? '',
                args.date_start ?? '',
                args.date_end ?? '',
                args.contract_type_id ?? '',
                args.resource_calendar_id ?? '',
                args.wage ?? '',
            ]
        }
    }
    try {
        const res = await request('post', url, requestBody);
        return res
    } catch (error) {
        console.log(error)
    }
}
export const getContractByArgs = async (args: IContractArgs) => {
    let url = DOMAIN_GET_CONTRACT.GET;
    let requestBody = {
        params: {
            args: [
                (args.name ?? '').trim(),
                (args.employee_code ?? '').trim(),
                args.employee_id ?? '',
                args.department_id ?? '',
                (args.job_title ?? '').trim(),
                args.name ? 1 : args.employee_code ? 1 : args.department_id ? 1 : args.job_title ? 1 : args.state ? 1 : args.contract_type_id ? 1 : args.page ?? '',
                args.page_size ?? '',
                args.contract_type_id ?? '',
                (args.state ?? '').trim()
            ],
        }
    }
    try {
        const res = await request('post', url, requestBody);
        return {
            results: {
                data: mapContract(res?.result?.result),
                total: res?.result.total_records,
            }
        }

    } catch (error) {
        console.log(error)
    }
}