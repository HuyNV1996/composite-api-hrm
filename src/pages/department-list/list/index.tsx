import MyPage, { MyPageTableOptions } from '@/components/business/page';
import MyTable from '@/components/core/table';
import { Button, Form, Space, Tooltip } from 'antd';
import { FC } from 'react';
import { useEffect, useState } from 'react';
import { setGlobalState } from '@/stores/global.store';
import store from '@/stores';
import { message as $message } from 'antd';
import {
  IDepartment,
  IFilterDepartmentParams,
  deleteDepartment,
  getDepartmentWithFilter,
} from '@/api/department/department.api';
import SearchDepartment from '../components/search';
import { useLocale } from '@/locales';
import { EditOutlined } from '@ant-design/icons';
import FormDepartment from '../handle';
import { getAllPosts } from '@/api/post/common.api';
import { IPost } from '@/interface/post/post';

const DepartmentList: FC = () => {
  const { t } = useLocale();
  const [selectedRowArr, setSelectedRowArr] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [forceClearSelection, setForceClearSelection] = useState(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [idDepartment, setIdDepartment] = useState<string>('');
  const _getPostListByArgs = async (params: any) => {
    const res = await getAllPosts(params);
    console.log(params);

    if (res) {
      store.dispatch(setGlobalState({ loading: true }));
      return res;
    }
  };
  const handleEdit = (id: string) => {
    setIsCreating(false);
    setIdDepartment(id);
    showDrawer();
  };
  const tableColumns: MyPageTableOptions<IPost> = [
    {
      title: '#',
      dataIndex: 'no',
      key: 'no',
      align: 'left',
      width: 50,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'left',
      width: 50,
    },
    {
      title: 'Mã người dùng',
      dataIndex: 'userId',
      key: 'userId',
      width: 120,
      align: 'left',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      width: 120,
      align: 'left',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 120,
      align: 'left',
    },
    {
      title: 'Kiểu',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      align: 'left',
    },
    {
      title: 'Sentiment',
      dataIndex: 'sentiment',
      key: 'sentiment',
      width: 120,
      align: 'left',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      width: 120,
      align: 'left',
    },
    {
      title: 'Original Content',
      dataIndex: 'originalContent',
      key: 'originalContent',
      width: 120,
      align: 'left',
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
      title: 'replyToPostID',
      dataIndex: 'replyToPostID',
      key: 'replyToPostID',
      width: 120,
      align: 'left',
    },
    {
      title: 'Số lượt thích',
      dataIndex: 'totalLikes',
      key: 'totalLikes',
      width: 120,
      align: 'left',
    },
    {
      title: 'Số lượt phản hồi',
      dataIndex: 'totalReplies',
      key: 'totalReplies',
      width: 120,
      align: 'left',
    },
    {
      title: 'Số lượt chia sẻ',
      dataIndex: 'totalShares',
      key: 'totalShares',
      width: 120,
      align: 'left',
    },
    {
      title: 'isTop',
      dataIndex: 'isTop',
      key: 'isTop',
      width: 120,
      align: 'left',
    },
    {
      title: 'isExpertIdea',
      dataIndex: 'isExpertIdea',
      key: 'isExpertIdea',
      width: 120,
      align: 'left',
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      align: 'left',
    },
  ];
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleCreate = async () => {
    form.resetFields();
    showDrawer();
    setIsCreating(true);
  };
  const handleDelete = async () => {
    if (selectedRowArr.length === 0) {
      $message.error('Vui lòng chọn phòng ban cần xóa');
      return;
    }
    const total_employee = selectedRowArr.some(item => item.total_employee > 0);
    if (total_employee) {
      $message.error('Không thể xóa phòng ban đang có nhân viên');
      setForceClearSelection(!forceClearSelection);
      setSelectedRowArr([]);
      return;
    }
    const ids = selectedRowArr.map(item => item.id);
    store.dispatch(setGlobalState({ loading: true }));
    await Promise.all(
      ids.map(async id => {
        deleteDepartment(Number(id))
          .then(res => {
            if (res) {
              $message.success('Xóa phòng ban thành công');
              setForceUpdate(!forceUpdate);
              setForceClearSelection(!forceClearSelection);
              setSelectedRowArr([]);
            }
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            store.dispatch(setGlobalState({ loading: false }));
          });
      })
    );
  };
  return (
    <>
      <MyPage
        pageApi={_getPostListByArgs}
        title="Quản lý phòng ban"
        tableOptions={tableColumns}
        searchRender={<SearchDepartment />}
        forceUpdate={forceUpdate}
        forceClearSelection={forceClearSelection}
        setSelectedRowData={setSelectedRowArr}
        multipleSelection
        slot={
          <>
            <Button type="primary" onClick={handleCreate}>
              {'Thêm mới'}
            </Button>
            <Button type="primary" onClick={handleDelete}>
              {'Xóa'}
            </Button>
          </>
        }
      />
      <FormDepartment
        form={form}
        setForceUpdate={setForceUpdate}
        forceUpdate={forceUpdate}
        idDepartment={idDepartment}
        open={open}
        showDrawer={showDrawer}
        onClose={onClose}
        isCreating={isCreating}
      />
    </>
  );
};

export default DepartmentList;
