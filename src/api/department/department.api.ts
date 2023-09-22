import { GET_DEPARTMENT } from "../constApi";
import { request } from "../request";
import { mapDeparment } from "./transform";

export interface IFilterDepartmentParams {
    id?: number;
    name?: string;
    total_employee?: number;
    manager_id?: number;
    parent_id?: number;
    company_id?: number;
}
export interface IDepartment {
    id: number;
    name: string;
    total_employee: number;
    manager_id: IId;
    parent_id: IId;
}
export interface IId {
    id?: number;
    name?: string;
}
export const getDepartmentWithFilter = async (filter: IFilterDepartmentParams) => {
    let url = GET_DEPARTMENT.GETALLFILTER + '?query={id,name,total_employee,manager_id{id,name},parent_id{id,name}}'
    let filterArr = [];
    url += '&filter=';
    filterArr.push(`["company_id","=",${localStorage.company_id}]`)
    if (filter.name) {
        filterArr.push(`["name","ilike","${filter.name?.trim()}"]`)
    }
    if (filter.manager_id) {
        filterArr.push(`["manager_id","=",${filter.manager_id}]`)
    }
    if (filter.parent_id) {
        filterArr.push(`["parent_id","=",${filter.parent_id}]`)
    }
    if (filterArr.length > 0) {
        url += '[' + [filterArr].toString() + ']';
    }
    console.log(url)
    const res = await request('get', url);
    return {
        results: {
            data: mapDeparment(res?.result),
            total: res?.count,
        }
    }
}
export const createDepartment = async (data: IFilterDepartmentParams) => {
    const res = await request('post', GET_DEPARTMENT.CREATE, {
        "params": {
            data

        }
    });
    return res;
}

export const updateDepartment = async (id: number,data: IFilterDepartmentParams) => {
    const res = await request('post', GET_DEPARTMENT.PUT + id, {
        "params": {
            data

        }
    });
    return res;
}
export const getDepartmentById = async (id: number) => {
    const res = await request('get', GET_DEPARTMENT.GETBYID + id + '/?query={id,name,parent_id,manager_id}');
    return res;
}
export const deleteDepartment = async (id: number) => {
    const res = await request('delete', GET_DEPARTMENT.DELETE + id);
    return res;
}