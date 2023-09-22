import MyPage from '@/components/business/page';
import SelectEmployee from '@/pages/components/selects/selectEmployee';
import { Col } from 'antd';
import SelectEmployeeContract from '../../../components/selects/SelectEmployeeContract';
import SelectDepartment from '@/pages/components/selects/selectDepartment';
import SelectContractType from '@/pages/components/selects/SelectContractType';
import { contractStateOptions } from '@/const/options';
import SelectEmployeeContractSearch from '@/pages/components/selects/SelectEmployeeContractSearch';
import SelectContractTypeSearch from '@/pages/components/selects/SelectContractTypeSearch';


const { Item: SearchItem } = MyPage.MySearch;
const SearchContract = () => {
    return (
        <>
            <Col span={7}>
                <SearchItem
                    label={"Tên hợp đồng"}
                    name="name"
                    type="input"
                    innerProps={{
                        allowClear: true,
                        placeholder: "Tên hợp đồng",
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
                        placeholder: "Mã nhân viên",
                    }}
                />
            </Col>
            <Col span={7}>
                <SelectEmployeeContractSearch />
            </Col>
            <Col span={7}>
                <SelectDepartment />
            </Col>
            <Col span={7}>
                <SearchItem
                    label={"Chức vụ"}
                    name="job_title"
                    type="input"
                    innerProps={{
                        allowClear: true,
                        placeholder: "Chức vụ",
                    }}
                />
            </Col>
            <Col span={7}>
                <SelectContractTypeSearch />
            </Col>
            <Col span={7}>
                <SearchItem
                    label={"Trạng thái"}
                    name="state"
                    type="select"
                    options={contractStateOptions}
                    innerProps={{
                        allowClear: true,
                        placeholder: "Trạng thái",
                    }}
                />
            </Col>
        </>
    )
}
export default SearchContract;