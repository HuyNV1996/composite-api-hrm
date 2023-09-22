import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import SelectGender from '@/pages/components/selects/SelectGender';
import SelectMarial from '@/pages/components/selects/SelectMarital';
import { Col, Divider, Row, Typography, FormInstance } from 'antd';
import { useState, FC } from 'react';
import './style.css';
import SelectCertificate from '@/pages/components/selects/SelectCertificate';
import SelectCarRegistration from '@/pages/components/selects/SelectCarRegistration';
import SelectCountry from '@/pages/components/selects/SelectCountry';
import SelectCity from '@/pages/components/selects/SelectCity';
import SelectReligion from '@/pages/components/selects/SelectReligion';
import SelectNation from '@/pages/components/selects/SelectNation';
import SelectState from '@/pages/components/selects/SelectState';
import SelectDistrict from '@/pages/components/selects/SelectDistrict';
import SelectWard from '@/pages/components/selects/SelectWard';
import SelectIssuedByIdentification from '@/pages/components/selects/SelectIssuedByIdentification';

interface Props {
  form?: FormInstance<any>;
}
const index: FC<Props> = ({ form }) => {
  const { t } = useLocale();
  const { Title } = Typography;
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);
  const [selectedStateId, setSelectedStateId] = useState<number | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(null);
  console.log(form)
  const handleCountryChange = (value: number) => {
    if (!value) {
      handleClearCountry();
    }
    else {
      setSelectedCountryId(value)
    }
  }
  const handleClearCountry = () => {
    form?.setFields([{ name: 'state_vietnam_id', value: null }, { name: 'district_vietnam_id', value: null }, { name: 'ward_vietnam_id', value: null }]);
  }
  const handleStateChange = (value: number) => {
    if (!value) {
      handleClearState();
    }
    else {
      setSelectedStateId(value)
    }
  }
  const handleClearState = () => {
    form?.setFields([{ name: 'district_vietnam_id', value: null }, { name: 'ward_vietnam_id', value: null }]);
  }
  const handleDistrictChange = (value: number) => {
    if (!value) {
      handleClearDistrict();
    }
    else {
      setSelectedDistrictId(value)
    }
  }
  const handleClearDistrict = () => {
    form?.setFields([{ name: 'ward_vietnam_id', value: null }]);
  }

  return (
    <>
      {/* Thông tin chung */}
      <Row gutter={24}>
        <Col span={24}>
          <Title level={5}>THÔNG TIN CHUNG</Title>
          <Divider />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <MyForm.Item
            innerProps={{
              placeholder: t({ id: 'placeholder_input' }, { msg: 'nơi sinh' }),
            }}
            label={'Nơi sinh'}
            name="place_of_birth"
            type="input"

          />
        </Col>
        <Col span={12}>
          <MyForm.Item
            label={'Ngày sinh'}
            name="birthday"
            type="date-picker"
            innerProps={{
              placeholder: t({ id: 'placeholder_input' }, { msg: 'ngày sinh' }),
            }}

          />
        </Col>
        <Col span={12}>
          <SelectGender />
        </Col>
        <Col span={12}>
          <MyForm.Item
            label="Địa chỉ thường trú"
            name="permanent_address"
            type="input"
            innerProps={{
              placeholder: t(
                { id: 'placeholder_input' },
                { msg: 'địa chỉ thường trú' }
              ),
            }}
          />
        </Col>
        <Col span={12}>
          <SelectCountry onChange={handleCountryChange} selectedCountryId={selectedCountryId} />
        </Col>
        <Col span={12}>
          <SelectNation />
        </Col>
        <Col span={12}>
          <SelectReligion />
        </Col>
        <Col span={12}>
          <MyForm.Item
            innerProps={{
              placeholder: t({ id: 'placeholder_input' }, { msg: 'số CMND' }),
            }}
            label={'Số CMND/CCCD'}
            name="identification_id"
            type="input"
          />
        </Col>
        <Col span={12}>
          <MyForm.Item
            label="Nơi cấp CMND/CCCD"
            name="issued_by_identification_text"
            type="input"
            innerProps={{
              placeholder: t(
                { id: 'placeholder_input' },
                { msg: 'nơi cấp CMND/CCCD' }
              ),
            }}
          />
        </Col>
          <Col span={12}>
            <MyForm.Item
              label="Ngày cấp CMND/CCCD"
              name="issued_by_identification_day"
              type="date-picker"
              innerProps={{
                placeholder: t(
                  { id: 'placeholder_input' },
                  { msg: 'ngày cấp CMND/CCCD' }
                ),
              }}
            />
          </Col>
        {/* <Col span={12}>
          <SelectIssuedByIdentification />
        </Col> */}
        <Col span={12}>
          <SelectState onChange={handleStateChange} selectedCountryId={selectedCountryId} selectedStateId={selectedStateId} />
        </Col>
        <Col span={12}>
          <SelectDistrict selectedStateId={selectedStateId} onChange={handleDistrictChange} selectedDistrictId={selectedDistrictId} />
        </Col>
        <Col span={12}>
          <SelectWard selectedDistrictId={selectedDistrictId} />
        </Col>
        <Col span={12}>
          <MyForm.Item
            innerProps={{
              placeholder: t(
                { id: 'placeholder_input' },
                { msg: 'email cá nhân' }
              ),
            }}
            label={'Email cá nhân'}
            name="personal_email"
            type="input"
          />
        </Col>
        <Col span={12}>
          <MyForm.Item
            innerProps={{
              placeholder: t(
                { id: 'placeholder_input' },
                { msg: 'nơi ở hiện tại' }
              ),
            }}
            label={'Nơi ở hiện tại'}
            name="current_place_of_residence"
            type="input"
          />
        </Col>
        <Col span={12}>
          <SelectMarial />
        </Col>
        <Col span={12}>
          <MyForm.Item
            innerProps={{
              placeholder: t({ id: 'placeholder_input' }, { msg: 'STK' }),
            }}
            label={'STK'}
            name="bank_account_number"
            type="input"
          />
        </Col>
        <Col span={12}>
          <MyForm.Item
            innerProps={{
              placeholder: t({ id: 'placeholder_input' }, { msg: 'ngân hàng' }),
            }}
            label={'Ngân hàng'}
            name="bank"
            type="input"
          />
        </Col>
        <Col span={12}>
          <MyForm.Item
            innerProps={{
              placeholder: t({ id: 'placeholder_input' }, { msg: 'chi nhánh' }),
            }}
            label={'Chi nhánh'}
            name="bank_branch"
            type="input"
          />
        </Col>
        <Col span={12}>
          <MyForm.Item
            innerProps={{
              placeholder: t({ id: 'placeholder_input' }, { msg: 'Số BHXH' }),
            }}
            label={'Số BHXH'}
            name="social_insurance_number"
            type="input"
          />
        </Col>
      </Row>
      {/* Học vấn */}
      <Row gutter={24}>
        <Col span={24}>
          <Title level={5}>HỌC VẤN</Title>
          <Divider />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <SelectCertificate />
        </Col>
        <Col span={12}>
          <MyForm.Item
            innerProps={{
              placeholder: t(
                { id: 'placeholder_input' },
                { msg: 'trường đào tạo' }
              ),
            }}
            label={'Trường đào tạo'}
            name="study_school"
            type="input"

          />
        </Col>
        <Col span={12}>
          <MyForm.Item
            innerProps={{
              placeholder: t({ id: 'placeholder_input' }, { msg: 'chứng chỉ' }),
            }}
            label={'Chứng chỉ'}
            name="highest_degree"
            type="input"
          />
        </Col>
        <Col span={12}>
          <MyForm.Item
            innerProps={{
              placeholder: t(
                { id: 'placeholder_input' },
                { msg: 'chuyên ngành' }
              ),
            }}
            label={'Chuyên ngành'}
            name="study_field"
            type="input"
          />
        </Col>
      </Row>
      {/* Phương tiện */}
      <Row gutter={24}>
        <Col span={24}>
          <Title level={5}>PHƯƠNG TIỆN</Title>
          <Divider />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <MyForm.Item
            innerProps={{
              placeholder: t(
                { id: 'placeholder_input' },
                { msg: 'loại xe' }
              ),
            }}
            label={'Loại xe'}
            name="range_of_vehicle"
            type="input"

          />
        </Col>
        <Col span={12}>
          <SelectCarRegistration />
        </Col>
        <Col span={12}>
          <MyForm.Item
            innerProps={{
              placeholder: t(
                { id: 'placeholder_input' },
                { msg: 'biển số xe' }
              ),
            }}
            label={'Biển số xe'}
            name="license_plates"
            type="input"

          />
        </Col>
        <Col span={12}>
          <MyForm.Item
            innerProps={{
              placeholder: t(
                { id: 'placeholder_input' },
                { msg: 'màu xe' }
              ),
            }}
            label={'Màu xe'}
            name="car_color"
            type="input"

          />
        </Col>
      </Row>
    </>
  );
};

export default index;
