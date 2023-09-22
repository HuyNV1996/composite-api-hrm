import MyForm from '@/components/core/form';
import { hinhThucNhanVienOptions } from '@/const/options';

const SelectTypeEmployee = ({ ...props }) => {

  return (
    <>
      <MyForm.Item
        innerProps={{
          placeholder: 'Vui lòng chọn',
          defaultValue: 'employee',
          allowClear: true,
        }}
        options={hinhThucNhanVienOptions}
        label="Hình thức nhân viên"
        {...props}
        name="employee_type"
        type="select"
      />
    </>
  );
};

export default SelectTypeEmployee;
