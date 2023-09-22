import { IEmployeeeArgsResult, IEmployeeeDtoResult } from "@/interface/employees/employee"
import moment from "moment";

export const mapEmployeeDtoToEmployeee = (res: IEmployeeeDtoResult[]) => {
    return res && res.length > 0 && res.map((item, index) => {
        const ward = item.ward_id.name !== 'false' ? item.ward_id.name + ',' : '';
        const district = item.district_id.name !== 'false' ? item.district_id.name + ',' : '';
        const city = item.city_id.name !== 'false' ? item.city_id.name + ',' : '';
        return {
            no: index + 1,
            address: `${ward}${district}${city} ` || '-',
            time_keeping_code: item.time_keeping_code,
            key: item.id,
            code: item.code,
            name: item.name,
            job_title: item.job_title || '-',
            mobile_phone: item.mobile_phone || '-',
            work_email: item.work_email || '-',
            department: item?.department_id.name || '-',
            job: item.job_id.name || '-',
            company_id: item?.company_id.name || '-',
            parent_id: item?.parent_id.name || '-',
            coach_id: item?.coach_id.name || '-',
            work_phone: item?.work_phone || '-',
            resource_calendar: item?.resource_calendar_id.name || '-',
            severance_day: item.severance_day ? moment(item.severance_day) : '',
            bank: item?.bank || '-',
            bank_account_number: item?.bank_account_number || '-',
            bank_branch: item?.bank_branch || '-',
            current_place_of_residence: item?.current_place_of_residence || '-',
            issued_by_identification: item?.issued_by_identification.name || '-',
            city: item?.city_id.name || '-',
            district: item?.district_id.name || '-',
            ward: item?.ward_id.name || '-',
            private_email: item?.private_email || '-',
            place_of_birth: item?.place_of_birth || '-',
            gender: item?.gender || '-',
            identification_id: item?.identification_id || '-',
            country: item?.country_id.name || '-',
            study_school: item?.study_school || '-',
            highest_degree: item?.highest_degree || '-',
            study_field: item?.study_field || '-',
            range_of_vehicle: item?.range_of_vehicle || '-',
            car_registration: item?.car_registration || '-',
            license_plates: item?.license_plates || '-',
            car_color: item?.car_color || '-',
            workingday: item.workingday ? moment(item.workingday) : '',
            religion: item.religion_id.name || '-',
            tax_id: item.tax_id || '-',
            part_time_company: item?.part_time_company_id.name || '-',
            part_time_department: item?.part_time_department_id.name || '-',
            part_time_job_title: item.part_time_job_title || '-',
            probationary_salary_rate: item.probationary_salary_rate || '',
            date_sign: item.date_sign ? moment(item.date_sign) : '',
        }
    })
}
export const mapEmployee = (res: IEmployeeeArgsResult[]) => {
    return res && res.length > 0 && res.map((item, index) => {
        const department = item.department_id ?? []
        const job = item.job_id ?? []
        const company = item.company_id ?? []
        const parent = item.parent_id ?? []
        const coach = item.coach_id ?? []
        const resource_calendar = item.resource_calendar_id ?? []
        const issued_by_identification = item.issued_by_identification ?? []
        const city = item.city_id ?? []
        const district = item.district_id ?? []
        const ward = item.ward_id ?? []
        const country = item.country_id ?? []
        const religion = item.religion_id ?? []
        const part_time_company = item.part_time_company_id ?? []
        const part_time_department = item.part_time_department_id ?? []
        const part_time_job_title = item.part_time_job_title ?? []
        const user = item.user_id ?? []
        return {
            id: index + 1,
            key: item.id,
            code: item.code,
            social_insurance_number: item.social_insurance_number ?? '',
            name: item.name,
            job_title: item.job_title ?? '',
            mobile_phone: item.mobile_phone ?? '',
            work_email: item.work_email ?? '',
            department: department[1] ?? '',
            job: job[1] ?? '',
            company_id: company[1] ?? '',
            parent_id: parent[1] ?? '',
            coach_id: coach[1] ?? '',
            work_phone: item.work_phone ?? '',
            resource_calendar: resource_calendar[1] ?? '',
            severance_day: item.severance_day ? moment(item.severance_day) : '',
            bank: item.bank ?? '',
            bank_account_number: item.bank_account_number ?? '',
            bank_branch: item.bank_branch ?? '',
            current_place_of_residence: item.current_place_of_residence ?? '',
            issued_by_identification: issued_by_identification[1] ?? '',
            city: city[1] ?? '',
            district: district[1] ?? '',
            ward: ward[1] ?? '',
            private_email: item.private_email ?? '',
            place_of_birth: item.place_of_birth ?? '',
            gender: item.gender ?? '',
            identification_id: item.identification_id ?? '',
            country: country[1] ?? '',
            study_school: item.study_school ?? '',
            highest_degree: item.highest_degree ?? '',
            study_field: item.study_field ?? '',
            range_of_vehicle: item.range_of_vehicle ?? '',
            car_registration: item.car_registration ?? '',
            license_plates: item.license_plates ?? '',
            car_color: item.car_color ?? '',
            workingday: item.workingday ? moment(item.workingday) : '',
            time_keeping_code: item.time_keeping_code ?? '',
            religion: religion[1] ?? '',
            tax_id: item.tax_id ?? '',
            part_time_company: part_time_company[1] ?? '',
            part_time_department: part_time_department[1] ?? '',
            part_time_job_title: part_time_job_title[1] ?? '',
            probationary_salary_rate: item.probationary_salary_rate ?? '',
            date_sign: item.date_sign ? moment(item.date_sign) : '',
            user_id: user[1] ?? '',
        }
    }
    )
}
export const mapFormEmployee = (item: IEmployeeeDtoResult) => {
    return Object.assign(
        {},
        item,
        {
            key: item.id,
            code: item.code,
            name: item.name,
            mobile_phone: item.mobile_phone || '',
            work_email: item.work_email || '',
            department: item?.department_id.name || '',
            job: item.job_id.name || '',
            company_id: item?.company_id.name || '',
            parent_id: item?.parent_id.name || '',
            coach_id: item?.coach_id.name || '',
            work_phone: item?.work_phone || '',
            resource_calendar: item?.resource_calendar_id.name || '',
            severance_day: item?.severance_day ?? '',
            bank: item?.bank || '',
            bank_account_number: item?.bank_account_number || '',
            bank_branch: item?.bank_branch || '',
            current_place_of_residence: item?.current_place_of_residence || '',
            issued_by_identification: item?.issued_by_identification.name || '',
            city: item?.city_id.name || '',
            district: item?.district_id.name || '',
            ward: item?.ward_id.name || '',
            private_email: item?.private_email || '',
            place_of_birth: item?.place_of_birth || '',
            gender: item?.gender || '',
            identification_id: item?.identification_id || '',
            country: item?.country_id.name || '',
            study_school: item?.study_school || '',
            highest_degree: item?.highest_degree || '',
            study_field: item?.study_field || '',
            range_of_vehicle: item?.range_of_vehicle || '',
            car_registration: item?.car_registration || '',
            license_plates: item?.license_plates || '',
            car_color: item?.car_color || '',
            workingday: item?.workingday ?? '',
            religion: item.religion_id.name || '',
            tax_id: item.tax_id || '',
            probationary_salary_rate: item.probationary_salary_rate || '',
            date_sign: item.date_sign ? moment(item.date_sign) : '',
        }
    )
}
