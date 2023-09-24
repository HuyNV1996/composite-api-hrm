import MyForm from '@/components/core/form';
import { loaiCuaHangOptions } from '@/const/options';

const SelectStore = ({ ...props }) => {
  return (
    <>
      <MyForm.Item
        innerProps={{
          placeholder: 'Vui lòng chọn',
        }}
        options={loaiCuaHangOptions}
        label="Loại cửa hàng"
        {...props}
        name="loaiCuaHang"
        type="select"
      />
    </>
  );
};

export default SelectStore;
