import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import SelectCompany from '@/pages/components/selects/SelectCompany';
import { Col, Row } from 'antd';
import SelectDepartment from '../../../../components/selects/selectDepartment';
import SelectEmployee from '@/pages/components/selects/selectEmployee';
import SelectCoach from '@/pages/components/selects/selectCoach';
import SelectJob from '@/pages/components/selects/SelectJob';

const index = () => {
  const { t } = useLocale();
  return (
    <Row gutter={24}>
      <Col span={12}>
        <MyForm.Item
          innerProps={{
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'Tên nhân viên' }
            ),
          }}
          label={'Tên nhân viên'}
          name="name"
          type="input"
          initialValue={''}
          required
        />
      </Col>
      <Col span={12}>
        <MyForm.Item
          innerProps={{
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'mã nhân viên' }
            ),
          }}
          label={'Mã nhân viên'}
          name="code"
          type="input"

        />
      </Col>
      <Col span={12}>
          <MyForm.Item 
            innerProps = {{
              placeholder: t(
                { id: 'placeholder_input' },
                { msg: 'Chức vụ' }
              ),
            }}
            label={'Chức vụ'}
            name="job_title"
            type="input"
          />
      </Col>
      <Col span={12}>
        <SelectDepartment />
      </Col>
      <Col span={12}>
        <MyForm.Item
          innerProps={{
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'mã chấm công' }
            ),
          }}
          label={'Mã chấm công'}
          name="time_keeping_code"
          type="input"

        />
      </Col>
      <Col span={12}>
        <SelectEmployee />
      </Col>
      <Col span={12}>
        <MyForm.Item
          innerProps={{
            placeholder: t({ id: 'placeholder_input' }, { msg: 'di động' }),
          }}
          label={'Di động'}
          name="mobile_phone"
          type="input"
        />
      </Col>
      {/* Selector */}
      <Col span={12}>
        <SelectCoach />
      </Col>
      <Col span={12}>
        <MyForm.Item
          innerProps={{
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'điện thoại công ty' }
            ),
          }}
          label={'Điện thoại công ty'}
          name="work_phone"
          type="input"
        />
      </Col>
      <Col span={12}>
        <MyForm.Item
          innerProps={{
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'email công việc' }
            ),
          }}
          label={'Email công việc'}
          name="work_email"
          type="input"
        />
      </Col>
      {/* Selector */}
      <Col span={12}>
        <SelectCompany />
      </Col>
    </Row>
  );
};

export default index;
