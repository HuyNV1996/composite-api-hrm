import MyForm from '@/components/core/form';
import {bangCapCaoNhatOptions, tinhTrangHonNhanOptions } from '@/const/options';

const SelectCertificate= ({ ...props }) => {

  return (
    <>
      <MyForm.Item
        innerProps={{
          placeholder: 'Vui lòng chọn',
          allowClear: true,
        }}
        options={bangCapCaoNhatOptions}
        label="Bằng cấp cao nhất"
        {...props}
        name="certificate"
        type="select"
      />
    </>
  );
};

export default SelectCertificate;
