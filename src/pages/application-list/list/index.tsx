import React, { useEffect, useState } from 'react';
import Search from '../components/search';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import SearchApplicationList from '../components/search';
import { Button, Tag } from 'antd';
import { IApplicationList } from '@/interface/applicationlist/type';
import { deleteLeave, searchListLeave } from '@/api/weeklyreport/weeklyreport';
import {
  ISearchLeaveListBody,
  ISearchLeaveListPages,
  ISearchLeaveListParams,
  IUpdateStatusLeaveBody,
  IUpdateStatusLeaveParams,
} from './type';
import './style.css';
import { formatDate, formatDateLeave } from '@/utils/formatDate';
import { updateStatusLeave } from '@/api/shift/leavetype';
import { formatLeaveArr } from '@/utils/common';
import { message as $message } from 'antd';
import { setGlobalState } from '@/stores/global.store';
import store from '@/stores';
const index = () => {
  const [selectedRowArr, setSelectedRowArr] = useState<any[]>([]);
  const [foceUpdate, setFoceUpdate] = useState(false);
  const [forceClearSelection, setForceClearSelection] = useState(false);
  const tableColums: MyPageTableOptions<IApplicationList> = [
    {
      title: '#',
      dataIndex: 'no',
      key: 'no',
      align: 'left',
      width: 40,
      render: index => {
        return <p>{index + 1}</p>;
      },
    },
    {
      title: 'Trạng thái ',
      dataIndex: 'state',
      key: 'state',
      align: 'left',
      width: 100,
      render: (item: string) => {
        if (item.toLowerCase() === 'confirm') {
          return (
            <Tag className="tags" color="#8F6161">
              Chờ duyệt
            </Tag>
          );
          //  <p className="table-state table-state-not">Chờ duyệt</p>;
        } else if (item.toLowerCase() === 'refuse') {
          return (
            <Tag className="tags" color="#cd201f">
              Từ chối
            </Tag>
          );
        } else if (item.toLowerCase() === 'validate') {
          return (
            <Tag className="tags" color="#22D73F">
              Đã duyệt
            </Tag>
          );
        }
      },
    },
    {
      title: 'Họ và tên',
      dataIndex: 'employee_name',
      key: 'employee_name',
      width: 150,
      align: 'left',
    },
    {
      title: 'Mã nhân viên',
      dataIndex: 'employee_code',
      key: 'employee_code',
      width: 120,
      align: 'left',
    },
    {
      title: 'Công ty',
      dataIndex: 'company_name',
      key: 'company_name',
      width: 120,
      align: 'left',
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department_name',
      key: 'department_name',
      width: 100,
      align: 'left',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
      key: 'position',
      width: 100,
      align: 'left',
    },
    {
      title: 'Loại đơn',
      dataIndex: 'holiday_status_name',
      key: 'holiday_status_name',
      width: 100,
      align: 'left',
      render: item => {
        return <div>{item?.vi_VN}</div>;
      },
    },
    {
      title: 'Vì lý do',
      dataIndex: 'for_reasons',
      key: 'for_reasons',
      width: 100,
      align: 'left',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'create_date',
      key: 'create_date',
      width: 100,
      align: 'left',
      render: item => {
        return <div>{formatDate(item)}</div>;
      }
    },
    {
      title: 'Lý do',
      dataIndex: 'reasons',
      key: 'reasons',
      width: 120,
      align: 'left',
    },
    {
      title: 'Từ ngày',
      dataIndex: 'from_date',
      key: 'from_date',
      width: 100,
      align: 'left',
      render: item => {
        return <div>{formatDate(item)}</div>;
      }
    },
    {
      title: 'Đến ngày',
      dataIndex: 'date_to',
      key: 'date_to',
      width: 100,
      align: 'left',
      render: item => {
        return <div>{formatDate(item)}</div>;
      }
    },
    // {
    //   title: 'Số giờ nghỉ', // TODO
    //   dataIndex: 'time',
    //   key: 'rest',
    //   width: 100,
    //   align: 'left',
    // },
    {
      title: 'Số phút', // TODO
      dataIndex: 'minutes',
      key: 'minutes',
      width: 100,
      align: 'left',
    },
    {
      title: 'Người duyệt',
      dataIndex: 'approved_by',
      key: 'approved_by',
      width: 100,
      align: 'left',
    },
    {
      title: 'Ngày duyệt',
      dataIndex: 'approval_date',
      key: 'approval_date',
      width: 100,
      align: 'left',
      render: (item) => {
        if (item != null) {
          return <div>{formatDate(item)}</div>;
        }
        else {
          return <span></span>;
        }

      }
    },
  ];
  const handleApprove = () => {
    // console.log('Approve');
    _updateStatusLeaveList(selectedRowArr, 'validate');
  };
  const handleCancel = () => {
    // console.log('Cancel');
    _updateStatusLeaveList(selectedRowArr, 'refuse');
  };
  const searhListLeave = async ({
    type_leave,
    date,
    status,
    employee_code,
    employee_name,
    page_size,
    page,
  }: any) => {
    const pages: ISearchLeaveListPages = {
      page_size: page_size,
      page: page,
    };
    const params: ISearchLeaveListParams = {
      args: [
        formatDateLeave(date) || '',
        type_leave?.toString() || '',
        status || '',
        (employee_code ?? '').trim(),
        (employee_name ?? '').trim(),
      ], // ngày tạo đơn, loại đơn, trạng thái đơn
      pages: pages,
    };
    const body: ISearchLeaveListBody = {
      params: params,
    };
    store.dispatch(setGlobalState({ loading: true }));
    const res = await searchListLeave(body);
    if (res) {
      store.dispatch(setGlobalState({ loading: false }));
      return res;
    }
  };
  const _updateStatusLeaveList = async (selectedRow: any[], status: string) => {
    const args: string[] = [formatLeaveArr(selectedRow), status];
    const params: IUpdateStatusLeaveParams = {
      args: args,
    };
    const body: IUpdateStatusLeaveBody = {
      params: params,
    };
    const res = await updateStatusLeave(body);
    if (res.result) {
      if (!res.result.is_success) {
        $message.error("Đơn đã được duyệt hoặc từ chối trước đó!");
        return;
      }
      setFoceUpdate(!foceUpdate);
      setForceClearSelection(!forceClearSelection);
      $message.success('Cập nhật trạng thái thành công!');
    }
  };
  const handleDelete = async () => {
    if (selectedRowArr.length === 0) {
      $message.error('Vui lòng chọn ít nhất 1 đơn');
      return;
    }
    if (selectedRowArr.some((item: any) => item.state !== "confirm")) {
      $message.error("Chỉ được xóa đơn trong trạng thái chờ duyệt")
      return;
    }
    store.dispatch(setGlobalState({ loading: true }));
    const ids = selectedRowArr.map((item: any) => item.id);
    await Promise.all(ids.map((id) => deleteLeave(id))).then((res) => {
      if (res) {
        $message.success('Xoá đơn thành công');
        setFoceUpdate(!foceUpdate);
        setSelectedRowArr([]);
        setForceClearSelection(!forceClearSelection);
        store.dispatch(setGlobalState({ loading: false }));
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    console.log('selectedRow', selectedRowArr);
  }, [selectedRowArr]);
  return (
    <>
      <MyPage
        pageApi={searhListLeave}
        multipleSelection
        forceUpdate={foceUpdate}
        title={'Danh sách đơn yêu cầu'}
        searchRender={<SearchApplicationList />}
        tableOptions={tableColums}
        setSelectedRowData={setSelectedRowArr}
        forceClearSelection={forceClearSelection}
        slot={
          <>
            <Button type="primary" onClick={handleApprove}>
              {'Duyệt đơn'}
            </Button>
            <Button type="primary" onClick={handleCancel}>
              {'Hủy đơn'}
            </Button>
            <Button type='primary' onClick={handleDelete}>
              Xoá đơn
            </Button>
          </>
        }
      />
    </>
  );
};

export default index;
