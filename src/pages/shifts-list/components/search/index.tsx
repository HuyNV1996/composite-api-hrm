import MyPage from '@/components/business/page';
import { useLocale } from '@/locales';
import { Col } from 'antd';

const { Item: SearchItem } = MyPage.MySearch;
const SearchShift = () => {
  const { t } = useLocale();

  return (
    <>
      <Col span={7}>
        <SearchItem
          label={t({ id: 'name' })}
          name="name"
          type="input"
          innerProps={{
            allowClear: true,
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'Tên ca' }
            ),
          }}
        />
      </Col>
    </>
  );
};

export default SearchShift;
