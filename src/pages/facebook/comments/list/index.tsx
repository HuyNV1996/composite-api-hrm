//@ts-ignore
import { Form, Space } from 'antd';
import { FC, useState } from 'react';
import FeaturedIcon from '@/assets/icons/correct.png';
import NotFeaturedIcon from '@/assets/icons/remove.png';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { useLocale } from '@/locales';
import FormCreate from '../components/form_create';
import TruncateText from '../components/truncate-text';
import { apiGeListComments_FA, apiGeListComments_FB } from '@/api/comments/api';
import { convertTimestampToFormattedDate } from '@/pages/fireant/rooms/list/utils';
import SearchUser from '../components/search';
import { EyeOutlined } from '@ant-design/icons';
const ListUsers: FC = () => {
  const { t } = useLocale();
  const [foceUpdate, setFoceUpdate] = useState(false);
  const [idComment, setIdComment] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const handleUpdate = (id: string) => {
    setIdComment(id);
    showDrawer();
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setTimeout(() => setIdComment(null), 1000);
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
      title: 'User Id',
      dataIndex: 'userId',
      key: 'userId',
      width: 80,
      align: 'left',
    },
    {
      title: 'Comment Id',
      dataIndex: 'commentId',
      key: 'commentId',
      width: 80,
      align: 'left',
    },
    {
      title: 'Nội dung',
      dataIndex: 'commentText',
      key: 'commentText',
      width: 220,
      align: 'left',
      render: (item, record) =>
        item && <TruncateText maxLength={180} text={item} />,
    },
    {
      title: 'Comment Id',
      dataIndex: 'commentUrl',
      key: 'commentUrl',
      width: 80,
      align: 'left',
    },
    {
      title: 'Link ảnh',
      dataIndex: 'commentImage',
      key: 'commentImage',
      width: 120,
      align: 'left',
      render: (item, record) => item && <img src={item} alt='no image'/>
    },
    {
      title: 'Link bài viết',
      dataIndex: 'postUrl',
      key: 'postUrl',
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
      dataIndex: 'totalComments',
      key: 'totalComments',
      width: 120,
      align: 'left',
      sorter: true,
    },
    {
      title: 'Chia sẻ',
      dataIndex: 'totalShares',
      key: 'totalShares',
      width: 120,
      align: 'left',
      sorter: true,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'commentTime',
      key: 'commentTime',
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
        pageApi={apiGeListComments_FB}
        title={'Danh sách bình luận'}
        searchRender={<SearchUser />}
        forceUpdate={foceUpdate}
        // setDataExport={setDataExport}
        tableOptions={tableColums}
      />
      <FormCreate
        form={form}
        setFoceUpdate={setFoceUpdate}
        foceUpdate={foceUpdate}
        idComment={idComment}
        open={open}
        showDrawer={showDrawer}
        onClose={onClose}
      />
    </>
  );
};

export default ListUsers;
