//@ts-ignore
import { Button, Form, Space, Switch, Tooltip, message } from 'antd';
import { FC, useState } from 'react';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { useLocale } from '@/locales';
import {
  FormOutlined,
} from '@ant-design/icons';

import TruncateText from '../components/truncate-text';
import FormCreate from '../handle/form_create';
import { getListSchedule, getScheduleById, updateSchedule } from '@/api/schedule/api';
const ListUsers: FC = () => {
  const { t } = useLocale();
  const [foceUpdate, setFoceUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [id, setId] = useState<any>(null);
  const [isActive, setIsActive] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setTimeout(() => setId(null), 1000);
  };
  const handleUpdate = (id: string) => {
    setId(id);
    showDrawer();
  };

  const handleCreate = async () => {
    await form.resetFields();
    showDrawer();
  };
  const handleSwitch = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      const res = (await getScheduleById(id)) as any;
      if (res) {
        const data: any = {
          ...res.data,
          active: !res.data.active,
        };
        const resUp = await updateSchedule(data,Number(id));
        if (resUp) {
          setIsActive(!isActive);
          message.info('Active thành công!');
          setFoceUpdate && setFoceUpdate(!foceUpdate);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const tableColums: MyPageTableOptions<any> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 30,
      align: 'left',
    },
    {
      title: 'Tên schedule',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      align: 'left',
    },
    {
      title: 'Crontab expression',
      dataIndex: 'crontab',
      key: 'crontab',
      width: 150,
      align: 'left',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      align: 'left',
      render: (item, record) =>
        item && <TruncateText maxLength={180} text={item} />,
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      width: 50,
      fixed: 'right',
      align: 'center',
      render: (item, record) => {
        return (
          <Switch
            checked={item}
            onChange={() => handleSwitch(String(record.id))}
          />
        );
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title={'Sửa schedule'}>
            <FormOutlined
              style={{ fontSize: '14px', color: '#0960bd' }}
              onClick={() => handleUpdate(String(record?.id))}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <MyPage
        pageApi={getListSchedule}
        title={'Danh sách schedule'}
        // searchRender={<SearchUser />}
        forceUpdate={foceUpdate}
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
        id={id}
        open={open}
        showDrawer={showDrawer}
        onClose={onClose}
      />
    </>
  );
};

export default ListUsers;
