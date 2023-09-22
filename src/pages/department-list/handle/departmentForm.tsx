import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import SelectCompany from '@/pages/components/selects/SelectCompany';
import SelectDepartmentManager from '@/pages/components/selects/SelectDepartmentManager';
import SelectParentDepartment from '@/pages/components/selects/SelectParentDepartment';
import { Col, Row } from 'antd';

const DepartmentForm = () => {
    const { t } = useLocale();
    return (
        <>
        <Row gutter={24}>
            <Col span={12}>
                <MyForm.Item 
                    label={'Tên phòng ban'}
                    name="name"
                    type="input"
                    innerProps={{
                        allowClear: true,
                        placeholder: "Tên phòng ban",
                    }}
                    required
                />
            </Col>
            <Col span={12}>
                <SelectDepartmentManager />
            </Col>
            <Col span={12}>
                <SelectParentDepartment />
            </Col>
        </Row>
        </>
    )
}
export default DepartmentForm;