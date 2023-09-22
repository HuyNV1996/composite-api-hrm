import { Button, Col, Drawer, FormInstance, Row, Spin } from 'antd';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { message as $message } from 'antd';
import BaseInfo from './components/base-info';
import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import Tabs from './components/tabs';
import { createNewEmployee, getEmployeeById, putEmployeeById } from '@/api/employee/employee.api';
import { mapFormEmployee } from '@/api/employee/transform';
import moment, { Moment } from "moment";
import { jobOptions } from '@/const/options';
import { IJob } from '@/pages/components/selects/SelectSubJob';
import { hinhThucNhanVienOptions } from '@/const/options';
import { set } from 'lodash';
import { bangCapCaoNhatOptions } from '@/const/options';

interface Props {
  onClose?: () => void;
  showDrawer?: () => void;
  open?: boolean;
  idEmployee?: string;
  setFoceUpdate?: Dispatch<SetStateAction<boolean>>;
  foceUpdate?: boolean;
  form?: FormInstance<any>;
  isViewMode: boolean;
  isCreating: boolean;
}
const FormEmployee: FC<Props> = ({
  onClose,
  open,
  idEmployee,
  foceUpdate,
  setFoceUpdate,
  isCreating,
  isViewMode,
  form,
}) => {
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  function transformObjectKeys(obj: any) {
    const result: { [key: string]: number | string | boolean | object } = {};

    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null && obj[key] !== false && obj[key] !== undefined) {
        if (key.endsWith('_id') && 'id' in obj[key] && typeof obj[key]['id'] !== 'string' && obj[key]['id'] !== false) {
          result[key] = obj[key]['id'];
        } else {
          const transformedValue = transformObjectKeys(obj[key]); // Recursively transform nested objects
          if (Object.keys(transformedValue).length > 0) {
            result[key] = transformedValue;
          }
        }
      }
      else if (obj[key] !== '-' && obj[key] !== '' && obj[key] !== false && obj[key] != null && obj[key] !== undefined) {
        result[key] = obj[key];
      }

    }

    return result;
  }


  const [job, setJob] = useState<IJob[]>([]);
  useEffect(() => {

    jobOptions().then((res) => {
      setJob(res);
    });
  }, []);

  function set_data_type_date(property: string, res: any) {
    let string_props = null
    if (res) {
      if (res[property] != false && res[property] != null && res[property] != undefined) {
        string_props = res[property]
        form && form.setFieldsValue({
          [property]: moment(string_props) ?? '',
        })
      }
      else {
        string_props = ""
        form && form.setFieldsValue({
          [property]: undefined,
        })
      }
    }
  }

  let company_id = Number(localStorage.getItem('company_id'));
  const onFinish = async () => {
    await form?.validateFields();
    const result: { [key: string]: number | string | boolean | object | null } = {};
    const data = await form?.getFieldsValue();
    console.log(data)
    for (const key in data) {
      if (typeof data[key] !== 'object') {
        result[key] = data[key]
      }
      else if (typeof data[key] == 'object' && moment.isMoment(data[key]) == false) {
        result[key] = data[key].value
      }
      else if (typeof data[key] == 'object' && moment.isMoment(data[key]) == true) {

        result[key] = data[key].format('YYYY-MM-DD')
        if (data[key].format('YYYY-MM-DD') == 'Invalid date') {
          result[key] = null
        }
      }
    }
    if (data.resource_calendar_id.value == false && data.resource_calendar_id.label == false) {
      $message.error('Vui lòng chọn lịch làm việc!');
      return;
    }
    if (data.severance_day && data.severance_day < data.workingday) {
      $message.error('Ngày thôi việc phải lớn hơn ngày vào làm!');
      return;
    }
    if (!data.code) {
      $message.error('Vui lòng nhập mã nhân viên!');
      return;
    }
    if (!data.time_keeping_code) {
      $message.error('Vui lòng nhập mã chấm công!');
      return;
    }

    // if (data.union_day && data.union_day < data.workingday || data.union_day && data.union_day > data.severance_day) {
    //   $message.error('Ngày công đoàn phải nằm trong khoảng ngày vào làm và ngày thôi việc!');
    //   return;
    // }
    if (data.probationary_contract_termination_date && data.probationary_contract_termination_date < data.workingday) {
      $message.error('Ngày hết hạn hợp đồng thử việc phải lớn hơn ngày vào làm!');
      return;
    }
    if (!data.department_id) {
      $message.error('Vui lòng chọn phòng ban!');
      return;
    }
    if (!data.job_title) {
      $message.error('Vui lòng chọn chức vụ!');
      return;
    }
    if (!data.name) {
      $message.error('Vui lòng nhập tên!');
      return;
    }
    if (isCreating) {
      setLoading(true);
      try {
        if (data) {
          const res = await createNewEmployee({
            company_id: company_id,
            department_id: data.department_id,
            resource_calendar_id: data.resource_calendar_id,
            parent_id: data.parent_id,
            coach_id: data.coach_id,
            part_time_company_id: data.part_time_company_id,
            part_time_department_id: data.part_time_department_id,
            part_time_job_title: data.part_time_job_title,
            country_id: data.country_id,
            nation_id: data.nation_id,
            religion_id: data.religion_id,
            state_id: data.state_id,
            district_vietnam_id: data.district_vietnam_id,
            ward_vietnam_id: data.ward_vietnam_id,
            ...result,
          })
          if (res) {
            $message.success('Thành công');
            setFoceUpdate && setFoceUpdate(!foceUpdate);
            isCreating = false
            onClose && onClose();
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }


    const transformedData = transformObjectKeys(data);


    if (result) {
      //   for (const key in transformedData) {
      //     if (transformedData.hasOwnProperty(key)) {
      //       if (moment.isMoment(transformedData[key] as Moment)) {
      //         const momentDate = (transformedData[key] as any)._i
      //         transformedData[key] = momentDate;
      //       }
      //       else if (key.endsWith('_id') && typeof transformedData[key] === 'string') {
      //         delete transformedData[key];
      //       }
      //       else if (key.endsWith('_id') && typeof transformedData[key] === 'object') {
      //         const obj = transformedData[key] as Record<string, any>;
      //         if (!obj.hasOwnProperty('id') || typeof obj.id !== 'number') {
      //           delete transformedData[key];
      //         }
      //       }
      //     }
      //   }


      try {
        setLoading(true);
        if (idEmployee) {
          const res = await putEmployeeById(Number(idEmployee), {
            "params": {
              data: result
            }
          });
          if (res) {
            $message.success('Thành công');
            setFoceUpdate && setFoceUpdate(!foceUpdate);
            onClose && onClose();
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchEmployeeById = async (id?: string) => {
    if (!id) {
      return;
    }

    try {
      setLoading(true);
      const res = await getEmployeeById(id);
      let string_probationary_contract_termination_date = null
      if (res) {
        if (res.probationary_contract_termination_date != false && res.probationary_contract_termination_date != null && res.probationary_contract_termination_date != undefined) {
          string_probationary_contract_termination_date = res.probationary_contract_termination_date?.substring(0, 10)
          form && form.setFieldsValue({
            probationary_contract_termination_date: moment(string_probationary_contract_termination_date) ?? '',
          })
        }
        else {
          string_probationary_contract_termination_date = ""
          form && form.setFieldsValue({
            probationary_contract_termination_date: undefined,
          })
        }
        set_data_type_date('severance_day', res)
        set_data_type_date('workingday', res)
        set_data_type_date('date_sign', res)
        set_data_type_date('birthday', res)
        set_data_type_date('issued_by_identification_day', res)
        if (res.part_time_job_titlei != false && res.part_time_job_title != null && res.part_time_job_title != undefined)
          job.forEach(obj => {
            if (obj.value == res.part_time_job_title) {
              form && form.setFieldsValue({
                part_time_job_title: obj,

              })
            }
          })
        else {
          form && form.setFieldsValue({
            part_time_job_title: undefined,
          })
        }
        hinhThucNhanVienOptions.forEach(obj => {
          if (obj.value == res.employee_type) {
            form && form.setFieldsValue({
              employee_type: obj,
            })
          }
        }
        )

        console.log(bangCapCaoNhatOptions)
        console.log(res.certificate)
        bangCapCaoNhatOptions.forEach(obj => {
          if (obj.value == res.certificate) {
            form && form.setFieldsValue({
              certificate: obj,
            })
          }
        }
        )
        form && form.setFieldsValue({
          key: res.key,
          code: res.code,
          name: res.name !== false ? res.name : '',
          time_keeping_code: res.time_keeping_code !== false ? res.time_keeping_code : '',
          mobile_phone: res.mobile_phone !== false ? res.mobile_phone : '',
          permanent_address: res.permanent_address ?? '',
          work_email: res.work_email !== false ? res.work_email : '',
          department_id: {
            value: res.department_id?.id ?? '',
            label: res.department_id?.name ?? '',
          },
          social_insurance_number: res.social_insurance_number !== false ? res.social_insurance_number : '',
          // date_sign: moment(res.date_sign) ?? '',
          probationary_salary_rate: res.probationary_salary_rate ?? '',
          job_title: res.job_title,
          company_id: {
            value: res.company_id?.id ?? '',
            label: res.company_id?.name ?? '',

          },
          parent_id: {
            value: res.parent_id?.id ?? '',
            label: res.parent_id?.name ?? '',
          },
          coach_id: {
            value: res.coach_id?.id ?? '',
            label: res.coach_id?.name ?? '',
          },
          employee_type: {
            value: res.employee_type ?? ''
          },
          work_phone: res.work_phone !== false ? res.work_phone : '',
          resource_calendar_id: {
            value: res.resource_calendar_id?.id ?? '',
            label: res.resource_calendar_id?.name ?? '',

          },
          part_time_company_id: {
            value: res.part_time_company_id?.id ?? '',
            label: res.part_time_company_id?.name ?? '',


          },
          part_time_department_id: {
            value: res.part_time_department_id?.id ?? '',
            label: res.part_time_department_id?.name ?? '',
          },
          // part_time_job_title: res.part_time_job_title ?? '',
          resource_calendar_type: res.resource_calendar_type ?? '',
          country_id: {
            value: res.country_id?.id ?? '',
            label: res.country_id?.name ?? '',
          },
          nation_id: {
            value: res.nation_id?.id ?? '',
            label: res.nation_id?.name ?? '',
          },
          religion_id: {
            value: res.religion_id?.id ?? '',
            label: res.religion_id?.name ?? '',
          },
          issued_by_identification: {
            value: res.issued_by_identification?.id ?? '',
            label: res.issued_by_identification?.name ?? '',
          },
          state_id: {
            value: res.state_id?.id ?? '',
            label: res.state_id?.name ?? '',
          },
          // severance_day:  moment(res.severance_day) ?? '',
          bank: res.bank !== false ? res.bank : '',
          bank_account_number: res.bank_account_number !== false ? res.bank_account_number : '',
          bank_branch: res.bank_branch !== false ? res.bank_branch : '',
          current_place_of_residence: res.current_place_of_residence !== false ? res.current_place_of_residence : '',
          issued_by_identification_text: res.issued_by_identification_text ?? '',
          // city: res.city ?? '',
          district_vietnam_id: {
            value: res.district_vietnam_id?.id ?? '',
            label: res.district_vietnam_id?.name ?? '',

          },
          ward_vietnam_id: {
            value: res.ward_vietnam_id?.id ?? '',
            label: res.ward_vietnam_id?.name ?? '',

          },
          personal_email: res.personal_email !== false ? res.personal_email : '',
          marital: res.marital !== false ? res.marital : '',
          // private_email: res.private_email !== false ? res.private_email : '',
          place_of_birth: res.place_of_birth !== false ? res.place_of_birth : '',
          gender: res.gender !== false ? res.gender : '',
          identification_id: res.identification_id !== false ? res.identification_id : '',
          country: res.country !== false ? res.country : '',
          study_school: res.study_school !== false ? res.study_school : '',
          highest_degree: res.highest_degree !== false ? res.highest_degree : '',
          study_field: res.study_field !== false ? res.study_field : '',
          range_of_vehicle: res.range_of_vehicle !== false ? res.range_of_vehicle : '',
          car_registration: res.car_registration !== false ? res.car_registration : '',
          license_plates: res.license_plates !== false ? res.license_plates : '',
          car_color: res.car_color !== false ? res.car_color : '',

          religion: res.religion !== false ? res.religion : '',
          tax_id: res.tax_id !== false ? res.tax_id : '',
          annual_leave_fund: res.annual_leave_fund !== false ? res.annual_leave_fund : '',
          // union_day: res.union_day ? moment(res.union_day) : '',

          department_secretary_check: res.department_secretary_check ?? '',
          general_management_check: res.general_management_check ?? '',
          head_of_department_check: res.head_of_department_check ?? '',
        });

      }


    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeById(idEmployee);
  }, [idEmployee]);

  return (
    <>
      <Drawer
        key={idEmployee}
        title={idEmployee ? 'Thông tin chi tiết' : t({ id: 'create' })}
        width={720}
        onClose={onClose}
        open={open}
        destroyOnClose
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          !isViewMode && (
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Button key={1} onClick={onClose}>
                Hủy
              </Button>
              <Button
                key={2}
                onClick={onFinish}
                type="primary"
                loading={loading}>
                Lưu
              </Button>
            </div>
          )
        }>
        <Spin spinning={loading}>
          <MyForm<any>
            disabled={isViewMode}
            onFinish={onFinish}
            form={form}
            layout="vertical">
            <BaseInfo />
            <Row gutter={24}>
              {/* Tabs */}
              <Col span={24}>
                <Tabs />
              </Col>
            </Row>
          </MyForm>
        </Spin>
      </Drawer>
    </>
  );
};

export default FormEmployee;
