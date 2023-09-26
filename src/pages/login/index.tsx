import { FC, useEffect, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { LoginParams} from '@/interface/auth/login';
import { loginAsync, setUserItem } from '@/stores/user.store';
import { formatSearch } from '@/utils/formatSearch';
import Union from '@/assets/logo/logo.png';
import useLocalStorage from '@/hooks/useLocalStorage';

import './index.less';
import { useLocale } from '@/locales';

const initialValues: LoginParams = {
  username: '',
  password: '',
  // remember: true
};

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { t } = useLocale();
  const { storedValue: token } = useLocalStorage('token');
  const {Text, Link} = Typography;
  const onFinished = async (form: LoginParams) => {
    setLoading(true);
    const res = await dispatch(await loginAsync(form));
    if (!!res) {
      const search = formatSearch(location.search);
      const from = search.from || { pathname: '/' };
      setLoading(false);
      // navigate(from);
      navigate('/');
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
      <Form<LoginParams>
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
        <h2>{t({ id: 'login' })}</h2>
        <Row>
          <Col span={24}>
            <Form.Item
              name="username"
              label={t({ id: 'login_name' })}
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
              label={t({ id: 'login_password' })}
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
        </Row>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Lưu </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            className="login-page-form_button"
            style={styleInput}
            // loading={loading}
            >
            Đăng nhập
          </Button>
          <p style={{marginTop: 15}}>
            Hoặc <Link href="/register" > đăng ký ngay!</Link>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;