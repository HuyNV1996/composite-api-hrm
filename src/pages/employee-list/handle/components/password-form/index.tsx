import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';;
import { Col, Row } from 'antd';

const PasswordForm = () => {
    const { t } = useLocale();
    return (
        <Row gutter={24}>
            <Col span={20}>
                <MyForm.Item
                    label={'Mật khẩu mới'}
                    name="password"
                    type="input"
                    required 
                    innerProps = {{
                        placeholder: t(
                            { id: 'placeholder_input' },
                            { msg: 'Mật khẩu' }
                        ),
                    }}
                />
            </Col>
        </Row>
    )
}
export default PasswordForm;