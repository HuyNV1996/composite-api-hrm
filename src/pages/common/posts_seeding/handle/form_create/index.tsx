import {
  Button,
  Col,
  FormInstance,
  Row,
  Spin,
  Modal,
  message,
  Form,
  Checkbox,
} from 'antd';
import { Dispatch, FC, SetStateAction, useState } from 'react';

import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import { IFormCreateUser } from './types';
import { apiCreateSeedingUser } from '@/api/users/api';
import SelectSocial from '@/pages/components/selects/SelectSocial';
interface Props {
  onClose?: () => void;
  showDrawer?: () => void;
  open?: boolean;
  idUser?: string;
  setFoceUpdate?: Dispatch<SetStateAction<boolean>>;
  foceUpdate?: boolean;
  form?: FormInstance<any>;
}

const FormCreate: FC<Props> = ({
  onClose,
  open,
  idUser,
  foceUpdate,
  setFoceUpdate,
  form,
}) => {
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [isExpert, setIsExpert] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const initalValueForm: IFormCreateUser = {
    id: '',
    username: '',
    password: '',
    name: '',
    bio: '',
    email: '',
    address: '',
    facebookLink: '',
    isExpert: false,
    isTeacher: false,
    blocked: false,
    totalPosts: 0,
    totalLikes: 0,
    followers: 0,
    following: 0,
    userLucky: true,
    site: '',
  };
  const onFinish = async () => {
    await form?.validateFields();
    var data = await form?.getFieldsValue();
    data = {
      ...data,
      blocked: isBlocked,
      isExpert: isExpert,
      isTeacher: isTeacher,
    };
    setLoading(true);
    console.log('renddd');
    const res = await apiCreateSeedingUser(data);
    if (res) {
      message.info('Tạo user thành công!');
      setLoading(false);
      setFoceUpdate && setFoceUpdate(!foceUpdate);
      onClose && onClose();
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        key={idUser}
        title={idUser ? t({ id: 'update' }) : t({ id: 'create' })}
        width={'600px'}
        maskClosable={false}
        onCancel={onClose}
        open={open}
        centered
        destroyOnClose
        bodyStyle={{ paddingBottom: 0 }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button onClick={onClose}>Hủy bỏ</Button>
            <Button onClick={onFinish} type="primary" loading={loading}>
              Lưu
            </Button>
          </div>
        }>
        <Spin spinning={loading}>
          <MyForm<IFormCreateUser>
            onFinish={onFinish}
            initialValues={initalValueForm}
            form={form}
            labelCol={{ span: 24 }}
            style={{ margin: 'auto' }}
            layout="vertical">
            <Row gutter={24}>
              <Col span={24}>
                <Row gutter={24}>
                  <Col span={12}>
                    <SelectSocial />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'User Id' }
                        ),
                      }}
                      label={'Id'}
                      required
                      name="id"
                      type="input"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'Username' }
                        ),
                      }}
                      label={'Tên đăng nhập'}
                      required
                      name="username"
                      type="input"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'mật khẩu' }
                        ),
                      }}
                      label={'password'}
                      required
                      name="password"
                      type="input"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'tên hiển thị' }
                        ),
                      }}
                      label={'Tên hiển thị'}
                      required
                      name="name"
                      type="input"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'tiểu sử' }
                        ),
                      }}
                      label={'Bio'}
                      required
                      name="bio"
                      type="input"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'tiểu sử' }
                        ),
                      }}
                      label={'Email'}
                      required
                      name="email"
                      type="input"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'địa chỉ' }
                        ),
                      }}
                      label={'Địa chỉ'}
                      required
                      name="address"
                      type="input"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'facebook' }
                        ),
                      }}
                      label={'Facebook'}
                      name="facebookLink"
                      type="input"
                    />
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="isExpert"
                      initialValue={true}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập isExpert!',
                        },
                      ]}>
                      <Checkbox
                        defaultChecked={false}
                        value={isExpert}
                        onChange={e => setIsExpert(e.target.checked)}>
                        isExpert
                      </Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="isTeacher"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập isTeacher!',
                        },
                      ]}>
                      <Checkbox
                        defaultChecked={false}
                        value={isTeacher}
                        onChange={e => setIsTeacher(e.target.checked)}>
                        isTeacher
                      </Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="blocked"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập blocked!',
                        },
                      ]}>
                      <Checkbox
                        defaultChecked={false}
                        value={isBlocked}
                        onChange={e => setIsBlocked(e.target.checked)}>
                        blocked
                      </Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'totalPosts' }
                        ),
                        defaultValue: 0,
                      }}
                      label={'totalPosts'}
                      name="totalPosts"
                      type="input-number"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'totalLikes' }
                        ),
                        defaultValue: 0,
                      }}
                      label={'totalLikes'}
                      name="totalLikes"
                      type="input-number"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'followers' }
                        ),
                      }}
                      initialValue={0}
                      label={'followers'}
                      name="followers"
                      type="input-number"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'following' }
                        ),
                      }}
                      label={'following'}
                      name="following"
                      type="input-number"
                    />
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="userLucky"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập userLucky!',
                        },
                      ]}>
                      <Checkbox defaultChecked disabled>
                        userLucky
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </MyForm>
        </Spin>
      </Modal>
    </>
  );
};

export default FormCreate;
