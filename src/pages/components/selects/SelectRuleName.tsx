import MyForm from '@/components/core/form';
import { ruleName } from '@/const/options';

const SelectRuleName = ({ ...props }) => {
  return (
    <>
      <MyForm.Item
        innerProps={{
          placeholder: 'Vui lòng chọn',
        }}
        options={ruleName}
        label="Loại Rule Name"
        {...props}
        name="ruleName"
        type="select"
      />
    </>
  );
};

export default SelectRuleName;
