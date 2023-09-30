//@ts-ignore
import { Form, Space } from 'antd';
import { FC, useState } from 'react';
import FeaturedIcon from '@/assets/icons/correct.png';
import NotFeaturedIcon from '@/assets/icons/remove.png';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { useLocale } from '@/locales';
import FormCreate from '../components/form_create';
import TruncateText from '../components/truncate-text';
import { apiGeListComments_FA } from '@/api/comments/api';
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
      title: 'Post Id',
      dataIndex: 'postID',
      key: 'postID',
      width: 80,
      align: 'left',
    },
    {
      title: 'Bình luận tốt',
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
      title: 'Trả lời bài viết',
      dataIndex: 'replyToPostID',
      key: 'replyToPostID',
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
      title: 'Top',
      dataIndex: 'isTop',
      key: 'isTop',
      width: 120,
      align: 'left',
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
      title: 'Ngày',
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
        pageApi={apiGeListComments_FA}
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
