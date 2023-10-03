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
          label={t({ id: 'code' })}
          name="filter"
          type="input"
          innerProps={{
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: t({ id: 'searchCustomer' }) }
            ),
          }}
        />
      </Col>
      <Col span={7}>
        <SearchItem
          label={t({ id: 'phone' })}
          name="phoneNumber"
          type="input"
          innerProps={{
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: t({ id: 'phone' }) }
            ),
          }}
        />
      </Col>
      <Col span={8}>
        <SearchItem
          label={t({ id: 'email' })}
          name="email"
          type="input"
          innerProps={{
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: t({ id: 'email' }) }
            ),
          }}
        />
      </Col>
      <Col span={8}>
        <SearchItem
          label={t({ id: 'nationalId' })}
          name="nationalId"
          type="input"
          innerProps={{
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: t({ id: 'search_nationalId' }) }
            ),
          }}
        />
      </Col>
    </>
  );
};

export default SearchUser;
