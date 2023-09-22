import { IJob } from "./job.api";

export const mapJob = (res: IJob[]) => {
    return res && res.length > 0 && res.map((item, index) => {
        return {
            no: index + 1,
            id: item?.id,
            name: item?.name,
            department_name: item?.department_id?.name,
            department_id: item?.department_id?.id,
            company_name: item?.company_id?.name,
            company_id: item?.company_id?.id,
            no_of_employee: item?.no_of_employee
        }
    })
}