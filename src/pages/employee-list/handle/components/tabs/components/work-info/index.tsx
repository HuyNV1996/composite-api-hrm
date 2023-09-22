import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import RadioLoaiGioLamViec from '@/pages/components/radios/RadioLoaiGioLamViec';
import SelectSubCompany from '@/pages/components/selects/SelectSubCompany';
import SelectSubDepartment from '@/pages/components/selects/SelectSubDepartment';
import SelectSubJob from '@/pages/components/selects/SelectSubJob';
import SelectTypeEmployee from '@/pages/components/selects/SelectTypeEmployee';
import SelectWorkHour from '@/pages/components/selects/SelectWorkHour';
import { Checkbox, Col, Form, Row } from 'antd';
import React from 'react';

const index = () => {
  const { t } = useLocale();
  return (
    <Row gutter={24}>
      <Col span={12}>
        <MyForm.Item
          innerProps={{
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'Mã số thuế cá nhân' }
            ),
          }}
          label={'Mã số thuế cá nhân'}
          name="tax_id"
          type="input"

        />
      </Col>
      
      <Col span={12}>
        <SelectTypeEmployee />
      </Col>
      {/*  Công ty kiêm nhiệm */}
      <Col span={12}>
        <SelectSubCompany />
      </Col>
      {/*  Phòng ban kiêm nhiệm */}
      <Col span={12}>
        <SelectSubDepartment />
      </Col>
      {/*  Chúc vụ kiêm nhiệm */}
      <Col span={12}>
        <SelectSubJob />
      </Col>
      <Col span={12}>
        <MyForm.Item
          innerProps={{
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'ngày thôi việc' }
            ),
            format: 'DD/MM/YYYY',
          }}
          label={'Ngày thôi việc'}
          name="severance_day"
          type="date-picker"

        />
      </Col>
      <Col span={8}>
        <Form.Item
          label={''}
          name="head_of_department_check"
          valuePropName="checked">
          <Checkbox>Trưởng bộ phận</Checkbox>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label={''}
          name="general_management_check"
          valuePropName="checked">
          <Checkbox>Quản lý chung</Checkbox>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label={''}
          name="department_secretary_check"
          valuePropName="checked">
          <Checkbox>Thư ký bộ phận</Checkbox>
        </Form.Item>
      </Col>
      
      <Col span={12}>
        <MyForm.Item
          innerProps={{
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'quỹ phép năm' }
            ),
            min: 0,
            step: '0.01',
          }}
          label={'Quỹ phép năm'}
          name="annual_leave_fund"
          type="input-number"

        />
      </Col>
      <Col span={12}>
        <SelectWorkHour />
      </Col>
      <Col span={12}>
        <MyForm.Item
          innerProps={{
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'ngày hết hạn hợp đồng thử việc' }
            ),
            format: 'DD/MM/YYYY',
          }}
          label={'Ngày hết hạn hợp đồng thử việc'}
          name="probationary_contract_termination_date"
          type="date-picker"
        />
      </Col>
      <Col span={12}>
        <MyForm.Item
          innerProps={{
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'tỷ lệ hưởng lương thử việc' }
            ),
          }}
          label={'Tỷ lệ hưởng lương thử việc'}
          name="probationary_salary_rate"
          type="input"
        />
      </Col>
      <Col span={12}>
        <MyForm.Item
          innerProps={{
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'ngày vào làm' }
            ),
            format: 'DD/MM/YYYY',
          }}
          label={'Ngày vào làm'}
          name="workingday"
          type="date-picker"

        />
      </Col>
          <Col span={12}>
            <MyForm.Item
              innerProps={{
                placeholder: t(
                  { id: 'placeholder_input' },
                  { msg: 'ngày ký hợp đồng lao động' }
                ),
                format: 'DD/MM/YYYY',
              }}
              label={'Ngày ký hợp đồng lao động'}
              name="date_sign"
              type="date-picker"
            />
          </Col>
      <Col span={12}>
        <RadioLoaiGioLamViec />
      </Col>
    </Row>
  );
};

export default index;
