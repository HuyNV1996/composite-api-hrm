import { FC, useEffect, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ILoginForm, ILoginParams } from '@/interface/user/login';
import { loginAsync } from '@/stores/user.store';
import Union from '@/assets/logo/Union.svg';
import AvatarAccount from '@/assets/header/higod.png';
import useLocalStorage from '@/hooks/useLocalStorage';

import './index.less';
import { useLocale } from '@/locales';

const initialValues: ILoginForm = {
  login: '',
  password: ''
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { t } = useLocale();
  const { storedValue: token } = useLocalStorage('token');

  const onFinished = async (form: ILoginForm) => {
    setLoading(true);
    const res = await dispatch(await loginAsync(form)) as any;
    console.log(res);
    if (!!res) {
      console.log(res)
      localStorage.setItem('username', res?.display_name);
      localStorage.setItem('company_id', res?.company_id);
      setLoading(false);
      navigate('/');
    }

  };
  const styleInput = { borderRadius: '10px', height: '45px' };

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token]);

  return (
    <div className="login-page">
      {/* <img
        src={Union}
        alt=""
        style={{ width: 300, marginBottom: 50, zIndex: 1 }}
      /> */}
      <Form<ILoginForm>
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
              name="login"
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
        </Form.Item>
      </Form>
      {/* <div className="img-bg">
        <img src={AvatarAccount} alt="" className="box bounce" />
      </div> */}
    </div>
  );
};

export default LoginForm;
