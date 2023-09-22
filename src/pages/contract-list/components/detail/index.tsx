import MyForm from '@/components/core/form';
import { contractTypeOptions } from '@/const/options';
import { useLocale } from '@/locales';
import SelectDepartmentContract from '@/pages/components/selects/SelectContractDepartment';
import SelectContractType from '@/pages/components/selects/SelectContractType';
import SelectEmployeeContract from '@/pages/components/selects/SelectEmployeeContract';
import SelectWorkHour from '@/pages/components/selects/SelectWorkHour';
import SelectDepartment from '@/pages/components/selects/selectDepartment';
import { Col, Row } from 'antd';
interface Props {
    isCreatingForm: boolean;
}
const Detail = ({ isCreatingForm }: Props) => {
    const { t } = useLocale();
    return (
        <Row gutter={24}>
            <Col span={12}>
                <MyForm.Item
                    label={'Tên hợp đồng'}
                    name="name"
                    type="input"
                    initialValue={''}
                    required
                    innerProps={{
                        placeholder: t(
                            { id: 'placeholder_input' },
                            { msg: 'Tên hợp đồng' }
                        ),
                    }}
                />
            </Col>
            <Col span={12}>
                <MyForm.Item
                    label={'Mã nhân viên'}
                    name="employee_code"
                    type="input"
                    initialValue={''}
                    innerProps={{
                        disabled: true
                    }}

                />
            </Col>
            <Col span={12}>
                <SelectEmployeeContract isCreatingForm={isCreatingForm}/>
            </Col>
            <Col span={12}>
                <SelectDepartmentContract />
            </Col>
            <Col span={12}>
                <MyForm.Item
                    label={'Chức vụ'}
                    name="job_title"
                    type="input"
                    initialValue={''}
                    innerProps={{
                        disabled: true
                    }}
                />
            </Col>
            <Col span={12}>
                <MyForm.Item
                    label={'Ngày ký'}
                    name="date_sign"
                    type="date-picker"
                    initialValue={''}
                    innerProps={{
                        placeholder: t(
                            { id: 'placeholder_input' },
                            { msg: 'Ngày ký' }
                        ),
                    }}
                />
            </Col>
            <Col span={12}>
                <MyForm.Item
                    label={'Ngày bắt đầu'}
                    name="date_start"
                    type="date-picker"
                    initialValue={''}
                    innerProps={{
                        placeholder: t(
                            { id: 'placeholder_input' },
                            { msg: 'Ngày bắt đầu' }
                        ),
                    }}
                />
            </Col>
            <Col span={12}>
                <MyForm.Item
                    label={'Ngày kết thúc'}
                    name="date_end"
                    type="date-picker"
                    initialValue={''}
                    innerProps={{
                        placeholder: t(
                            { id: 'placeholder_input' },
                            { msg: 'Ngày kết thúc' }
                        ),
                    }}
                />
            </Col>
            <Col span={12}>

                <SelectContractType />
            </Col>
            <Col span={12}>
                <MyForm.Item
                    label={'Tỷ lệ hưởng lương'}
                    name="salary_rate"
                    type="input"
                    initialValue={0}
                    innerProps={{
                        placeholder: t(
                            { id: 'placeholder_input' },
                            { msg: 'Tỷ lệ hưởng lương' }
                        ),

                    }}
                />
            </Col>
            <Col span={12}>
                <SelectWorkHour />
            </Col>
            <Col span={12}>
                <MyForm.Item
                    label={'Tiền công,lương tháng'}
                    name="wage"
                    type="input"
                    initialValue={0}
                    innerProps={{
                        placeholder: t(
                            { id: 'placeholder_input' },
                            { msg: 'Tiền công,lương tháng' }
                        ),
                    }}
                />
            </Col>

        </Row>
    )
}

export default Detail;