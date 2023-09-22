import React from 'react';
import { Button, Col, Form, Input } from 'antd';
import { useLocale } from '@/locales';
import MyPage from '@/components/business/page';
import { statusLeaveOptions } from '@/const/options';
import SelecLeaveType from '@/pages/components/selects/SelectTypeLeave';
const { Item: SearchItem } = MyPage.MySearch;
const SearchApplicationList = () => {
  const { t } = useLocale();
  return (
    <>
      <Col span={8}>
        <SearchItem
          label={'Mã nhân viên'}
          name="employee_code"
          type="input"
          innerProps={{
            allowClear: true,
            placeholder: t({ id: 'placeholder_input' }, { msg: 'Mã nhân viên' }),
          }}
        />
      </Col>
      <Col span={8}>
        <SearchItem
          label={'Tên nhân viên'}
          name="employee_name"
          type="input"
          innerProps={{
            allowClear: true,
            placeholder: t({ id: 'placeholder_input' }, { msg: 'Tên nhân viên' }),
          }}
        />
      </Col>
      <Col span={8}>
        <SearchItem label={'Ngày tạo đơn'} name="date" type="date-picker"
          innerProps={{
            allowClear: true,
            placeholder: t({ id: 'placeholder_input' }, { msg: 'ngày tạo đơn' }),
            format: 'DD/MM/YYYY',
          }}
        />
      </Col>
      <Col span={8}>
        <SelecLeaveType 
        innerProps={{
          allowClear: true,
          placeholder: t({ id: 'placeholder_input' }, { msg: 'loại đơn' }),
        }}
        />
      </Col>
      <Col span={8}>
        <SearchItem
          label={'Trạng thái đơn'}
          name="status"
          type="select"
          options={statusLeaveOptions}
          innerProps={{
            allowClear: true,
            placeholder: t({ id: 'placeholder_input' }, { msg: 'trạng thái đơn' }),
          }}
        />
      </Col>
    </>
  );
};

export default SearchApplicationList;
