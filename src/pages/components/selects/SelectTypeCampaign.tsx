import MyForm from '@/components/core/form';
import { typeCampaignOptions } from '@/const/options';

const SelectTypeCampaign = ({ ...props }) => {
  return (
    <>
      <MyForm.Item
        innerProps={{
          placeholder: 'Vui lòng chọn loại chiến dịch',
        }}
        options={typeCampaignOptions}
        label="Loại chiến dịch"
        {...props}
        name="type"
        type="select"
      />
    </>
  );
};

export default SelectTypeCampaign;
