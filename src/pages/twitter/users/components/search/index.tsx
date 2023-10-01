import MyPage from '@/components/business/page';
import { useLocale } from '@/locales';
import { Col } from 'antd';

const { Item: SearchItem } = MyPage.MySearch;
const SearchUser = () => {
  const { t } = useLocale();

  return (
    <>
      <Col span={24}>
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
    </>
  );
};

export default SearchUser;
