import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import React from 'react';

const onChange: DatePickerProps['onChange'] = (date: any, dateString: any) => {
  console.log(date, dateString);
};

const index: React.FC = () => (
  <Space direction="vertical">
    <DatePicker placeholder="Chọn tháng" onChange={onChange} picker="month" />
  </Space>
);

export default index;
