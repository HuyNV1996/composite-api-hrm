import { Button, Col, Drawer, FormInstance, Row, Spin } from 'antd';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { message as $message } from 'antd';
import MyForm from '@/components/core/form';
import Detail from '../components/detail';
import { createContractByArgs, getContractById, updateContract } from '@/api/contract/contract.api';

import moment from 'moment';


interface Props {
    onClose?: () => void;
    showDrawer?: () => void;
    open?: boolean;
    idContract?: number;
    setForceUpdate?: Dispatch<SetStateAction<boolean>>;
    forceUpdate?: boolean;
    form?: FormInstance<any>;
    isViewMode?: boolean;
    isCreating?: boolean;
}

const FormContract: FC<Props> = ({
    onClose,
    showDrawer,
    open,
    idContract,
    setForceUpdate,
    forceUpdate,
    form,
    isViewMode,
    isCreating
}) => {
    const [isCreatingForm, setIsCreatingForm] = useState(false);
    useEffect(() => {
        if (isCreating) {
            setIsCreatingForm(true);
        } else {
            setIsCreatingForm(false);
        }
    }, [isCreating])

    function set_data_type_date(property: string, res: any) {
        let string_props = null
        if (res) {
            if (res[property] != false && res[property] != null && res[property] != undefined) {
                string_props = res[property]
                form && form.setFieldsValue({
                    [property]: moment(string_props) ?? '',
                })
            }
            else {
                string_props = ""
                form && form.setFieldsValue({
                    [property]: undefined,
                })
            }
        }
    }
    const [loading, setLoading] = useState(false);
    const onFinish = async () => {
        if (isCreating) {
            await form?.validateFields();
            const data = await form?.getFieldsValue();
            if (data.employee_id.value == false && data.employee_id.label == false) {
                $message.error('Vui lòng chọn nhân viên!');
                return;
            }
            if (data.resource_calendar_id.value == false && data.resource_calendar_id.label == false) {
                $message.error('Vui lòng chọn lịch làm việc!');
                return;
            }
            if (data.date_end < data.date_start) {
                $message.error('Ngày kết thúc không được nhỏ hơn ngày bắt đầu!');
                return;
            }
            if (data.date_end < data.date_sign) {
                $message.error('Ngày ký không được lớn hơn ngày kết thúc!');
                return;
            }
            if (data) {
                try {
                    console.log(data)
                    setLoading(true);
                    const res = await createContractByArgs({
                        name: data.name,
                        employee_id: data.employee_id,
                        salary_rate: data.salary_rate,
                        date_sign: data.date_sign,
                        date_start: data.date_start,
                        date_end: data.date_end,
                        contract_type_id: data.contract_type_id,
                        resource_calendar_id: data.resource_calendar_id,
                        wage: data.wage,
                    })
                    if (res) {
                        $message.success('Tạo mới thành công!');
                        form?.resetFields();
                        setForceUpdate && setForceUpdate(!forceUpdate);
                        onClose && onClose();
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }
        } else {
            await form?.validateFields();
            const data = await form?.getFieldsValue();
            if (data.employee_id.value == false && data.employee_id.label == false) {
                $message.error('Vui lòng chọn nhân viên!');
                return;
            }
            if (data.resource_calendar_id.value == false && data.resource_calendar_id.label == false) {
                $message.error('Vui lòng chọn lịch làm việc!');
                return;
            }
            if (data.date_end < data.date_start) {
                $message.error('Ngày kết thúc không được nhỏ hơn ngày bắt đầu!');
                return;
            }
            if (data.date_end < data.date_sign) {
                $message.error('Ngày ký không được lớn hơn ngày kết thúc!');
                return;
            }
            if (data) {
                try {
                    setLoading(true);
                    if (idContract) {
                        const res = await updateContract({
                            id: idContract,
                            name: data.name,
                            salary_rate: data.salary_rate,
                            date_sign: data.date_sign,
                            date_start: data.date_start,
                            date_end: data.date_end,
                            contract_type_id: data.contract_type_id.value,
                            resource_calendar_id: data.resource_calendar_id.value,
                            wage: data.wage,
                        });
                        if (res) {
                            $message.success('Cập nhật thành công!');
                            setForceUpdate && setForceUpdate(!forceUpdate);
                            onClose && onClose();
                        }
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }
        }
    }
    const fetchContractById = async (id?: number) => {
        if (!id) {
            return;
        }
        try {
            setLoading(true);
            const res = await getContractById(id);
            if (res) {
                set_data_type_date("date_start", res)
                set_data_type_date("date_end", res)
                set_data_type_date("date_sign", res)
                form && form.setFieldsValue({
                    key: res.id,
                    name: res.name,
                    employee_id: {
                        value: res.employee_id?.id ?? '',
                        label: res.employee_id?.name ?? '',
                    },
                    employee_code: res.employee_code,
                    department_id: {
                        value: res.department_id?.id ?? '',
                        label: res.department_id?.name ?? '',
                    },
                    resource_calendar_id: {
                        value: res.resource_calendar_id?.id ?? '',
                        label: res.resource_calendar_id?.name ?? '',

                    },
                    contract_type_id: {
                        value: res.contract_type_id?.id ?? '',
                        label: res.contract_type_id?.name ?? '',
                    },
                    job_title: res.job_title,
                    salary_rate: res.salary_rate,
                    wage: res.wage,
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (idContract !== undefined) {
            fetchContractById(idContract);
        }
        form?.resetFields();
    }, [idContract])
    return (
        <Drawer
            key={idContract}
            title={idContract && 'Thông tin chi tiết'}
            width={720}
            onClose={onClose}
            open={open}
            destroyOnClose
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                !isViewMode && (
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button key={1} onClick={onClose}>
                            Hủy
                        </Button>
                        <Button
                            key={2}
                            onClick={onFinish}
                            type="primary"
                            loading={loading}>
                            Lưu
                        </Button>
                    </div>
                )
            }
        >
            <Spin spinning={loading}>
                <MyForm<any>
                    onFinish={onFinish}
                    form={form}
                    layout="vertical">
                    <Detail isCreatingForm={isCreatingForm} />
                </MyForm>
            </Spin>
        </Drawer>
    )
}

export default FormContract;