//@ts-ignore
import { Form } from 'antd';
import { FC, useState } from 'react';
import FeaturedIcon from '@/assets/icons/correct.png'
import NotFeaturedIcon from '@/assets/icons/remove.png'
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { useLocale } from '@/locales';

import TruncateText from '../components/truncate-text';
import { apiGeListComments } from '@/api/comments/api';
import { convertTimestampToFormattedDate } from '@/pages/rooms/list/utils';
import SearchUser from '../components/search';
const ListUsers: FC = () => {
  const { t } = useLocale();
  const [foceUpdate, setFoceUpdate] = useState(false);

  const tableColums: MyPageTableOptions<any> = [
    {
      title: '#',
      dataIndex: 'no',
      key: 'no',
      align: 'left',
      width: 50,
    },
    // {
    //   title: 'Mã bài viết',
    //   dataIndex: 'postID',
    //   key: 'postID',
    //   width: 120,
    //   align: 'left',
    // },
    // {
    //   title: 'Mã người dùng',
    //   dataIndex: 'userId',
    //   key: 'userId',
    //   width: 120,
    //   align: 'left',
    // },
    // {
    //   title: 'Tiêu đề',
    //   dataIndex: 'title',
    //   key: 'title',
    //   width: 120,
    //   align: 'left',
    // },
    // {
    //   title: 'Mô tả',
    //   dataIndex: 'description',
    //   key: 'description',
    //   width: 120,
    //   align: 'left',
    //   render: (item, record) => (
    //     item && <TruncateText maxLength={180} text={item} />
    //   )
    // },
    // {
    //   title: 'Kiểu',
    //   dataIndex: 'type',
    //   key: 'type',
    //   width: 120,
    //   align: 'left',
    // },
    {
      title: 'Bình luận tốt',
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
    //   width: 120,
    //   align: 'left',
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
      sorter: true
    },
    {
      title: 'Phản hồi',
      dataIndex: 'totalReplies',
      key: 'totalReplies',
      width: 120,
      align: 'left',
      sorter: true
    },
    {
      title: 'Chia sẻ',
      dataIndex: 'totalShares',
      key: 'totalShares',
      width: 120,
      align: 'left',
      sorter: true
    },
    {
      title: 'Top',
      dataIndex: 'isTop',
      key: 'isTop',
      width: 120,
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
      title: 'Ngày',
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
        pageApi={apiGeListComments}
        title={'Danh sách bình luận'}
        searchRender={<SearchUser />}
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
