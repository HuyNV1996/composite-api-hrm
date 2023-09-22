//@ts-ignore
import { Form } from 'antd';
import { FC, useEffect, useState } from 'react';

import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { useLocale } from '@/locales';

import { IShiftsListColumn } from '@/interface/shifts/shifts';
import { getListShifts } from '@/api/shift/shift.api';
import { IGetAttendanceParams } from '@/interface/weeklyreport/type';
import { getTimeKeepingList } from '@/api/timekeepingList/timekeeping.api';
import { formatDate, formatDateDot, formatDateTable } from '@/utils/formatDate';
import { DAY } from '@/const/consts';
import SearchTimeKeeping from '../components/search';
import moment from 'moment';
import { convertVietnameseToEnglish } from '@/utils/common';

const TimeKeepingList: FC = () => {
  const { t } = useLocale();
  const [form] = Form.useForm();
  const [foceUpdate, setFoceUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [idShift, setIdShift] = useState<any>(null);
  const showDrawer = () => {
    setOpen(true);
  };
  const tableColums: MyPageTableOptions<IShiftsListColumn> = [
    {
      title: '#',
      dataIndex: 'no',
      key: 'no',
      width: 50,
      align: 'left',
    },
    {
      title: 'Mã vân tay',
      dataIndex: 'time_keeping_code',
      key: 'time_keeping_code',
      width: 100,
      align: 'left',
      render: item => {
        return <>{item && parseInt(item)}</>;
      },
    },
    {
      title: 'Mã nhân viên',
      dataIndex: 'employee_code',
      key: 'employee_code',
      width: 150,
      align: 'left',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'employee_name',
      key: 'employee_name',
      width: 190,
      align: 'left',
    },
    {
      title: 'Đơn vị/Phòng ban',
      dataIndex: 'department',
      key: 'department',
      width: 210,
      align: 'left',
    },
    {
      title: 'Ngày vào làm',
      dataIndex: 'join_date',
      key: 'join_date',
      width: 120,
      align: 'left',
      render: item => {
        return <>{item && formatDate(item)}</>;
      }
    },
    {
      title: 'Ngày chấm công',
      dataIndex: 'date',
      key: 'date',
      width: 130,
      align: 'left',
      render: item => {
        return <>{item && formatDate(item)}</>;
      }
    },
    {
      title: 'Thứ',
      dataIndex: 'day_of_week',
      key: 'day_of_week',
      width: 100,
      align: 'left',
      render: item => {
        return  <div>{DAY[item]}</div>;
      },
    },
    {
      title: 'Công chuẩn',
      dataIndex: 'standard_working_day',
      key: 'standard_working_day',
      width: 100,
      align: 'left',
    },
    {
      title: 'Ca',
      dataIndex: 'shift_name',
      key: 'shift_name',
      width: 100,
      align: 'left',
    },
    {
      title: 'Chấm lần 1',
      dataIndex: 'attendance_attempt_1',
      key: 'attendance_attempt_1',
      width: 100,
      align: 'left',
      render: item => {
        return <>{item && formatDateDot(item)}</>;
      },
    },
    {
      title: 'Chấm lần 2',
      dataIndex: 'attendance_attempt_2',
      key: 'attendance_attempt_3',
      width: 100,
      align: 'left',
      render: item => {
        return <>{item && formatDateDot(item)}</>;
      },
    },
    {
      title: 'Chấm lần 3',
      dataIndex: 'attendance_attempt_3',
      key: 'attendance_attempt_3',
      width: 100,
      align: 'left',
      render: item => {
        return <>{item && formatDateDot(item)}</>;
      },
    },
    {
      title: 'Chấm lần 4',
      dataIndex: 'attendance_attempt_4',
      key: 'attendance_attempt_4',
      width: 100,
      align: 'left',
      render: item => {
        return <>{item && formatDateDot(item)}</>;
      },
    },
    {
      title: 'Chấm lần 5',
      dataIndex: 'attendance_attempt_5',
      key: 'attendance_attempt_5',
      width: 100,
      align: 'left',
      render: item => {
        return <>{item && formatDateDot(item)}</>;
      },
    },
    {
      title: 'Chấm lần 6',
      dataIndex: 'attendance_attempt_6',
      key: 'attendance_attempt_6',
      width: 100,
      align: 'left',
      render: item => {
        return <>{item && formatDateDot(item)}</>;
      },
    },
    {
      title: 'Chấm lần 7',
      dataIndex: 'attendance_attempt_7',
      key: 'attendance_attempt_7',
      width: 100,
      align: 'left',
      render: item => {
        return <>{item && formatDateDot(item)}</>;
      },
    },
    {
      title: 'Chấm lần 8',
      dataIndex: 'attendance_attempt_8',
      key: 'attendance_attempt_8',
      width: 100,
      align: 'left',
      render: item => {
        return <>{item && formatDateDot(item)}</>;
      },
    },
    {
      title: 'Chấm lần 9',
      dataIndex: 'attendance_attempt_9',
      key: 'attendance_attempt_9',
      width: 100,
      align: 'left',
      render: item => {
        return <>{item && formatDateDot(item)}</>;
      },
    },
    {
      title: 'Chấm lần 10',
      dataIndex: 'attendance_attempt_10',
      key: 'attendance_attempt_10',
      width: 100,
      align: 'left',
      render: item => {
        return <>{item && formatDateDot(item)}</>;
      },
    },
    {
      title: 'Chấm lần cuối',
      dataIndex: 'last_attendance_attempt',
      key: 'last_attendance_attempt',
      width: 140,
      align: 'left',
      render: item => {
        return <>{item && formatDateDot(item)}</>;
      },
    },
    {
      title: 'Loại giải trình',
      dataIndex: 'explaination_type',
      key: 'explaination_type',
      width: 140,
      align: 'left',
    },
    {
      title: 'Lý do giải trình',
      dataIndex: 'explaination_content',
      key: 'explaination_content',
      width: 160,
      align: 'left',
    },
    {
      title: 'Loại đơn',
      dataIndex: 'request_type',
      key: 'request_type',
      width: 140,
      align: 'left',

    },
    {
      title: 'thời gian đơn',
      dataIndex: 'request_content',
      key: 'request_content',
      width: 140,
      align: 'left',
    },
    {
      title: 'Đi trễ',
      dataIndex: 'attendance_late',
      key: 'attendance_late',
      width: 100,
      align: 'left',
      render: item => {
        return <>{item && Number(item).toFixed(0)}</>;
      }
    },
    {
      title: 'Về sớm',
      dataIndex: 'leave_early',
      key: 'leave_early',
      width: 100,
      align: 'left',
      render: item => {
        return <>{item && Number(item).toFixed(0)}</>;
      }
    },
    {
      title: 'Thời gian nghỉ lễ',
      dataIndex: 'ot_holiday',
      key: 'ot_holiday',
      width: 100,
      align: 'left',
    },
    {
      title: 'Tính thêm giờ',
      dataIndex: 'ot_normal',
      key: 'ot_holiday',
      width: 100,
      align: 'left',
      render: item => {
        return <>{item && Number(item).toFixed(0)}</>;
      }
    },
    {
      title: 'Thời gian làm việc thực tế',
      dataIndex: 'total_work_time',
      key: 'total_work_time',
      width: 100,
      align: 'left',
      render : item => {
        return <>{item && Number(item).toFixed(0)}</>
      }

    },
  ];
  const fetchTimeKeeping = async ({ department, time_keeping_code, rangeTime, page_size, page, employee_code, employee_name_unaccent }: any) => {
    console.log(department, page_size, page);
    var fromDate = "";
    var toDate = "";
    if (rangeTime && rangeTime.length === 2) {
      fromDate = moment(rangeTime[0]).format('DD/MM/YYYY');
      toDate = moment(rangeTime[1]).format('DD/MM/YYYY');
    }

    const body: IGetAttendanceParams = {
      params: {
        args: [
          page_size,
          page,
          fromDate,
          toDate,
          `%${employee_code?.trim() || ''}%`,
          `%${convertVietnameseToEnglish((employee_name_unaccent)?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())?.trim() ?? ''}%`,
          `%${time_keeping_code?.trim() || ''}%`,
          `%${department?.trim() || ''}%`,
        ],
      },
    };
    console.log(body)
    const res = await getTimeKeepingList(body);
    if (res) {
      console.log(res)
      return res;
    }
    return;
  };
  return (
    <>
      <MyPage
        pageApi={fetchTimeKeeping}
        title={'Danh sách chấm công'}
        searchRender={<SearchTimeKeeping />}
        tableOptions={tableColums}
        forceUpdate={foceUpdate}
      />
    </>
  );
};

export default TimeKeepingList;
