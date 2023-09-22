import MyPage from '@/components/business/page';
import { invalidTypeOptions, reasonOptions, validatedOptions } from '@/const/options';
import { IInvalidTimesheet } from '@/interface/weeklyreport/type';
import { useLocale } from '@/locales';
import { Col } from 'antd';

const { Item: SearchItem } = MyPage.MySearch;
const SearchExplainRequest = () => {
  const { t } = useLocale();
  return (
    <>
      <Col span={7}>
        <SearchItem
          label= {"Tên nhân viên"}
          name="employee_name"
          type="input"
          innerProps={{
            allowClear: true,
            placeholder: "Tên nhân viên",
          }}
        />
      </Col>
      <Col span={7}>
        <SearchItem
          label={"Mã nhân viên"}
          name="employee_code"
          type="input"
          innerProps={{
            allowClear: true,
            placeholder:"Mã nhân viên",
          }}
        />
      </Col>
      <Col span={7}>
        <SearchItem
          label={"Phòng ban"}
          name="department"
          type="input"
          innerProps={{
            allowClear: true,
            placeholder: "Phòng ban",
          }}
        />
      </Col>
      <Col span={7}>
        <SearchItem
          label={"Vị trí"}
          name="position"
          type="input"
          innerProps={{
            allowClear: true,
            placeholder: "Vị trí",
          }}
        />
      </Col>
      <Col span={7}>
        <SearchItem
          label={"Loại giải trình"}
          name="invalid_type"
          type="select"
          options={invalidTypeOptions}
          innerProps={{
            allowClear: true,
            placeholder: "Loại giải trình",
          }}
        />
      </Col>
      <Col span={7}>
        <SearchItem
          label={"Lý do"}
          name="reason"
          type="select"
          options={reasonOptions}
          innerProps={{
            allowClear: true,
            placeholder: "Lý do",
          }}
        />
      </Col>
      <Col span={7}>
        <SearchItem
          label={"Người duyệt"}
          name="reviewer"
          type="input"
          innerProps={{
            allowClear: true,
            placeholder: "Người duyệt",
          }}
        />
      </Col>
      <Col span={7}>
        <SearchItem
          label={"Ngày vi phạm"}
          name="invalid_date"
          type="date-picker"
          innerProps={{
            format:"DD/MM/YYYY",
            allowClear: true,
            inputReadOnly: true,
          }}
        />
      </Col>
      <Col span={7}>
        <SearchItem
          label={"Đã duyệt"}
          name="validated"
          type="select"
          options={validatedOptions}
          innerProps={{
            allowClear: true,
            placeholder: "Đã duyệt",
          }}
        />
      </Col>
    </>
  );
};

export default SearchExplainRequest;
