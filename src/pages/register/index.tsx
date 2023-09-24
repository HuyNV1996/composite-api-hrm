import { FC, useEffect, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Typography, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { LoginParams} from '@/interface/auth/login';
import { loginAsync, setUserItem } from '@/stores/user.store';
import { formatSearch } from '@/utils/formatSearch';
import Union from '@/assets/logo/logo.png';
import useLocalStorage from '@/hooks/useLocalStorage';

import './index.less';
import { useLocale } from '@/locales';
import { IRegisterParams } from '@/interface/register/types';
import { apiRegister } from '@/api/auth/api';

const initialValues: IRegisterParams = {
  username: '',
  password: '',
  email:''
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useLocale();
  const {Text, Link} = Typography;
  const onFinished = async (form: IRegisterParams) => {
    setLoading(true);
    const res = await apiRegister(form);
    if (!!res) {
      message.info('Đăng ký thành công!')
      navigate('/login');
    }
    else {
      message.error('Đăng ký không thành công!');
    }
  };
  const styleInput = { borderRadius: '10px', height: '45px' };

  return (
    <div className="login-page">
      {/* <img
        src={Union}
        alt=""
        style={{ width: 300, marginBottom: 50, zIndex: 1 }}
      /> */}
      <Form<IRegisterParams>
        onFinish={onFinished}
        className="login-page-form"
        initialValues={initialValues}
        style={{
          backgroundColor: 'rgba(192,192,192,0.3)',
          padding: '20px',
          boxShadow:
            'rgb(50 50 93 / 25%) 0px 13px 27px -5px, rgb(0 0 0 / 30%) 0px 8px 16px -8px',
        }}
        layout="vertical">
        <h2>Đăng ký</h2>
        <Row>
          <Col span={24}>
            <Form.Item
              name="username"
              label={'Tên đăng nhập'}
              rules={[
                {
                  required: true,
                  message: t(
                    { id: 'placeholder_input' },
                    { msg: t({ id: 'login_name' }) }
                  ),
                },
              ]}>
              <Input
                placeholder={t(
                  { id: 'placeholder_input' },
                  { msg: t({ id: 'login_name' }) }
                )}
                style={styleInput}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="password"
              label={'Mật khẩu'}
              rules={[
                {
                  required: true,
                  message: t(
                    { id: 'placeholder_input' },
                    { msg: t({ id: 'login_password' }) }
                  ),
                },
              ]}>
              <Input.Password
                placeholder={t(
                  { id: 'placeholder_input' },
                  { msg: t({ id: 'login_password' }) }
                )}
                type="password"
                style={styleInput}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="email"
              label={'Email'}
              rules={[
                {
                  required: true,
                  message: t(
                    { id: 'placeholder_input' },
                    { msg: 'email' }
                  ),
                },
              ]}>
              <Input
                placeholder={t(
                  { id: 'placeholder_input' },
                  { msg: 'email' }
                )}
                type="email"
                style={styleInput}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            className="login-page-form_button"
            style={styleInput}
            // loading={loading}
            >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;