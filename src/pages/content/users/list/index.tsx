//@ts-ignore
import XlsExport from 'xlsexport';
import { Button, Divider, Form, Popconfirm, Space, Tag } from 'antd';
import { FC, useState } from 'react';
import FeaturedIcon from '@/assets/icons/correct.png';
import NotFeaturedIcon from '@/assets/icons/remove.png';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { useLocale } from '@/locales';
import {
  AppstoreAddOutlined,
  CommentOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FormOutlined,
  PlusCircleOutlined,
  SendOutlined,
} from '@ant-design/icons';

import SearchUser from '../components/search';
import { formatDate } from '@/utils/formatDate';
import { apiGeListUsers } from '@/api/users/api';
import TruncateText from '../components/truncate-text';
import FormSend from '../handle/form';
import FormAdd from '../handle/formAddCompaigns';
const ListUsers: FC = () => {
  const { t } = useLocale();
  const [foceUpdate, setFoceUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAddComp, setOpenAddComp] = useState(false);
  const [dataExport, setDataExport] = useState([]);
  const [formSend] = Form.useForm();
  const [formAdd] = Form.useForm();
  const [idUser, setIdUsers] = useState<any>(null);
  const showDrawer = () => {
    setOpen(true);
  };
  const showDrawerAddComp = () => {
    setOpenAddComp(true);
  };

  const onClose = () => {
    setOpen(false);
    setTimeout(() => setIdUsers(null), 1000);
  };
  const onCloseAddComp = () => {
    setOpenAddComp(false);
    setTimeout(() => setIdUsers(null), 1000);
  };

  const handleSend = (id: string) => {
    formSend.resetFields();
    setIdUsers(id);
    showDrawer();
  };
  const handleAdd = (id: string) => {
    formAdd.resetFields();
    setIdUsers(id);
    setIdUsers(id);
    showDrawerAddComp();
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
      title: 'Site',
      dataIndex: 'site',
      key: 'site',
      width: 80,
      align: 'left',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 100,
      align: 'left',
    },
    {
      title: 'Tiểu sử (Bio)',
      dataIndex: 'bio',
      key: 'bio',
      width: 300,
      align: 'left',
      render: (item, record) =>
        item && <TruncateText maxLength={180} text={item} />,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 100,
      align: 'left',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 150,
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
      render: item => {
        if (item) {
          return <img src={FeaturedIcon} alt="image" />;
        } else {
          return <img src={NotFeaturedIcon} alt="image" />;
        }
      },
    },
    {
      title: 'Giáo viên',
      dataIndex: 'isTeacher',
      key: 'isTeacher',
      width: 100,
      align: 'center',
      render: item => {
        if (item) {
          return <img src={FeaturedIcon} alt="image" />;
        } else {
          return <img src={NotFeaturedIcon} alt="image" />;
        }
      },
    },
    {
      title: 'Blocked',
      dataIndex: 'blocked',
      key: 'blocked',
      width: 100,
      align: 'center',
      render: item => {
        if (item) {
          return <img src={FeaturedIcon} alt="image" />;
        } else {
          return <img src={NotFeaturedIcon} alt="image" />;
        }
      },
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
      sorter: true,
    },
    {
      title: 'Người theo dõi',
      dataIndex: 'followers',
      key: 'followers',
      width: 150,
      align: 'center',
      sorter: true,
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
          <CommentOutlined
            style={{ fontSize: '14px', color: '#0960bd' }}
            onClick={() => handleSend(String(record.id))}
          />
          <AppstoreAddOutlined
            style={{ fontSize: '14px', color: '#0960bd' }}
            onClick={() => handleAdd(String(record.id))}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <MyPage
        pageApi={apiGeListUsers}
        title={'Danh sách người dùng'}
        searchRender={<SearchUser />}
        forceUpdate={foceUpdate}
        setDataExport={setDataExport}
        tableOptions={tableColums}
      />
      <FormSend
        form={formSend}
        setFoceUpdate={setFoceUpdate}
        foceUpdate={foceUpdate}
        idUser={idUser}
        open={open}
        showDrawer={showDrawer}
        onClose={onClose}
      />
      <FormAdd
        form={formAdd}
        setFoceUpdate={setFoceUpdate}
        foceUpdate={foceUpdate}
        idUser={idUser}
        open={openAddComp}
        showDrawer={showDrawerAddComp}
        onClose={onCloseAddComp}
      />
    </>
  );
};

export default ListUsers;
