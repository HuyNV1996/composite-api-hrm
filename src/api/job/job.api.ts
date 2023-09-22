import { GET_JOB_LIST } from "../constApi";
import { IId } from "../department/department.api";
import { request } from "../request";
import { mapJob } from './transform';

export interface IFilterJobParams {
    id?: number;
    name?: string;
    department_id?: number;
    company_id?: number;
    no_of_employee?: number;
}
export interface IJob {
    id: number;
    name: string;
    department_id: IId;
    company_id: IId;
    no_of_employee: number;
}
export const getJobWithFilter = async (filter: IFilterJobParams) => {
    let url = GET_JOB_LIST.GETWITHFILTER
    let filterArr = [];
    url += '&filter=';
    filterArr.push(`["company_id","=",${localStorage.company_id}]`)
    if (filter.name) {
        filterArr.push(`["name","ilike","${filter.name?.trim()}"]`)
    }
    if (filter.department_id) {
        filterArr.push(`["department_id","=",${filter.department_id}]`)
    }
    if (filterArr.length > 0) {
        url += '[' + [filterArr].toString() + ']';
    }
    const res = await request('get', url);
    return {
        results: {
            data: mapJob(res?.result),
            total: res?.count,
        }
    }

}
