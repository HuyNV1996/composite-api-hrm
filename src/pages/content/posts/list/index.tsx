//@ts-ignore
import XlsExport from 'xlsexport';
import { Button, Divider, Form, Popconfirm, Space, Tag, Tooltip } from 'antd';
import { FC, useState } from 'react';
import FeaturedIcon from '@/assets/icons/correct.png';
import NotFeaturedIcon from '@/assets/icons/remove.png';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { useLocale } from '@/locales';
import {
  BlockOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EyeOutlined,
  FormOutlined,
  SendOutlined,
} from '@ant-design/icons';

import SearchUser from '../components/search';
import { formatDate } from '@/utils/formatDate';
import { apiGeListUsers } from '@/api/users/api';
import TruncateText from '../components/truncate-text';
import { apiGeListPosts } from '@/api/posts/api';
import { convertTimestampToFormattedDate } from '@/utils/timeStampToDate';
import FormCreate from '../components/form_create';
import { useNavigate } from 'react-router-dom';

const ListPosts: FC = () => {
  const { t } = useLocale();
  const [foceUpdate, setFoceUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [idPost, setIdPost] = useState<any>(null);
  const [form] = Form.useForm();
  const [formSend] = Form.useForm();
  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setTimeout(() => setIdPost(null), 1000);
  };
  const handleUpdate = (id: string) => {
    // setIdPost(id);
    // showDrawer();
    navigate(`/posts/view/${id}`, { replace: true });
  };
  const handleSendPost = (id: string) => {
    navigate(`/posts/send/${id}`, { replace: true });
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
      dataIndex: 'postId',
      key: 'postId',
      width: 80,
      align: 'left',
      sorter: (a, b) => a.postId - b.postId,
    },
    {
      title: 'Site',
      dataIndex: 'site',
      key: 'site',
      width: 120,
      align: 'left',
      sorter: true,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      width: 220,
      align: 'left',
      sorter: (a, b) => a.title - b.title,
    },
    // {
    //   title: 'Mô tả',
    //   dataIndex: 'description',
    //   key: 'description',
    //   width: 220,
    //   align: 'left',
    //   render: (item, record) =>
    //     item && <TruncateText maxLength={180} text={item} />,
    // },
    // {
    //   title: 'Tin tốt',
    //   dataIndex: 'sentiment',
    //   key: 'sentiment',
    //   width: 120,
    //   align: 'center',
    //   sorter: true,
    //   render: item => {
    //     if (item) {
    //       return <img src={FeaturedIcon} alt="image" />;
    //     } else {
    //       return <img src={NotFeaturedIcon} alt="image" />;
    //     }
    //   },
    // },
    {
      title: 'Nội dung',
      dataIndex: 'originalContent',
      key: 'originalContent',
      width: 220,
      align: 'left',
      sorter: (a, b) => a.originalContent - b.originalContent,
      render: (item, record) =>
        item && <TruncateText maxLength={180} text={item} />,
    },
    {
      title: 'Liên kết',
      dataIndex: 'link',
      key: 'link',
      width: 120,
      align: 'center',
      sorter: (a, b) => a.link - b.link,
      render: (item) => <Tooltip title={item}>
        {item && <a href={item}> <BlockOutlined /></a>}
      </Tooltip>

    },
    {
      title: 'Link tiêu đề',
      dataIndex: 'linkTitle',
      key: 'linkTitle',
      width: 120,
      align: 'left',
      sorter: (a, b) => a.linkTitle - b.linkTitle,
      render: (item) => <Tooltip title={item}>
        {item && <a href={item}> <BlockOutlined /></a>}
      </Tooltip>
    },
    {
      title: 'Link mô tả',
      dataIndex: 'linkDescription',
      key: 'linkDescription',
      width: 120,
      align: 'left',
      sorter: (a, b) => a.linkDescription - b.linkDescription,
      render: (item) => <Tooltip title={item}>
        {item && <a href={item}> <BlockOutlined /></a>}
      </Tooltip>
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
      title: 'Bình luận',
      dataIndex: 'totalComments',
      key: 'totalComments',
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
              onClick={() => handleUpdate(String(record.postId))}
            />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title={'Tạo bài viết seeding'}>
            <SendOutlined
              style={{ fontSize: '14px', color: '#0960bd' }}
              onClick={() => handleSendPost(String(record.postId))}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <MyPage
        pageApi={apiGeListPosts}
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

export default ListPosts;
