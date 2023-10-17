//@ts-ignore
import XlsExport from 'xlsexport';
import {
  Button,
  Divider,
  Form,
  Popconfirm,
  Space,
  Tag,
  Tooltip,
  message,
} from 'antd';
import { FC, useState } from 'react';
import FeaturedIcon from '@/assets/icons/correct.png';
import NotFeaturedIcon from '@/assets/icons/remove.png';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { useLocale } from '@/locales';
import {
  DeleteOutlined,
  DownloadOutlined,
  EyeOutlined,
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
import FormCreate from '../handle/form_create';
import { apiDeletePostSeeding, apiGeListSeedingPosts } from '@/api/posts/api';
import { useNavigate } from 'react-router-dom';
import FormView from '../handle/form_view';
import { convertTimestampToFormattedDate } from '@/utils/timeStampToDate';
const ListUsers: FC = () => {
  const { t } = useLocale();
  const [foceUpdate, setFoceUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [dataExport, setDataExport] = useState([]);
  const [form] = Form.useForm();
  const [formView] = Form.useForm();
  const [postID, setPostID] = useState<any>(null);
  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };
  const showDrawerView = () => {
    setOpenView(true);
  };

  const onClose = () => {
    if (open === true) {
      setOpen(false);
    } else if (openView === true) {
      setOpenView(false);
    }
    setTimeout(() => setPostID(null), 1000);
  };
  const handleDelete = async (id: string) => {
    try {
      console.log(id);

      const res = await apiDeletePostSeeding(id);
      if (res) message.success(t({ id: 'success' }));
      setFoceUpdate(!foceUpdate);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = (id: string) => {
    // setIdCampaign(id);
    // showDrawer();
    navigate(`/post/seeding/update/${id}`, { replace: true });
  };

  const handleCreate = async () => {
    // await form.resetFields();
    // showDrawer();
    navigate('/post/seeding/create', { replace: true });
  };

  const handleView = (postID: string) => {
    // formView.resetFields();
    // setPostID(postID);
    // showDrawerView();
    navigate(`/post/seeding/detail/${postID}`, { replace: true });
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
      sorter: (a, b) => a.site - b.site,
    },
    {
      title: 'Tác giả',
      dataIndex: 'userEntity',
      key: 'userEntity',
      width: 100,
      align: 'left',
      sorter: (a, b) => a.userEntity - b.userEntity,
      render: (item, record) => <>{item?.name}</>,
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      width: 280,
      align: 'left',
      sorter: (a, b) => a.content - b.content,
      render: (item, record) =>
        item && <TruncateText maxLength={180} text={item} />,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'left',
      sorter: (a, b) => a.status - b.status,
      render: (item, record) => (item === 1 ? 'Đã đăng' : 'Đang chờ đăng'),
    },
    {
      title: 'Tags',
      dataIndex: 'tag',
      key: 'tag',
      width: 100,
      align: 'left',
      sorter: (a, b) => a.tag - b.tag,
      render: (items, record) =>
        items.map((item: any, index: number) => {
          return (
            item && <Tag color="green" key={index}>
              {item}
            </Tag>
          );
        }),
    },
    {
      title: 'Keywords',
      dataIndex: 'keywords',
      key: 'keywords',
      width: 100,
      align: 'left',
      sorter: (a, b) => a.tag - b.tag,
      render: (items, record) =>
        items.map((item: any, index: number) => {
          return (
            item && <Tag color="green" key={index}>
              {item}
            </Tag>
          );
        }),
    },
    {
      title: 'Link ảnh',
      dataIndex: 'linkImage',
      key: 'linkImage',
      width: 280,
      align: 'center',
      sorter: (a, b) => a.linkImage - b.linkImage,
      render: (item, record) => item && <img src={item} alt="link ảnh" />,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      align: 'left',
      sorter: (a, b) => a.createdAt - b.createdAt,
      render: (item, record) => (
        <span>{item && convertTimestampToFormattedDate(Number(item))}</span>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title={'Hiển thị bài viết'}>
            <EyeOutlined
              style={{ fontSize: '14px', color: '#0960bd' }}
              onClick={() => handleView(String(record?.postId))}
            />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title={'Sửa chiến dịch'}>
            <FormOutlined
              style={{ fontSize: '14px', color: '#0960bd' }}
              onClick={() => handleUpdate(String(record?.postId))}
            />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title={'Xóa'}>
            <Popconfirm
              placement="left"
              title="Bạn có chắc chắn muốn xoá?"
              onConfirm={() => handleDelete(String(record?.postId))}
              okText="Có"
              cancelText="Không">
              <DeleteOutlined style={{ fontSize: '16px', color: '#ed6f6f' }} />
            </Popconfirm>
          </Tooltip>
        </Space>
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
        slot={
          <Button type="primary" onClick={handleCreate}>
            {t({ id: 'create' })}
          </Button>
        }
      />
      <FormCreate
        form={form}
        setFoceUpdate={setFoceUpdate}
        foceUpdate={foceUpdate}
        idUser={postID}
        open={open}
        showDrawer={showDrawer}
        onClose={onClose}
      />
      <FormView
        form={formView}
        setFoceUpdate={setFoceUpdate}
        foceUpdate={foceUpdate}
        postID={postID}
        open={openView}
        showDrawer={showDrawerView}
        onClose={onClose}
      />
    </>
  );
};

export default ListUsers;
