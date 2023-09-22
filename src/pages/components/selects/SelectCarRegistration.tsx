import MyForm from '@/components/core/form';
import {bangCapCaoNhatOptions, dangKyGuiXeOptions, tinhTrangHonNhanOptions } from '@/const/options';

const SelectCarRegistration= ({ ...props }) => {

  return (
    <>
      <MyForm.Item
        innerProps={{
          placeholder: 'Vui lòng chọn',
          allowClear: true,
        }}
        options={dangKyGuiXeOptions}
        label="Đăng ký gửi xe"
        {...props}
        name="car_registration"
        type="select"
      />
    </>
  );
};

export default SelectCarRegistration;
