import MyPage from '@/components/business/page';
import { useLocale } from '@/locales';
import { Col, DatePicker, Form } from 'antd';
import moment from 'moment';

const { Item: SearchItem } = MyPage.MySearch;
const SearchLeaveManagement = ({ onChangeDate }: any) => {
    const { t } = useLocale();
    const handleMonthYearChange = (date: moment.Moment | null) => {
        if (date) {
            onChangeDate({
                month: date.month() + 1,
                year: date.year(),
            });
        }
    };
    return (
        <>
            <Col span={7}>
                <Form.Item label="Khoảng thời gian">
                    <DatePicker.MonthPicker
                        format="MM/YYYY"
                        allowClear={true}
                        placeholder="Chọn thời gian"
                        onChange={handleMonthYearChange}
                    />
                </Form.Item>

            </Col>
            <Col span={7}>
                <SearchItem
                    label={"Tên nhân viên"}
                    name="name"
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
                    name="code"
                    type="input"
                    innerProps={{
                        allowClear: true,
                        placeholder: "Mã nhân viên",
                    }}
                />
            </Col>
            <Col span={7}>
                <SearchItem
                    label={"Phòng ban"}
                    name="department_name"
                    type="input"
                    innerProps={{
                        allowClear: true,
                        placeholder: "Phòng ban",
                    }}
                />
            </Col>
        </>
    );
}
export default SearchLeaveManagement;