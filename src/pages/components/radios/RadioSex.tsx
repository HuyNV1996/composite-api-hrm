import MyForm from '@/components/core/form';
import { GenderOptions } from '@/const/options';
import { useLocale } from '@/locales';

const RadioSex = ({ ...props }) => {
  const { t } = useLocale();

  return (
    <>
      <MyForm.Item
        options={GenderOptions}
        label={t({ id: 'gender' })}
        {...props}
        name="gender"
        type="radio"
      />
    </>
  );
};

export default RadioSex;
