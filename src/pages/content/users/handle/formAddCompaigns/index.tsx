import {
  Button,
  Col,
  FormInstance,
  Row,
  Spin,
  Modal,
  message,
  Space,
  Popconfirm,
} from 'antd';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import FeaturedIcon from '@/assets/icons/correct.png';
import NotFeaturedIcon from '@/assets/icons/remove.png';
import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import { apiSendMessage } from '@/api/messages/api';
import { IFormMessage } from '@/interface/message/api';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { apiGeListCampaign, apiUserToCampaign } from '@/api/campaigns/api';
import { DeleteOutlined } from '@ant-design/icons';
import { convertTimestampToFormattedDate } from '../formAddCompaigns/utils';
import SelectCompaign from '@/pages/components/selects/SelectCompaign';
import { IFormCampaign } from '@/interface/campaign/types';
interface Props {
  onClose?: () => void;
  showDrawer?: () => void;
  open?: boolean;
  idUser?: string;
  setFoceUpdate?: Dispatch<SetStateAction<boolean>>;
  foceUpdate?: boolean;
  form?: FormInstance<any>;
}

const FormAdd: FC<Props> = ({
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
    setLoading(true);
    try {
      const res = await apiUserToCampaign({
        id_users: idUser!,
        id_campaign: data.id_campaign,
      });
      if (res) {
        message.info('Thêm user vào chiến dịch thành công!');
        setLoading(false);
        onClose && onClose();
      } else {
        setLoading(false);
      }
    }
    catch {
      setLoading(false);
    }
  };
  return (
    <>
      <Modal
        key={idUser}
        title={'Danh sách chiến dịch tin nhắn'}
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
              Thêm
            </Button>
          </div>
        }>
        <Spin spinning={loading}>
          <MyForm<IFormCampaign>
            onFinish={onFinish}
            form={form}
            labelCol={{ span: 24 }}
            style={{ margin: 'auto' }}
            layout="vertical">
            <Row gutter={24}>
              <Col span={24}>
                <Row gutter={24}>
                  <Col span={24}>
                    <SelectCompaign required />
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

export default FormAdd;
