//@ts-ignore
import { Form, Space } from 'antd';
import { FC, useState } from 'react';
import FeaturedIcon from '@/assets/icons/correct.png';
import NotFeaturedIcon from '@/assets/icons/remove.png';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { useLocale } from '@/locales';
import {
  AppstoreAddOutlined,
  CommentOutlined,
} from '@ant-design/icons';

import SearchUser from '../components/search';
import { apiGeListUsers_FB, apiGeListUsers_TW } from '@/api/users/api';
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
      width: 10,
      align: 'center',
    },
    {
      title: 'User Id',
      dataIndex: 'userId',
      key: 'userId',
      width: 40,
      align: 'left',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'userName',
      key: 'userName',
      width: 100,
      align: 'left',
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      width: 100,
      align: 'left',
    },
    // {
    //   title: 'Hành động',
    //   key: 'action',
    //   fixed: 'right',
    //   width: 120,
    //   align: 'center',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <CommentOutlined
    //         style={{ fontSize: '14px', color: '#0960bd' }}
    //         onClick={() => handleSend(String(record.id))}
    //       />
    //       <AppstoreAddOutlined
    //         style={{ fontSize: '14px', color: '#0960bd' }}
    //         onClick={() => handleAdd(String(record.id))}
    //       />
    //     </Space>
    //   ),
    // },
  ];

  return (
    <>
      <MyPage
        pageApi={apiGeListUsers_TW}
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
