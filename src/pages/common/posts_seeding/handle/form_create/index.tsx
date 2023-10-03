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
import { IFormCreatePostSeeding } from './types';
import { apiCreateSeedingUser_FA } from '@/api/users/api';
import SelectSocial from '@/pages/components/selects/SelectSocial';
import { apiCreateSeedingPost } from '@/api/posts/api';
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
  const initalValueForm: IFormCreatePostSeeding = {
    userId: '',
    groupId: '',
    site: '',
    content: '',
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
    const res = await apiCreateSeedingPost(data);
    if (res) {
      message.info('Tạo post thành công!');
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
          <MyForm<IFormCreatePostSeeding>
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
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'User Id' }
                        ),
                      }}
                      label={'User ID'}
                      required
                      name="userId"
                      type="input-textarea"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'Group ID' }
                        ),
                      }}
                      label={'Group ID'}
                      required
                      name="groupId"
                      type="input-textarea"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'site' }
                        ),
                      }}
                      label={'Site'}
                      required
                      name="site"
                      type="input-textarea"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'content' }
                        ),
                      }}
                      label={'Noi dung'}
                      required
                      name="content"
                      type="input-textarea"
                    />
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
