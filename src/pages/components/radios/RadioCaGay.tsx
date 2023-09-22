import MyForm from '@/components/core/form';
import { caGayOptions } from '@/const/options';
import {FC} from 'react';
interface IProps {
  disabled?: boolean;
  onChange: () => void;
}
const RadioCaGay:FC<IProps> = ({
  disabled,
  onChange,
  ...props
}) => {
  return (
    <MyForm.Item
        options={caGayOptions}
        label={'Ca gãy'}
        {...props}
        name="fix_rest_time"
        type="radio"
        required
        initialValue = {false}
        innerProps={{
          disabled: disabled,
          onChange: onChange,
        }}
      />
  );
};

export default RadioCaGay;
