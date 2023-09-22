import MyPage from '@/components/business/page';
import { useLocale } from '@/locales';
import SelectDepartmentEmployee from '@/pages/components/selects/SelectDepartmentEmployee';
import { Col } from 'antd';

const { Item: SearchItem } = MyPage.MySearch;
const SearchEmployeee = () => {
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
              { msg: t({ id: 'searchEmployees' }) }
            ),
          }}
        />
      </Col>
      <Col span={7}>
        <SearchItem
          label={'Mã nhân viên'}
          name="code"
          type="input"
          innerProps={{
            allowClear: true,
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'Mã nhân viên' }
            ),
          }}
        />
      </Col>
      <Col span={7}>
        <SelectDepartmentEmployee />
      </Col>
      <Col span={7}>
        <SearchItem
          label={'Chức vụ'}
          name="job_title"
          type="input"
          innerProps={{
            allowClear: true,
            placeholder: t({ id: 'placeholder_input' }, { msg: 'Chức vụ' }),
          }}
        />
      </Col>
      <Col span={7}>
        <SearchItem
          label={'Ngày thôi việc'}
          name="severance_day"
          type="date-picker"
          innerProps={{
            allowClear: true,
            placeholder: t({ id: 'placeholder_input' }, { msg: 'ngày' }),
            format: 'DD/MM/YYYY',
          }}
        />
      </Col>
      <Col span={7}>
        <SearchItem
          label={t({ id: 'email' })}
          name="work_email"
          type="input"
          innerProps={{
            allowClear: true,
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: t({ id: 'searchMail' }) }
            ),
          }}
        />
      </Col>
      <Col span={7}>
        <SearchItem
          label={t({ id: 'phone' })}
          name="mobile_phone"
          type="input"
          innerProps={{
            allowClear: true,
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: t({ id: 'searchPhone' }) }
            ),
          }}
        />
      </Col>
    </>
  );
};

export default SearchEmployeee;
