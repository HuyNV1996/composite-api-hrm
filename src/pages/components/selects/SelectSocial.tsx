import MyForm from '@/components/core/form';
import { socialOptions } from '@/const/options';

const SelectSocial = ({ ...props }) => {
  return (
    <>
      <MyForm.Item
        innerProps={{
          placeholder: 'Vui lòng chọn',
        }}
        options={socialOptions}
        label="Site"
        {...props}
        name="site"
        type="select"
      />
    </>
  );
};

export default SelectSocial;
