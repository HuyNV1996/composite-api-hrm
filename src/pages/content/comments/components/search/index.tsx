import MyPage from '@/components/business/page';
import { useLocale } from '@/locales';
import SelectSocial from '@/pages/components/selects/SelectSocial';
import { Col } from 'antd';

const { Item: SearchItem } = MyPage.MySearch;
const SearchUser = () => {
  const { t } = useLocale();

  return (
    <>
      <Col span={7}>
        <SearchItem
          label={'Filter'}
          name="search"
          type="input"
          innerProps={{
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'keyword' }
            ),
          }}
        />
      </Col>
      <Col span={7}>
        <SelectSocial />
      </Col>
    </>
  );
};

export default SearchUser;
