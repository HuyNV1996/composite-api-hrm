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
import { apiGeListPosts } from '@/api/posts/api';
import { convertTimestampToFormattedDate } from '@/pages/rooms/list/utils';
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
      key: 'no',
      align: 'left',
      width: 50,
    },
    // {
    //   title: 'Mã người dùng',
    //   dataIndex: 'userId',
    //   key: 'userId',
    //   width: 120,
    //   align: 'left',
    // },
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
      render: (item, record) => (
        item && <TruncateText maxLength={180} text={item} />
      )
    },
    // {
    //   title: 'Kiểu',
    //   dataIndex: 'type',
    //   key: 'type',
    //   width: 120,
    //   align: 'left',
    // },
    {
      title: 'Tin tốt',
      dataIndex: 'sentiment',
      key: 'sentiment',
      width: 120,
      align: 'center',
      sorter: true,
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
    // {
    //   title: 'Nội dung',
    //   dataIndex: 'content',
    //   key: 'content',
    //   width: 220,
    //   align: 'left',
    //   render: (item, record) => (
    //     item && <TruncateText maxLength={180} text={item} />
    //   )
    // },
    {
      title: 'Nội dung',
      dataIndex: 'originalContent',
      key: 'originalContent',
      width: 220,
      align: 'left',
      render: (item, record) => (
        item && <TruncateText maxLength={180} text={item} />
      )
    },
    {
      title: 'Ngôn ngữ',
      dataIndex: 'language',
      key: 'language',
      width: 120,
      align: 'left',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 120,
      align: 'left',
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
      sorter: true
    },
    {
      title: 'Phản hồi',
      dataIndex: 'totalReplies',
      key: 'totalReplies',
      width: 120,
      align: 'center',
      sorter: true
    },
    {
      title: 'Chia sẻ',
      dataIndex: 'totalShares',
      key: 'totalShares',
      width: 120,
      align: 'center',
      sorter: true
    },
    {
      title: 'Top',
      dataIndex: 'isTop',
      key: 'isTop',
      width: 120,
      align: 'center',
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
      title: 'Chuyên gia',
      dataIndex: 'isExpertIdea',
      key: 'isExpertIdea',
      width: 120,
      align: 'center',
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
      dataIndex: 'date',
      key: 'date',
      width: 120,
      align: 'left',
      render: (item, record) =>
        (<span>{item && convertTimestampToFormattedDate(Number(item))}</span>)
    },
  ];

  return (
    <>
      <MyPage
        pageApi={apiGeListPosts}
        title={'Danh sách bài viết'}
        // searchRender={<SearchUser />}
        forceUpdate={foceUpdate}
        // setDataExport={setDataExport}
        
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
