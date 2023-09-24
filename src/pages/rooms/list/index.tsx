//@ts-ignore
import XlsExport from 'xlsexport';
import { Button, Divider, Form, Popconfirm, Space, Tag } from 'antd';
import { FC, useState } from 'react';
import FeaturedIcon from '@/assets/icons/correct.png'
import NotFeaturedIcon from '@/assets/icons/remove.png'
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { useLocale } from '@/locales';
import {
  DeleteOutlined,
  DownloadOutlined,
  FormOutlined,
} from '@ant-design/icons';

import SearchUser from '../components/search';
import { formatDate } from '@/utils/formatDate';
import { apiGeListUsers } from '@/api/users/api';
import TruncateText from '../components/truncate-text';
import { apiGeListRooms } from '@/api/rooms/api';
import { convertTimestampToFormattedDate } from './utils';
const ListUsers: FC = () => {
  const { t } = useLocale();
  const [foceUpdate, setFoceUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [idCustomer, setIdCustomer] = useState<any>(null);
  const [dataExport, setDataExport] = useState([]);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setTimeout(() => setIdCustomer(null), 1000);
  };

  const tableColums: MyPageTableOptions<any> = [
    {
      title: '#',
      dataIndex: 'no',
      key: 'id',
      width: 50,
      align: 'left',
    },
    {
      title: 'Mã nhóm',
      dataIndex: 'roomID',
      key: 'roomID',
      width: 80,
      align: 'left',
    },
    {
      title: 'Tên nhóm',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      align: 'left',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 180,
      align: 'left',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 50,
      align: 'left',
    },
    {
      title: 'Ưu tiên',
      dataIndex: 'privacy',
      key: 'privacy',
      width: 50,
      align: 'left',
    },
    {
      title: 'Visibility',
      dataIndex: 'visibility',
      key: 'visibility',
      width: 50,
      align: 'left',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 50,
      align: 'left',
    },
    {
      title: 'Approved',
      dataIndex: 'approved',
      key: 'approved',
      width: 50,
      align: 'left',
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
      width: 50,
      align: 'left',
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
      title: 'Verified',
      dataIndex: 'verified',
      key: 'verified',
      width: 50,
      align: 'left',
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
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: 50,
      align: 'left',
      render: (item, record) =>
        (<span>{item && convertTimestampToFormattedDate(Number(item))}</span>)
    },
  ];

  return (
    <>
      <MyPage
        pageApi={apiGeListRooms}
        title={'Danh sách nhóm'}
        // searchRender={<SearchUser />}
        forceUpdate={foceUpdate}
        setDataExport={setDataExport}
        
        tableOptions={tableColums}
      />
      {/* <FormCustomer
        form={form}
        setFoceUpdate={setFoceUpdate}
        foceUpdate={foceUpdate}
        idCustomer={idCustomer}
        open={open}
        showDrawer={showDrawer}
        onClose={onClose}
      /> */}
    </>
  );
};

export default ListUsers;
