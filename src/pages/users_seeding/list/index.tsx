//@ts-ignore
import XlsExport from 'xlsexport';
import { Button, Divider, Form, Popconfirm, Space, Tag, message } from 'antd';
import { FC, useState } from 'react';
import FeaturedIcon from '@/assets/icons/correct.png'
import NotFeaturedIcon from '@/assets/icons/remove.png'
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
import { apiDeleteSeedingUser, apiGeListSeedingUsers, apiGeListUsers } from '@/api/users/api';
import TruncateText from '../components/truncate-text';
import FormSend from '../handle/form_send';
import FormCreate from '../handle/form_create';
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
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      align: 'left',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 150,
      align: 'left',
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'password',
      key: 'password',
      width: 80,
      align: 'center',
    },   
    {
      title: 'Tiểu sử (Bio)',
      dataIndex: 'bio',
      key: 'bio',
      width: 300,
      align: 'left',
      render: (item, record) => (
        item && <TruncateText maxLength={180} text={item} />
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 150,
      align: 'left',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 250,
      align: 'center',
    },
    {
      title: 'Facebook',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      align: 'left',
    },
    {
      title: 'Chuyên gia',
      dataIndex: 'isExpert',
      key: 'isExpert',
      width: 100,
      align: 'center',
      render: (item) => {
        if(item){
          return (
            <img src={FeaturedIcon} alt='image'/>
          )
        }
        else{
          return(
            <img src={NotFeaturedIcon} alt='image'/>
          )
        }
      }    
    },
    {
      title: 'Giáo viên',
      dataIndex: 'isTeacher',
      key: 'isTeacher',
      width: 100,
      align: 'center',
      render: (item) => {
        if(item){
          return (
            <img src={FeaturedIcon} alt='image'/>
          )
        }
        else{
          return(
            <img src={NotFeaturedIcon} alt='image'/>
          )
        }
      }    
    },
    {
      title: 'Blocked',
      dataIndex: 'blocked',
      key: 'blocked',
      width: 100,
      align: 'center',
      render: (item) => {
        if(item){
          return (
            <img src={FeaturedIcon} alt='image'/>
          )
        }
        else{
          return(
            <img src={NotFeaturedIcon} alt='image'/>
          )
        }
      }    
    },
    {
      title: 'Bài viết',
      dataIndex: 'totalPosts',
      key: 'totalPosts',
      width: 100,
      align: 'center',
    },
    {
      title: 'Thích',
      dataIndex: 'totalLikes',
      key: 'totalLikes',
      width: 150,
      align: 'center',
      sorter: true
    },
    {
      title: 'Người theo dõi',
      dataIndex: 'followers',
      key: 'followers',
      width: 150,
      align: 'center',
      sorter: true
    },
    {
      title: 'Đang theo dõi',
      dataIndex: 'following',
      key: 'following',
      width: 150,
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
          <Popconfirm
            placement="left"
            title="Bạn có chắc chắn muốn xoá?"
            onConfirm={() => handleDelete(String(record.id))}
            okText="Có"
            cancelText="Không">
            <DeleteOutlined style={{ fontSize: '16px', color: '#ed6f6f' }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <MyPage
        pageApi={apiGeListSeedingUsers}
        title={'Danh sách người dùng seeding'}
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

export default ListUsers;
