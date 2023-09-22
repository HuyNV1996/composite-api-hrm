import MyForm from '@/components/core/form';
import { caGayOptions, giotinhOptions, loaiGioLamViecOptions } from '@/const/options';
import React from 'react';

const RadioGioiTinh = ({ ...props }) => {
  return (
    <MyForm.Item
        options={giotinhOptions}
        label={'Giới tính'}
        {...props}
        name="gender"
        type="radio"
      />
  );
};

export default RadioGioiTinh;
