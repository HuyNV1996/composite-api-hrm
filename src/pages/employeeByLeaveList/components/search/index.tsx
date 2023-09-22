import MyPage from '@/components/business/page';
import { useLocale } from '@/locales';
import { Col, Form } from 'antd';
import moment from 'moment';

const { Item: SearchItem } = MyPage.MySearch;
const SearchEmployeeByLeave = () => {
    return (
        <>
            <Col span={7}>
                <SearchItem 
                label={"Năm"}
                name="year"
                type="date-picker"
                innerProps={{
                    allowClear: true,
                    placeholder: "Năm",
                    picker:"year"
                }}
                />
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
        </>
    )
}
export default SearchEmployeeByLeave;