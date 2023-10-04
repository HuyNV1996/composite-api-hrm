//@ts-ignore
import { Form } from 'antd';
import { FC, useState } from 'react';
import FeaturedIcon from '@/assets/icons/correct.png';
import NotFeaturedIcon from '@/assets/icons/remove.png';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { useLocale } from '@/locales';

import { apiGeListRooms } from '@/api/rooms/api';
import { convertTimestampToFormattedDate } from './utils';
const ListRooms: FC = () => {
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
      title: 'Id',
      dataIndex: 'groupId',
      key: 'groupId',
      width: 80,
      align: 'left',
    },
    {
      title: 'Site',
      dataIndex: 'site',
      key: 'site',
      width: 80,
      align: 'left',
      // sorter: true
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

export default ListRooms;
