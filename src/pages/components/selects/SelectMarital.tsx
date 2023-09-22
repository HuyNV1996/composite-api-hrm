import MyForm from '@/components/core/form';
import {tinhTrangHonNhanOptions } from '@/const/options';

const SelectMarial= ({ ...props }) => {

  return (
    <>
      <MyForm.Item
        innerProps={{
          placeholder: 'Vui lòng chọn',
          allowClear: true,
        }}
        options={tinhTrangHonNhanOptions}
        label="Tình trạng hôn nhân"
        {...props}
        name="marital"
        type="select"
      />
    </>
  );
};

export default SelectMarial;
