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
  apiDeleteSeedingUser_FA,
  apiGeListSeedingUsers_FA,
  apiGeListUsers_FA,
} from '@/api/users/api';
import TruncateText from '../components/truncate-text';
import FormCreate from '../handle/form_create';
import { apiGeListSeedingPosts } from '@/api/posts/api';
const PostSeeding: FC = () => {
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

  const handleCreate = async () => {
    await form.resetFields();
    showDrawer();
  };
  const tableColums: MyPageTableOptions<any> = [
    {
      title: 'STT',
      dataIndex: 'no',
      key: 'no',
      width: 50,
      align: 'center',
    },
    {
      title: 'Mã bài viết',
      dataIndex: 'postId',
      key: 'postId',
      width: 150,
      align: 'left',
    },
    {
      title: 'Mã user',
      dataIndex: 'userId',
      key: 'userId',
      width: 150,
      align: 'left',
    },
    {
      title: 'Mã group',
      dataIndex: 'groupId',
      key: 'groupId',
      width: 80,
      align: 'center',
    },
    {
      title: 'Site',
      dataIndex: 'site',
      key: 'site',
      width: 80,
      align: 'center',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      width: 80,
      align: 'center',
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          {/* <Popconfirm
            placement="left"
            title="Bạn có chắc chắn muốn xoá?"
            onConfirm={() => handleDelete(String(record.id))}
            okText="Có"
            cancelText="Không">
            <DeleteOutlined style={{ fontSize: '16px', color: '#ed6f6f' }} />
          </Popconfirm> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <MyPage
        pageApi={apiGeListSeedingPosts}
        title={'Danh sách bài viết seeding'}
        // searchRender={<SearchUser />}
        forceUpdate={foceUpdate}
        setDataExport={setDataExport}
        slot={
          <Button type="primary" onClick={handleCreate}>
            {t({ id: 'create' })}
          </Button>
        }
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

export default PostSeeding;
