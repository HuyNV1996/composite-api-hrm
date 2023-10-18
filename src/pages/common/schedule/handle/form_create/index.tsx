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
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import { IFormScheduleRequest } from '@/api/schedule/types';
// import CronJob from '@'
import { createSchedule, getScheduleById, updateSchedule } from '@/api/schedule/api';
interface Props {
  onClose?: () => void;
  showDrawer?: () => void;
  open?: boolean;
  id?: string;
  setFoceUpdate?: Dispatch<SetStateAction<boolean>>;
  foceUpdate?: boolean;
  form?: FormInstance<any>;
}

const FormCreate: FC<Props> = ({
  onClose,
  open,
  id,
  foceUpdate,
  setFoceUpdate,
  form,
}) => {
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const initalValueForm: IFormScheduleRequest = {
    name: '',
    active: false,
    crontab: '',
    description: ''
  };
  const onFinish = async () => {
    await form?.validateFields();
    var data = await form?.getFieldsValue();
    data = {
      ...data,
      active:isActive
    }
    setLoading(true);
    const res = id ? await updateSchedule(data,Number(id)):  await createSchedule(data);
    if (res) {
      message.info('Tạo schedule thành công!');
      setLoading(false);
      setFoceUpdate && setFoceUpdate(!foceUpdate);
      onClose && onClose();
    } else {
      setLoading(false);
    }
  };
  const _getScheduleById = async () => {
    if (!id) {
        return;
    }
    try {
        setLoading(true);
        const res = await getScheduleById(id);
        if (res) {
            form && form.setFieldsValue({
              ...res.data,
              active: res.data.active,
            });
            setIsActive(res.data.active);
        }
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  }
  useEffect(() => {
    _getScheduleById();
  }, [id]);
  return (
    <>
      <Modal
        key={id}
        title={id ? t({ id: 'update' }) : t({ id: 'create' })}
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
          <MyForm<IFormScheduleRequest>
            onFinish={onFinish}
            initialValues={initalValueForm}
            form={form}
            labelCol={{ span: 24 }}
            style={{ margin: 'auto' }}
            layout="vertical">
            <Row gutter={24}>
              <Col span={24}>
                <Row gutter={24}>
                  <Col span={24}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'tên schedule' }
                        ),
                      }}
                      label={'Tên schedule'}
                      required
                      name="name"
                      type="input"
                    />
                  </Col>
                  <Col span={24}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'expression' }
                        ),
                      }}
                      label={'Crontab expression'}
                      required
                      name="crontab"
                      type="input"
                    />
                  </Col>
                  <Col span={24}>
                    CronJob
                  </Col>
                  <Col span={24}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'mô tả' }
                        ),
                      }}
                      label={'Mô tả'}
                      required
                      name="description"
                      type="input-textarea"
                    />
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="active"
                      initialValue={isActive}>
                      <Checkbox
                        checked={isActive}
                        onChange={e => setIsActive(e.target.checked)}>
                        Active
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
