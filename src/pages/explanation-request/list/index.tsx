
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import MyTable from '@/components/core/table';

import { Button, Tooltip } from 'antd';
import { FC } from 'react';
import SearchExplainRequest from '../components/search';
import { IInvalidTimesheet } from '@/interface/weeklyreport/type';
import { useEffect, useState } from 'react';
import { IUpdateInvalidTimesheetArgs, deleteInvalidTimeeSheetById, getInvalidTimeeSheetByArgs, updateInvalidTimeeSheet } from "@/api/invalidTimesheet/invalidTimesheet.api"
import { setGlobalState } from '@/stores/global.store';
import store from '@/stores';
import { message as $message } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { formatDate } from '@/utils/formatDate';
import { convertDatetimeStringToHourMinute } from '@/utils/common';
import { stat } from 'fs';
const ExplanationRequest: FC = () => {
  const [selectedRowArr, setSelectedRowArr] = useState<any[]>([]);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [forceClearSelection, setForceClearSelection] = useState(false);
  const _getInvalidTimeeSheetByArgs = async (params: IInvalidTimesheet) => {
    store.dispatch(setGlobalState({ loading: true }));
    const res = await getInvalidTimeeSheetByArgs(params);
    if (res) {
      store.dispatch(setGlobalState({ loading: false }));
      return res;
    }
  }
  function floatToHourMinutes(floatValue: number): string {
    const hours = Math.floor(floatValue);
    const minutesDecimal = floatValue - hours;
    const minutes = Math.round(minutesDecimal * 60);

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${formattedMinutes}`;
  }
  function convertDatetimeStringToHourMinute(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  const handleApprove = async () => {
    if (selectedRowArr.length === 0) {
      $message.error('Vui lòng chọn giải trình');
    } else {
      store.dispatch(setGlobalState({ loading: true }));
      const itemsToValidate = selectedRowArr.filter((item: any) => item.validated !== "2" && item.validated !== "3");
      if (itemsToValidate.length === 0) {
        $message.warning('Tất cả giải trình đã được duyệt hoặc từ chối trước đó');
        setSelectedRowArr([]);
        setForceClearSelection(!forceClearSelection);
        return;
      }
      await Promise.all(
        itemsToValidate.map((item: any) => {
          const data: IUpdateInvalidTimesheetArgs = {
            id: Number(item.id),
            reason: item.reason,
            remarks: item.remarks,
            validated: "2",
            invalid_type: item.invalid_type
          };
          return updateInvalidTimeeSheet(data);
        })
      )
        .then(() => {
          $message.success('Duyệt thành công');
          setSelectedRowArr([]);
          setForceUpdate(!forceUpdate);
          setForceClearSelection(!forceClearSelection);
          store.dispatch(setGlobalState({ loading: false }));
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  const handleCancle = async () =>  {
    store.dispatch(setGlobalState({ loading: true }));
    if (selectedRowArr.length === 0) {
      $message.error('Vui lòng chọn giải trình');
    } else {
      const itemsToCancel = selectedRowArr.filter((item: any) => item.validated !== "3" && item.validated !== "2");
      if (itemsToCancel.length === 0) {
        $message.warning('Tất cả giải trình đã được từ chối hoặc duyệt trước đó');
        setSelectedRowArr([]);
        setForceClearSelection(!forceClearSelection);
        return;
      }
      await Promise.all(
        itemsToCancel.map((item: any) => {
          const data: IUpdateInvalidTimesheetArgs = {
            id: Number(item.id),
            reason: item.reason,
            remarks: item.remarks,
            validated: "3",
            invalid_type: item.invalid_type
          };
          return updateInvalidTimeeSheet(data);
        })
      )
        .then(() => {
          setSelectedRowArr([]);
          $message.success('Từ chối thành công');
          setForceUpdate(!forceUpdate);
          setForceClearSelection(!forceClearSelection);
          store.dispatch(setGlobalState({ loading: false }));
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  const handleDelete = async () => {
    store.dispatch(setGlobalState({ loading: true }));
    if (selectedRowArr.length === 0) {
      $message.error('Vui lòng chọn giải trình');
    } else {
      await Promise.all(
        selectedRowArr.map((item: any) => {
          const id: number = Number(item.id);
          return deleteInvalidTimeeSheetById(id);
        })
      )
        .then(() => {
          $message.success('Xóa thành công');
          setSelectedRowArr([]);
          setForceUpdate(!forceUpdate);
          setForceClearSelection(!forceClearSelection);
          store.dispatch(setGlobalState({ loading: true }));
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
  const tableColums: MyPageTableOptions<IInvalidTimesheet> = [
    {
      title: '#',
      dataIndex: 'no',
      key: 'no',
      width: 60,
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
      title: 'Họ và tên',
      dataIndex: 'employee_name',
      key: 'employee_name',
      width: 150,
      align: 'left',
    },
    {
      title: 'Vị trí',
      dataIndex: 'position',
      key: 'position',
      width: 80,
      align: 'left',
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      key: 'department',
      width: 200,
      align: 'left',
    },
    {
      title: 'Ngày vi phạm',
      dataIndex: 'invalid_date',
      key: 'invalid_date',
      width: 120,
      align: 'left',
      render: (item: string) => {
        return (
          <span>{item && formatDate(item)}</span>
        )
      }
    },
    {
      title: 'Loại giải trình',
      dataIndex: 'invalid_type',
      key: 'invalid_type',
      width: 110,
      align: 'left',
      render: (item: string) => {
        if (item === '1') {
          return (
            <span>
              Về sớm
            </span>
          )
        }
        else if (item === '2') {
          return (
            <span>
              Đi muộn
            </span>
          )
        }
      }
    },
    {
      title: 'Shift from-To',
      width: 100,
      align: 'center',
      children: [
        {
          title: 'From',
          dataIndex: 'shift_from',
          key: 'shift_from',
          align: 'center',
          width: 80,
          render: (item: number) => {
            return (
              <span>{item && floatToHourMinutes(item)}</span>
            )
          }
        },
        {
          title: 'To',
          dataIndex: 'shift_to',
          key: 'shift_to',
          align: 'center',
          width: 80,
          render: (item: number) => {
            return (
              <span>{item && floatToHourMinutes(item)}</span>
            )
          }
        }
      ]
    },
    {
      title: 'Ca gãy',
      dataIndex: 'shift_break',
      key: 'shift_break',
      width: 100,
      align: 'left',
      render: (item: string) => {
        if (item) {
          return (
            <span>
              <CheckOutlined />
            </span>
          )
        }
      }
    },
    {
      title: 'Chấm công thực tế',
      dataIndex: 'real_time_attendance_data',
      key: 'real_time_attendance_data',
      width: 140,
      align: 'left',
      render: (item: string) => {
        return (
          <span>{item && convertDatetimeStringToHourMinute(item)}</span>
        )
      }
    },
    {
      title: 'Validation data',
      dataIndex: 'validation_data',
      key: 'validation_data',
      width: 140,
      align: 'left',
      render: (item: number) => {
        return (
          <span>{item && floatToHourMinutes(item)}</span>
        )
      }
    },
    {
      title: 'Lý do',
      dataIndex: 'reason',
      key: 'reason',
      width: 100,
      align: 'left',
      render: (item: string) => {
        if (item === "1") {
          return (
            <span>
              Cá nhân
            </span>
          )
        }
        else if (item === "2") {
          return (
            <span>
              Công việc
            </span>
          )
        }
      }
    },
    {
      title: 'Đã duyệt',
      dataIndex: 'validated',
      key: 'validated',
      width: 100,
      align: 'left',
      render: (item: string) => {
        if (item == "2") {
          return (
            <span>
              <CheckOutlined color='green'/>
            </span>
          )
        }
        else if (item == "3") {
          return (
            <span>
              <CloseOutlined color='red' />
            </span>
          )
        }
        else {
          return (
            <span>

            </span>
          )
        }
      }
    },
    {
      title: "Người duyệt",
      dataIndex: 'reivewer',
      key: 'reivewer',
      width: 100,
      align: 'left',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'remarks',
      key: 'remarks',
      width: 100,
      align: 'left',
    },
  ];
  return (
    <>
      <MyPage
        pageApi={_getInvalidTimeeSheetByArgs}
        title={'Yêu cầu giải trình'}
        searchRender={<SearchExplainRequest />}
        tableOptions={tableColums}
        setSelectedRowData={setSelectedRowArr}
        forceClearSelection={forceClearSelection}
        multipleSelection
        forceUpdate={forceUpdate}
        slot={
          <>
            <Button type="primary" onClick={handleApprove}>
              {'Duyệt'}
            </Button>
            <Button type="primary" onClick={handleCancle}>
              {'Từ chối'}
            </Button>
            <Button type="primary" onClick={handleDelete}>
              {'Xóa'}
            </Button>
          </>
        }
      />
    </>
  );
};

export default ExplanationRequest;
