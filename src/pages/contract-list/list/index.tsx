import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { FC } from 'react';
import { setGlobalState } from '@/stores/global.store';
import store from '@/stores';
import { formatDate } from '@/utils/formatDate';
import { IContract, IContractArgs } from '@/interface/contract/contract';
import {
  deleteContractById,
  getContractByArgs,
  updateContractState,
} from '@/api/contract/contract.api';
import { useState } from 'react';
import SearchContract from '../components/search';
import { message as $message } from 'antd';
import { useLocale } from '@/locales';
import { Button, Divider, Form, Space, Tag } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import FormContract from '../handle';
import FileForm from '../handle/fileForm';
import { IUser, IUserArgs } from '@/interface/users/users';
import { IGetAllUsers, getAllUsers } from '@/api/user/common.api';
const ContractList: FC = () => {
  const [form] = Form.useForm();
  const { t } = useLocale();
  const [forceUpdate, setForceUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [selectedRowArr, setSelectedRowArr] = useState<any[]>([]);
  const [forceClearSelection, setForceClearSelection] = useState(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [idContract, setIdContract] = useState<any>(undefined);

  //
  const _getUserListByArgs = async (params: any) => {
    const res = await getAllUsers(params);
    console.log(params);

    if (res) {
      store.dispatch(setGlobalState({ loading: true }));
      return res;
    }
  };

  const handleDelete = async () => {
    if (selectedRowArr.length === 0) {
      $message.error('Vui lòng chọn ít nhất 1 hợp đồng để xóa');
      return;
    }

    const ids = selectedRowArr.map((item: IUser) => item.id);
    try {
      store.dispatch(setGlobalState({ loading: true }));
      const numericIds = ids.map(id => parseInt(id, 10));
      await Promise.all(numericIds.map(id => deleteContractById(id)));
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedRowArr([]);
      setForceClearSelection(!forceClearSelection);
      setForceUpdate(!forceUpdate);
      store.dispatch(setGlobalState({ loading: false }));
      $message.success('Xóa hợp đồng thành công');
    }
  };

  const handleUpdate = () => {
    setForceUpdate(!forceUpdate);
    updateContractState();
  };
  const handleImport = () => {
    showDrawerImport();
  };
  const showDrawerImport = () => {
    setImportOpen(true);
  };
  const handleCreate = () => {
    setIsCreating(true);
    showDrawer();
    setIdContract(undefined);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const handleEdit = (id: number) => {
    setIsCreating(false);
    setIdContract(id);
    showDrawer();
  };
  const onClose = () => {
    setOpen(false);
    setImportOpen(false);
  };
  const tableColums: MyPageTableOptions<IUser> = [
    {
      title: '#',
      dataIndex: 'no',
      key: 'no',
      width: 30,
      align: 'left',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 110,
      align: 'left',
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'username',
      key: 'username',
      width: 110,
      align: 'left',
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'password',
      key: 'password',
      width: 110,
      align: 'left',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      align: 'left',
    },
    {
      title: 'Bio',
      dataIndex: 'bio',
      key: 'bio',
      width: 100,
      align: 'left',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 100,
      align: 'left',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 100,
      align: 'left',
    },
    {
      title: 'Facebook',
      dataIndex: 'facebookLink',
      key: 'facebookLink',
      width: 100,
      align: 'left',
    },
    {
      title: 'Chuyên gia',
      dataIndex: 'isExpert',
      key: 'isExpert',
      width: 100,
      align: 'left',
    },
    {
      title: 'Giáo viên',
      dataIndex: 'isTeacher',
      key: 'isTeacher',
      width: 100,
      align: 'left',
    },
    {
      title: 'Đã chặn',
      dataIndex: 'blocked',
      key: 'blocked',
      width: 100,
      align: 'left',
    },
    {
      title: 'Số bài viết',
      dataIndex: 'totalPosts',
      key: 'totalPosts',
      width: 100,
      align: 'left',
    },
    {
      title: 'Số lượt thích',
      dataIndex: 'totalLikes',
      key: 'totalLikes',
      width: 100,
      align: 'left',
    },
    {
      title: 'Người theo dõi',
      dataIndex: 'followers',
      key: 'followers',
      width: 100,
      align: 'left',
    },
    {
      title: 'Đang theo dõi',
      dataIndex: 'following',
      key: 'following',
      width: 100,
      align: 'left',
    },
    // {
    //   title: t({ id: 'action' }),
    //   key: 'id',
    //   dataIndex: 'id',
    //   fixed: 'right',
    //   width: 100,
    //   align: 'center',
    //   render: item => (
    //     <Space size="middle">
    //       <EditOutlined
    //         style={{ fontSize: '14px', color: '#0960bd' }}
    //         onClick={() => handleEdit(item)}
    //       />
    //     </Space>
    //   ),
    // },
  ];
  return (
    <>
      <MyPage
        title="Danh sách hợp đồng"
        pageApi={_getUserListByArgs}
        tableOptions={tableColums}
        forceUpdate={forceUpdate}
        searchRender={<SearchContract />}
        setSelectedRowData={setSelectedRowArr}
        forceClearSelection={forceClearSelection}
        multipleSelection
        slot={
          <>
            <Button type="primary" onClick={handleImport}>
              Import
            </Button>
            <Button type="primary" onClick={handleCreate}>
              Tạo mới
            </Button>
            <Button type="primary" onClick={handleDelete}>
              Xóa
            </Button>
          </>
        }
      />
      <FormContract
        onClose={onClose}
        showDrawer={showDrawer}
        open={open}
        idContract={idContract}
        setForceUpdate={setForceUpdate}
        forceUpdate={forceUpdate}
        form={form}
        isCreating={isCreating}
      />
      <FileForm
        onClose={onClose}
        showDrawerImport={showDrawerImport}
        importOpen={importOpen}
        setForceUpdate={setForceUpdate}
        forceUpdate={forceUpdate}
        form={form}
      />
    </>
  );
};
export default ContractList;
