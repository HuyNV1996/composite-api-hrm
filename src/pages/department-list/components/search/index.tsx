import MyPage from '@/components/business/page';
import { useLocale } from '@/locales';
import SelectDepartmentManager from '@/pages/components/selects/SelectDepartmentManager';
import SelectParentDepartment from '@/pages/components/selects/SelectParentDepartment';
import { Col } from 'antd';

const { Item: SearchItem } = MyPage.MySearch;

const SearchDepartment = () => {
    const { t } = useLocale();
    return (
        <>
            <Col span={7}>
                <SearchItem
                    label= {"Tên phòng ban"}
                    name="name"
                    type="input"
                    innerProps={{
                        allowClear: true,
                        placeholder: "Tên phòng ban",
                    }}
                />
            </Col>
            <Col span={7}>
                <SelectDepartmentManager />
            </Col>
            <Col span={7}>
                <SelectParentDepartment />
            </Col>
        </>
    )
}

export default SearchDepartment;