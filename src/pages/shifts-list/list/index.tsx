//@ts-ignore
import XlsExport from 'xlsexport';
import {
  Button,
  Card,
  Divider,
  Form,
  Popconfirm,
  Space,
  Tag,
  Tooltip,
} from 'antd';
import { FC, useState, useEffect } from 'react';
import { message as $message } from 'antd';
import { setGlobalState } from '@/stores/global.store';
import store from '@/stores';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { useLocale } from '@/locales';
import moment from 'moment';
import { formatDate } from '@/utils/formatDate';
import { companyOptions } from '@/const/options';
import { IShiftsListColumn } from '@/interface/shifts/shifts';
import { deleteShiftById, getListShifts } from '@/api/shift/shift.api';
import SearchShift from '../components/search/index';
import FormShift from '../handle/FormShift';
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { leaveTypeOptions } from '@/const/options';
import { getAllRooms } from '@/api/room/common.api';
const ShiftList: FC = () => {
  const { t } = useLocale();
  const [form] = Form.useForm();
  const [foceUpdate, setFoceUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [idShift, setIdShift] = useState<any>(null);
  const [company, setCompany] = useState<any[]>([]);
  const [leaveType, setLeaveType] = useState<any[]>([]);
  const [selectedRowArr, setSelectedRowArr] = useState<any[]>([]);
  const [forceClearSelection, setForceClearSelection] = useState(false);

  useEffect(() => {
    companyOptions().then(res => {
      // console.log(res);
      setCompany(res);
    });
    leaveTypeOptions().then(res => {
      // console.log(res);
      setLeaveType(res);
    });
  }, []);
  const _getRoomListByArgs = async (params: any) => {
    const res = await getAllRooms(params);
    console.log(params);

    if (res) {
      store.dispatch(setGlobalState({ loading: true }));
      return res;
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setTimeout(() => setIdShift(null), 1000);
  };
  const tableColums: MyPageTableOptions<IShiftsListColumn> = [
    {
      title: '#',
      dataIndex: 'no',
      key: 'id',
      width: 50,
      align: 'left',
    },
    {
      title: 'Mã phòng',
      dataIndex: 'roomID',
      key: 'roomID',
      width: 110,
      align: 'left',
    },
    {
      title: 'Tên phòng',
      dataIndex: 'name',
      key: 'name',
      width: 50,
      align: 'left',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 50,
      align: 'left',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 50,
      align: 'left',
    },
    {
      title: 'Ưu tiên',
      dataIndex: 'privacy',
      key: 'privacy',
      width: 50,
      align: 'left',
    },
    {
      title: 'Visibility',
      dataIndex: 'visibility',
      key: 'visibility',
      width: 50,
      align: 'left',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 50,
      align: 'left',
    },
    {
      title: 'Approved',
      dataIndex: 'approved',
      key: 'approved',
      width: 50,
      align: 'left',
    },
    {
      title: 'Blocked',
      dataIndex: 'blocked',
      key: 'blocked',
      width: 50,
      align: 'left',
    },
    {
      title: 'Verified',
      dataIndex: 'verified',
      key: 'verified',
      width: 50,
      align: 'left',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: 50,
      align: 'left',
    },
  ];
  const handleDelete = () => {
    if (selectedRowArr.length === 0) {
      $message.error('Vui lòng chọn giải trình');
    } else {
      store.dispatch(setGlobalState({ loading: true }));
      selectedRowArr.map(async item => {
        try {
          const res = await deleteShiftById(item.id);
          if (res) {
            store.dispatch(setGlobalState({ loading: false }));
            $message.success('Xoá thành công');
            setFoceUpdate(!foceUpdate);
            setForceClearSelection(!forceClearSelection);
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
  };
  const handleUpdate = async (record: any) => {
    await form.resetFields();
    console.log('record is', record);
    updateidShift(record.id);
    let c_start_work = moment(
      '1000-11-11' + record.c_start_work_time,
      'YYYY-MM-DD HH:mm'
    );
    let c_end_work = moment(
      '1000-11-11' + record.c_end_work_time,
      'YYYY-MM-DD HH:mm'
    );
    let c_start_rest = moment(
      '1000-11-11' + record.c_start_rest_time,
      'YYYY-MM-DD HH:mm'
    );
    let c_end_rest = moment(
      '1000-11-11' + record.c_end_rest_time,
      'YYYY-MM-DD HH:mm'
    );

    form.setFieldsValue({
      name: record.name,
      rest_shifts: record.rest_shifts,
      fix_rest_time: record.fix_rest_time,
      breakfast: record.breakfast,
      lunch: record.lunch,
      dinner: record.dinner,
      night: record.night,
      start_work_time: c_start_work,
      end_work_time: c_end_work,
      start_rest_time: c_start_rest,
      end_rest_time: c_end_rest,
      // fromToTime: [c_start_work, c_end_work],
      // TimeBreak: [c_start_rest, c_end_rest],

      rest_shift_id: record.rest_shift_id,
      company_id: record.company,
    });

    showDrawer();
  };

  const updateidShift = (id: any) => {
    setIdShift(id);
  };

  const handleCreate = async () => {
    await form.resetFields();
    showDrawer();
  };
  return (
    <>
      <MyPage
        pageApi={_getRoomListByArgs}
        title={'Danh sách ca'}
        searchRender={<SearchShift />}
        tableOptions={tableColums}
        forceUpdate={foceUpdate}
        setSelectedRowData={setSelectedRowArr}
        forceClearSelection={forceClearSelection}
        multipleSelection
        slot={
          <>
            <Button type="primary" onClick={handleCreate}>
              {t({ id: 'create' })}
            </Button>
            <Button type="primary" onClick={handleDelete}>
              {t({ id: 'delete' })}
            </Button>
          </>
        }
      />
      <FormShift
        form={form}
        setFoceUpdate={setFoceUpdate}
        foceUpdate={foceUpdate}
        idShift={idShift}
        open={open}
        showDrawer={showDrawer}
        onClose={onClose}
      />
    </>
  );
};

export default ShiftList;
