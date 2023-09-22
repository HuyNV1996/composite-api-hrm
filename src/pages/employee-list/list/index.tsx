//@ts-ignore
import XlsExport from 'xlsexport';
import { Button, Divider, Form, Popconfirm, Space, Tag } from 'antd';
import { FC, useEffect, useState } from 'react';
import { message as $message } from 'antd';
import SearchEmployeee from '../components/search';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { useLocale } from '@/locales';

import { formatDate } from '@/utils/formatDate';
import {
  ICompany_id,
  IEmployeeListColumn,
  IEmployeeeArgsResult,
  IFilterEmployeesArgs,
  IFilterEmployeesParams,
} from '@/interface/employees/employee';
import {
  createUserFromEmployee,
  deleteEmployee,
  getEmployeeByArgs,
} from '@/api/employee/employee.api';
import FormEmployee from '../handle';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FormOutlined,
  LockOutlined,
} from '@ant-design/icons';
import store from '@/stores';
import { setGlobalState } from '@/stores/global.store';
import ChangePasswordForm from '../handle/changePassword';
import { getAllComments } from '@/api/comment/common.api';
import { IComment } from '@/interface/comment/comment';
const ListEmployee: FC = () => {
  const [form] = Form.useForm();
  const [foceUpdate, setFoceUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [forceClearSelection, setForceClearSelection] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [selectedRowArr, setSelectedRowArr] = useState<any[]>([]);
  const [isIdEmployee, setIdEmployee] = useState<string>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const { t } = useLocale();

  //
  const _getCommentListByArgs = async (params: any) => {
    const res = await getAllComments(params);
    console.log(params);

    if (res) {
      store.dispatch(setGlobalState({ loading: true }));
      return res;
    }
  };

  const handleView = (id: string) => {
    console.log(id);
    setIsViewMode(true);
    setIdEmployee(id);
    showDrawer();
  };
  const showDrawerChangePassword = () => {
    setChangePassword(true);
  };
  const handleDelete = async () => {
    if (selectedRowArr.length === 0) {
      $message.error('Vui lòng chọn ít nhất 1 nhân viên');
      return;
    }
    store.dispatch(setGlobalState({ loading: true }));
    const ids = selectedRowArr.map((item: any) => item.key);
    await Promise.all(ids.map(key => deleteEmployee(key)))
      .then(res => {
        if (res) {
          $message.success('Xoá nhân viên thành công');
          setFoceUpdate(!foceUpdate);
          setSelectedRowArr([]);
          setForceClearSelection(!forceClearSelection);
          store.dispatch(setGlobalState({ loading: false }));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleEdit = (id: string) => {
    setIsViewMode(false);
    setIdEmployee(id);
    showDrawer();
  };
  const tableColums: MyPageTableOptions<IComment> = [
    {
      title: '#',
      dataIndex: 'no',
      key: 'no',
      align: 'left',
      width: 50,
    },
    {
      title: 'Mã bài viết',
      dataIndex: 'postID',
      key: 'postID',
      width: 120,
      align: 'left',
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
  const changePasswordOnclose = () => {
    setChangePassword(false);
  };
  const onClose = () => {
    setOpen(false);
    setIsViewMode(!isViewMode);
    // setTimeout(() => setIdShift(null), 1000);
  };
  const handleCreate = async () => {
    await form.resetFields();
    showDrawer();
    setIsViewMode(false);
    setIsCreating(true);
  };

  const handleCreateUser = async () => {
    if (selectedRowArr.length === 0) {
      $message.error('Vui lòng chọn ít nhất 1 nhân viên');
      return;
    }
    const hasUserWithAccount = selectedRowArr.some(item => item.user_id);
    if (hasUserWithAccount) {
      $message.error('Nhân viên bạn chọn đã có tài khoản');
      setSelectedRowArr([]);
      setForceClearSelection(!forceClearSelection);
      return;
    }

    const ids = selectedRowArr.map((item: any) => item.key);
    store.dispatch(setGlobalState({ loading: true }));
    await Promise.all(ids.map(key => createUserFromEmployee(key)))
      .then(res => {
        if (res) {
          $message.success('Tạo tài khoản thành công');
          setFoceUpdate(!foceUpdate);
          setSelectedRowArr([]);
          setForceClearSelection(!forceClearSelection);
          store.dispatch(setGlobalState({ loading: false }));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleChangePassword = async (id: any) => {
    setIdEmployee(id);
    showDrawerChangePassword();
  };
  useEffect(() => {
    console.log(selectedRowArr);
  }, [selectedRowArr]);
  return (
    <>
      <MyPage
        pageApi={_getCommentListByArgs}
        title={'Danh sách nhân viên'}
        searchRender={<SearchEmployeee />}
        forceClearSelection={forceClearSelection}
        tableOptions={tableColums}
        setSelectedRowData={setSelectedRowArr}
        forceUpdate={foceUpdate}
        multipleSelection
        slot={
          <>
            <Button type="primary" onClick={handleCreate}>
              Thêm mới
            </Button>
            <Button type="primary" onClick={handleCreateUser}>
              Tạo tài khoản
            </Button>
            <Button type="primary" onClick={handleDelete}>
              Xoá
            </Button>
          </>
        }
      />
      <FormEmployee
        form={form}
        setFoceUpdate={setFoceUpdate}
        foceUpdate={foceUpdate}
        idEmployee={isIdEmployee}
        open={open}
        isViewMode={isViewMode}
        showDrawer={showDrawer}
        onClose={onClose}
        isCreating={isCreating}
      />
      <ChangePasswordForm
        form={form}
        onClose={changePasswordOnclose}
        open={changePassword}
        showDrawer={showDrawerChangePassword}
        idEmployee={isIdEmployee}
      />
    </>
  );
};

export default ListEmployee;
