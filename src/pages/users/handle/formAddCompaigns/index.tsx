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
import { Dispatch, FC, SetStateAction, useState } from 'react';
import FeaturedIcon from '@/assets/icons/correct.png';
import NotFeaturedIcon from '@/assets/icons/remove.png';
import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import { apiSendMessage } from '@/api/messages/api';
import { IFormMessage } from '@/interface/message/api';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { apiGeListCampaign } from '@/api/campaigns/api';
import { DeleteOutlined } from '@ant-design/icons';
import { convertTimestampToFormattedDate } from '../formAddCompaigns/utils';
import SelectCompaign from '@/pages/components/selects/SelectCompaign';
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
  const [dataExport, setDataExport] = useState([]);
  const onFinish = async () => {
    await form?.validateFields();
    const data = await form?.getFieldsValue();
    setLoading(true);
    const res = await apiSendMessage({
      user_id: idUser!,
      message: data.message,
    });
    if (res.status === 'OK') {
      message.info('Gửi tin nhắn thành công!');
      setLoading(false);
      onClose && onClose();
    } else {
      setLoading(false);
    }
  };

  const tableColums: MyPageTableOptions<any> = [
    {
      title: 'Tên chiến dịch',
      dataIndex: 'name',
      key: 'name',
      width: 180,
      align: 'left',
    },
  ];

  return (
    <>
      <Modal
        key={idUser}
        title={'Danh sách chiến dịch tin nhắn'}
        width={'100%'}
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
        <SelectCompaign required />
      </Modal>
    </>
  );
};

export default FormAdd;
