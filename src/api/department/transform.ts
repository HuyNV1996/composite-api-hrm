import { IDepartment, IFilterDepartmentParams } from "./department.api";

export const mapDeparment = (res: IDepartment[]) => {
    return res && res.length >0 && res.map((item,index) => {
        return {
            no: index +1,
            id: item?.id,
            name: item?.name,
            total_employee: item?.total_employee,
            manager_id: item?.manager_id?.id,
            manager_name: item?.manager_id?.name,
            parent_id: item?.parent_id?.id,
            parent_name: item?.parent_id?.name,
        }
    })
}