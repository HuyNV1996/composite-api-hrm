import MyForm from '@/components/core/form';
import { caGayOptions, loaiGioLamViecOptions } from '@/const/options';
import React from 'react';

const RadioLoaiGioLamViec = ({ ...props }) => {
  return (
    <MyForm.Item
        options={loaiGioLamViecOptions}
        label={'Loại giờ làm việc'}
        {...props}
        name="resource_calendar_type"
        type="radio"
        initialValue = {false}
      />
  );
};

export default RadioLoaiGioLamViec;
