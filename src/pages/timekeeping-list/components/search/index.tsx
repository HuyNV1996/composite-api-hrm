import MyPage from '@/components/business/page';
import { bangCapCaoNhatOptions } from '@/const/options';
import { useLocale } from '@/locales';
import { Col } from 'antd';
import moment from 'moment';
import { departmentNameOptions } from '@/const/options';
import { useEffect, useState } from 'react';

interface IDepartmentName {
  value: string;
  label: string;
}

const { Item: SearchItem } = MyPage.MySearch;
const SearchTimeKeeping = () => {
  const { t } = useLocale();
  const currentDate = moment();
  const defaultFromDate = moment(currentDate, 'DD/MM/YYYY');
  const defaultToDate = moment(currentDate, 'DD/MM/YYYY');
  const defaultDateRange = [defaultFromDate, defaultToDate];

  

  const [departmentOptions , setDepartmentOptions] = useState<IDepartmentName[]>([]);

  useEffect(() => {
    departmentNameOptions().then((res) => {
        // console.log(res);
        setDepartmentOptions(res);
        console.log("deparment is",res)
    });
}, []);
    
  return (
    <>
      <Col span={8}>
        <SearchItem
          label={'Ngày chấm công'}
          name="rangeTime"
          type="date-picker-range"
          innerProps={{
            allowClear: true,
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'Khoảng thời gian' }
            ),
            // defaultValue: defaultDateRange,
            format: 'DD/MM/YYYY'
          }}
        />
      </Col>
      <Col span={8}>
        <SearchItem
          label={'Tên nhân viên'}
          name="employee_name_unaccent"
          type="input"
          innerProps={{
            allowClear: true,
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'tên nhân viên' }
            ),
          }}
        />
      </Col>
      <Col span={8}>
        <SearchItem
          label={'Mã nhân viên'}
          name="employee_code"
          type="input"
          
          innerProps={{
            allowClear: true,
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'mã nhân viên' }
            ),
          }}
        />
      </Col>
      <Col span={8}>
        <SearchItem
          label={'Phòng ban'}
          name="department"
          type="select"
          options={departmentOptions}
          innerProps={{
            allowClear: true,
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'phòng ban' }
            ),
          }}
        />
      </Col>
      <Col span={8}>
        <SearchItem
          label={'Mã vân tay'}
          name="time_keeping_code"
          type="input"
          innerProps={{
            allowClear: true,
            placeholder: t(
              { id: 'placeholder_input' },
              { msg: 'mã vân tay' }
            ),
          }}
        />
      </Col>
    </>
  );
};

export default SearchTimeKeeping;
