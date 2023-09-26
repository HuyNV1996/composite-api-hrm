import MyForm from '@/components/core/form';
import { ruleOperator } from '@/const/options';

const SelectRuleOperator = ({ ...props }) => {
  return (
    <>
      <MyForm.Item
        innerProps={{
          placeholder: 'Vui lòng chọn',
        }}
        options={ruleOperator}
        label="Loại rule operator"
        {...props}
        name="ruleOperator"
        type="select"
      />
    </>
  );
};

export default SelectRuleOperator;
