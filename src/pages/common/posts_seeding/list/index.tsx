//@ts-ignore
import XlsExport from 'xlsexport';
import { Button, Divider, Form, Popconfirm, Space, Tag, message } from 'antd';
import { FC, useState } from 'react';
import FeaturedIcon from '@/assets/icons/correct.png';
import NotFeaturedIcon from '@/assets/icons/remove.png';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { useLocale } from '@/locales';
import {
  DeleteOutlined,
  DownloadOutlined,
  FormOutlined,
  SendOutlined,
} from '@ant-design/icons';

import SearchUser from '../components/search';
import { formatDate } from '@/utils/formatDate';
import {
  apiDeleteSeedingUser,
  apiGeListSeedingUsers,
  apiGeListUsers,
} from '@/api/users/api';
import TruncateText from '../components/truncate-text';
import FormSend from '../handle/form_send';
import FormCreate from '../handle/form_create';
import { apiGeListSeedingPosts } from '@/api/posts/api';
import { convertTimestampToFormattedDate } from '../../campaign/list/utils';
const ListUsers: FC = () => {
  const { t } = useLocale();
  const [foceUpdate, setFoceUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [dataExport, setDataExport] = useState([]);
  const [form] = Form.useForm();
  const [idUser, setIdUsers] = useState<any>(null);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setTimeout(() => setIdUsers(null), 1000);
  };
  const handleUpdate = (id: string) => {
    setIdUsers(id);
    showDrawer();
  };

  const handleCreate = async () => {
    await form.resetFields();
    showDrawer();
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await apiDeleteSeedingUser(id);
      if (res) message.success(t({ id: 'success' }));
      setFoceUpdate(!foceUpdate);
    } catch (error) {
      console.log(error);
    }
  };
  const tableColums: MyPageTableOptions<any> = [
    {
      title: 'STT',
      dataIndex: 'no',
      key: 'no',
      width: 50,
      align: 'center',
    },
    // {
    //   title: 'Id',
    //   dataIndex: 'postId',
    //   key: 'postId',
    //   width: 150,
    //   align: 'left',
    // },
    {
      title: 'Site',
      dataIndex: 'site',
      key: 'site',
      width: 100,
      align: 'left',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      width: 280,
      align: 'left',
      render: (item, record) =>
        item && <TruncateText maxLength={180} text={item} />,
    },
    {
      title: 'Link ảnh',
      dataIndex: 'linkImage',
      key: 'linkImage',
      width: 280,
      align: 'center',
      render: (item, record) =>
        item && <img src={item} alt='link ảnh'/>
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      align: 'left',
      render: (item, record) => (
        <span>{item && convertTimestampToFormattedDate(Number(item))}</span>
      ),
    },
  ];

  return (
    <>
      <MyPage
        pageApi={apiGeListSeedingPosts}
        title={'Danh bài viết seeding'}
        forceUpdate={foceUpdate}
        tableOptions={tableColums}
      />
      <FormCreate
        form={form}
        setFoceUpdate={setFoceUpdate}
        foceUpdate={foceUpdate}
        idUser={idUser}
        open={open}
        showDrawer={showDrawer}
        onClose={onClose}
      />
    </>
  );
};

export default ListUsers;
