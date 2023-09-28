//@ts-ignore
import XlsExport from 'xlsexport';
import {
  Button,
  Divider,
  Form,
  Popconfirm,
  Space,
  Switch,
  Tag,
  message,
} from 'antd';
import { FC, useEffect, useState } from 'react';
import FeaturedIcon from '@/assets/icons/correct.png';
import NotFeaturedIcon from '@/assets/icons/remove.png';
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
import {
  apiCampaignById,
  apiCreateCampaign,
  apiDeleteCampaign,
  apiGeListCampaign,
  apiUpdateCampaign,
} from '@/api/campaigns/api';
import FormCreate from '../handle/form_create';
import { IRule } from '../handle/form_create/types';
import { useNavigate } from 'react-router-dom';
const ListUsers: FC = () => {
  const { t } = useLocale();
  const [foceUpdate, setFoceUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [idCampaign, setIdCampaign] = useState<any>(null);
  const [dataExport, setDataExport] = useState([]);
  const [form] = Form.useForm();
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setTimeout(() => setIdCampaign(null), 1000);
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await apiDeleteCampaign(id);
      if (res) message.success(t({ id: 'success' }));
      setFoceUpdate(!foceUpdate);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id: string) => {
    // setIdCampaign(id);
    // showDrawer();
    navigate(`/campaign/update/${id}`, { replace: true });
  };

  const handleSwitch = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      const res = (await apiCampaignById(id)) as any;
      if(res){
        const data:any ={
              id: id,    
              site: res.data.site,
              name: res.data.name,
              description: res.data.description,
              active: !res.data.active,
              rule:{
                name: res.data.rule.name,
                operator: res.data.rule.operator,
                value: res.data.rule.value
              },
            }
        const resUp = await apiUpdateCampaign(data);
        if (resUp) {
          setIsActive(!isActive)
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
      title: '#',
      dataIndex: 'no',
      key: 'id',
      width: 50,
      align: 'left',
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      align: 'left',
    },
    {
      title: 'Site',
      dataIndex: 'site',
      key: 'site',
      width: 100,
      align: 'left',
    },
    {
      title: 'Tên chiến dịch',
      dataIndex: 'name',
      key: 'name',
      width: 180,
      align: 'left',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 250,
      align: 'left',
    },
    
    {
      title: 'Tổng users',
      dataIndex: 'totalUser',
      key: 'totalUser',
      width: 80,
      align: 'center',
    },
    {
      title: 'Đã gửi',
      dataIndex: 'totalSent',
      key: 'totalSent',
      width: 50,
      align: 'center',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 100,
      align: 'left',
      render: (item, record) => (
        <span>{item && convertTimestampToFormattedDate(Number(item))}</span>
      ),
    },
    {
      title: 'Ngày sửa',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 100,
      align: 'left',
      render: (item, record) => (
        <span>{item && convertTimestampToFormattedDate(Number(item))}</span>
      ),
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
          <FormOutlined
            style={{ fontSize: '14px', color: '#0960bd' }}
            onClick={() => handleUpdate(String(record.id))}
          />
          <Divider type="vertical" />
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
  const handleCreate = async () => {
    // await form.resetFields();
    // showDrawer();
    navigate('/campaign/create', { replace: true });
  };
  return (
    <>
      <MyPage
        pageApi={apiGeListCampaign}
        title={'Danh sách chiến dịch tin nhắn'}
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
        idCampaign={idCampaign}
        open={open}
        showDrawer={showDrawer}
        onClose={onClose}
      />
    </>
  );
};

export default ListUsers;
