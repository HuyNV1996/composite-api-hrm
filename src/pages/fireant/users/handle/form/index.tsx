import {
    Button,
    Col,
    FormInstance,
    Row,
    Spin,
    Modal,
    message,
  } from 'antd';
  import { Dispatch, FC, SetStateAction, useState } from 'react';
  
  import MyForm from '@/components/core/form';
  import { useLocale } from '@/locales';
import { apiSendMessage } from '@/api/messages/api';
import { IFormMessage } from '@/interface/message/api';
  interface Props {
    onClose?: () => void;
    showDrawer?: () => void;
    open?: boolean;
    idUser?: string;
    setFoceUpdate?: Dispatch<SetStateAction<boolean>>;
    foceUpdate?: boolean;
    form?: FormInstance<any>;
  }
  
  const FormSend: FC<Props> = ({
    onClose,
    open,
    idUser,
    foceUpdate,
    setFoceUpdate,
    form,
  }) => {
    const { t } = useLocale();
    const [loading, setLoading] = useState(false);
    const onFinish = async () => {
      await form?.validateFields();
      const data = await form?.getFieldsValue();
      try{
        setLoading(true)
        const res = await apiSendMessage({
          user_id: idUser!,
          message: data.message
        })
        if(res.status === 'OK'){
          message.info('Gửi tin nhắn thành công!');
          setLoading(false);
          onClose && onClose();
        }
        else{
          setLoading(false)
        }
      }
      catch{
        setLoading(false)
      }
    };
  
  
    return (
      <>
        <Modal
          key={idUser}
          title={'Gửi tin nhắn'}
          width={'500px'}
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
                Gửi
              </Button>
            </div>
          }>
          <Spin spinning={loading}>
            <MyForm<IFormMessage>
              onFinish={onFinish}
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
                            { msg: 'tin nhắn' }
                          ),
                        }}
                        label={'Nội dung'}
                        required
                        name="message"
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
  
  export default FormSend;
  