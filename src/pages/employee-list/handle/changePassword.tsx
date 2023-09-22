import { message as $message } from 'antd';
import MyForm from '@/components/core/form';
import { Button, Col, Drawer, FormInstance, Row, Spin } from 'antd';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import PasswordForm from './components/password-form';
import { changeUserPassword } from '@/api/employee/employee.api';
interface Props {
    onClose?: () => void;
    showDrawer?: () => void;
    open?: boolean;
    idEmployee?: string;
    form?: FormInstance<any>;
}

const ChangePasswordForm: FC<Props> = ({
    onClose,
    showDrawer,
    open,
    idEmployee,
    form
}) => {
    const [loading, setLoading] = useState(false);
    const onFinish = async () => {
        await form?.validateFields();
        const data = form?.getFieldsValue();
        setLoading(true);
        if (!data.password) {
            $message.error('Vui lòng nhập mật khẩu mới');
            setLoading(false);
            return;
        }
        if (idEmployee) {
            try {
                const res = await changeUserPassword(Number(idEmployee), data.password);
                if (res) {
                    $message.success('Đổi mật khẩu thành công');
                    onClose && onClose();
                    setLoading(false);
                    form?.resetFields();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <>
            <Drawer
                key={idEmployee}
                title="Đổi mật khẩu"
                width={420}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
                footer={(
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
                )}
            >
                <Spin spinning={loading}>
                    <MyForm<any>
                        onFinish={onFinish}
                        form={form}
                        layout="vertical">
                        <PasswordForm />
                    </MyForm>
                </Spin>
            </Drawer>
        </>
    )
}
export default ChangePasswordForm;