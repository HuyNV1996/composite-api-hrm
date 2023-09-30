//@ts-ignore
import XlsExport from 'xlsexport';
import { Button, Divider, Form, Popconfirm, Space, Tag } from 'antd';
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
} from '@ant-design/icons';

import SearchUser from '../components/search';
import { formatDate } from '@/utils/formatDate';
import { apiGeListUsers_FA } from '@/api/users/api';
import TruncateText from '../components/truncate-text';
import { apiGeListPosts_FA } from '@/api/posts/api';
import { convertTimestampToFormattedDate } from '@/pages/fireant/rooms/list/utils';
import FormCreate from '../components/form_create';

const ListUsers: FC = () => {
  const { t } = useLocale();
  const [foceUpdate, setFoceUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [idPost, setIdPost] = useState<any>(null);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setTimeout(() => setIdPost(null), 1000);
  };
  const handleUpdate = (id: string) => {
    setIdPost(id);
    showDrawer();
  };
  const tableColums: MyPageTableOptions<any> = [
    {
      title: '#',
      dataIndex: 'no',
      key: 'no',
      align: 'left',
      width: 50,
    },
    {
      title: 'Post Id',
      dataIndex: 'postID',
      key: 'postID',
      width: 80,
      align: 'left',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      width: 220,
      align: 'left',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 220,
      align: 'left',
      render: (item, record) =>
        item && <TruncateText maxLength={180} text={item} />,
    },
    {
      title: 'Tin tốt',
      dataIndex: 'sentiment',
      key: 'sentiment',
      width: 120,
      align: 'center',
      sorter: true,
      render: item => {
        if (item) {
          return <img src={FeaturedIcon} alt="image" />;
        } else {
          return <img src={NotFeaturedIcon} alt="image" />;
        }
      },
    },
    {
      title: 'Nội dung',
      dataIndex: 'originalContent',
      key: 'originalContent',
      width: 220,
      align: 'left',
      render: (item, record) =>
        item && <TruncateText maxLength={180} text={item} />,
    },
    {
      title: 'Liên kết',
      dataIndex: 'link',
      key: 'link',
      width: 120,
      align: 'left',
    },
    {
      title: 'Link tiêu đề',
      dataIndex: 'linkTitle',
      key: 'linkTitle',
      width: 120,
      align: 'left',
    },
    {
      title: 'Link mô tả',
      dataIndex: 'linkDescription',
      key: 'linkDescription',
      width: 120,
      align: 'left',
    },
    {
      title: 'Thích',
      dataIndex: 'totalLikes',
      key: 'totalLikes',
      width: 120,
      align: 'center',
      sorter: true,
    },
    {
      title: 'Phản hồi',
      dataIndex: 'totalReplies',
      key: 'totalReplies',
      width: 120,
      align: 'center',
      sorter: true,
    },
    {
      title: 'Chia sẻ',
      dataIndex: 'totalShares',
      key: 'totalShares',
      width: 120,
      align: 'center',
      sorter: true,
    },
    {
      title: 'Top',
      dataIndex: 'isTop',
      key: 'isTop',
      width: 120,
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
      title: 'Chuyên gia',
      dataIndex: 'isExpertIdea',
      key: 'isExpertIdea',
      width: 120,
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
      title: 'Ngày tạo',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      align: 'left',
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
          <EyeOutlined
            style={{ fontSize: '14px', color: '#0960bd' }}
            onClick={() => handleUpdate(String(record.postID))}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <MyPage
        pageApi={apiGeListPosts_FA}
        title={'Danh sách bài viết'}
        searchRender={<SearchUser />}
        forceUpdate={foceUpdate}
        // setDataExport={setDataExport}

        tableOptions={tableColums}
      />
      <FormCreate
        form={form}
        setFoceUpdate={setFoceUpdate}
        foceUpdate={foceUpdate}
        idPost={idPost}
        open={open}
        showDrawer={showDrawer}
        onClose={onClose}
      />
    </>
  );
};

export default ListUsers;
