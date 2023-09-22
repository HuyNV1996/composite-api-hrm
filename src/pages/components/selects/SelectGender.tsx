import MyForm from '@/components/core/form';
import { giotinhOptions, hinhThucNhanVienOptions } from '@/const/options';

const SelectGender= ({ ...props }) => {

  return (
    <>
      <MyForm.Item
        innerProps={{
          placeholder: 'Vui lòng chọn',
          allowClear: true,
        }}
        options={giotinhOptions}
        label="Giới tính"
        {...props}
        required
        name="gender"
        type="select"
      />
    </>
  );
};

export default SelectGender;
