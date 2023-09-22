import { useEffect, useState, useCallback } from 'react';
import { Card, Skeleton, Spin, Table, Typography  , Button } from 'antd';
import MyButton from '@/components/basic/button';
import {CalculatorOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import {
  DataWeeklyType,
  WeeklyReportState,
} from '@/interface/weeklyreport/type';

import { useDispatch, useSelector } from 'react-redux';
import { setWeeklyData } from '@/stores/weekly.store';
import './style.css';
import { LocaleFormatter } from '@/locales';
import { getFormattedDate } from '@/utils/common';
import { setACellActive, setCellsActive } from '@/stores/common.store';
import { ICellActive } from '@/interface/common/type';
import React from 'react';
import { formatDate, formatDateTable } from '@/utils/formatDate';
import moment from 'moment';
import { ReactComponent as LeaveSvg } from '@/assets/icons/ic_leave.svg';
import { ReactComponent as WarningSvg } from '@/assets/icons/ic_warming.svg';
const { Text } = Typography;
import { Empty } from 'antd';
import weeklyreport from '@/mock/weeklyreport/attendance_raw_converted.json';
// import weeklyreport from '@/mock/weeklyreport/employee_data.json';
import { calculateAttendanceReport, getAttendanceReport } from '@/api/weeklyreport/weeklyreport';
import { IGetAttendanceContentParams , IGetAttendanceParams } from '@/interface/weeklyreport/type';
import  store  from '@/stores';
import { setGlobalState } from '@/stores/global.store'; 
import { transformObject } from '@/utils/common';
import { setListAttendance } from '@/stores/list-attendance-report.store';
import { get, update } from 'lodash';
const data: any = weeklyreport;
interface ITableProps {
  onShowInfo: () => void;
  forceUpdate?: boolean;
  fromDate: string;
  toDate: string;
  dataAttendant: any;
  setDataAttendant: any;
  disabledButton: boolean;
}
const index = (props: ITableProps) => {
  const { onShowInfo, forceUpdate, fromDate, toDate, dataAttendant , setDataAttendant , disabledButton} = props;
  const restShift = JSON.parse(localStorage.getItem('restShift')!);
  const [forceRender, setForceRender] = useState(false);
  const _setListAttendance = (data: any) => dispatch(setListAttendance(data));
  const [updateAttendance , setUpdateAttendance] = useState(false);
  // Dispatch
  // =================
  const dispatch = useDispatch();
  const _setWeeklyData = (data: WeeklyReportState) =>
    dispatch(setWeeklyData(data));
  const _setCellsActive = (data: ICellActive) => dispatch(setCellsActive(data));
  const _setACellActive = (data: ICellActive) => dispatch(setACellActive(data));
  // =================================================================
  // Selector
  // =================================================================
  const { loading } = useSelector(state => state.global);
  const { cellsActive } = useSelector(state => state.common);

  // Utilities

  const handleClick = (item: any, event: any) => {
    const isCtrlPressed = event.ctrlKey || event.metaKey;
    if (isCtrlPressed) {
      onCellClick(item);
      _setCellsActive({
        code: item?.employee_code,
        date: item?.date,
        id: item?.id,
        total_work_time: item?.total_work_time,
      });
    } else {
      onCellClick(item);
      _setACellActive({
        code: item?.employee_code,
        date: item?.date,
        id: item?.id,
        total_work_time: item?.total_work_time,
      });
    }
  };
  const generateColumns = (
    start: string,
    end: string
  ): ColumnsType<DataWeeklyType> => {
    const columns: ColumnsType<DataWeeklyType> = [];
    start = formatDateTable(start);
    end = formatDateTable(end);
    const currentDate = new Date(start);
    while (currentDate <= new Date(end)) {
      var year = currentDate.getFullYear();
      var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Thêm số 0 vào trước tháng nếu chỉ có một chữ số
      var day = ('0' + currentDate.getDate()).slice(-2); // Thêm số 0 vào trước ngày nếu chỉ có một chữ số

      // Định dạng chuỗi ngày tháng dưới dạng "YYYY-MM-DD"
      var dateString = year + '-' + month + '-' + day;
      const columnKey = `${dateString}`;
      const columnTitle = getFormattedDate(
        moment(currentDate).locale('vi').format('dddd DD/MM')
      );

      const column = {
        title: columnTitle,
        dataIndex: columnKey,
        key: columnKey,
        width: 80,
        render: (item: any) => {
          let bg = 'transparent';
          let bd = '1px solid rgb(240, 240, 240)';
          if (!item?.total_shift_work_time && (item?.attendance_attempt_1 || item?.attendance_attempt_2 || item?.attendance_attempt_3 || item?.attendance_attempt_4 || item?.attendance_attempt_5 || item?.attendance_attempt_6 || item?.attendance_attempt_7 || item?.attendance_attempt_8 || item?.attendance_attempt_9 || item?.attendance_attempt_10 || item?.attendance_attempt_11 || item?.attendance_attempt_12 || item?.attendance_attempt_13 || item?.attendance_attempt_14 || item?.attendance_attempt_15 || item?.last_attendance_attempt)) {
            bg = 'gold';
          }
          else {
            bg = 'transparent';
          }
          let tangCa = false;
          if (item?.date && item?.attendance_attempt_1 && item?.last_attendance_attempt) {
            const hourFloat = moment(item.attendance_attempt_1).hour() + moment(item.attendance_attempt_1).minute() / 60;
            const hourFloat2 = moment(item.last_attendance_attempt).hour() + moment(item.last_attendance_attempt).minute() / 60;
            if (item.shift_start && item.shift_end && item.total_shift_work_time && item.total_work_time) {
              if (item.total_shift_work_time > 0) {
                if (!(Number(item?.total_shift_work_time) * 60 > Number(item?.total_work_time))) {
                  if (item.shift_start - hourFloat >= 0.5 && hourFloat2 - item.shift_end >= 0 || hourFloat2 - item.shift_end >= 0.5 && item.shift_start - hourFloat >= 0) {
                    tangCa = true;
                  } else if (item.shift_start - hourFloat === 0 && hourFloat - item.shift_end >= 0.5) {
                    tangCa = true;
                  }
                }
              }
            }
          }
          if (item?.missing_checkin_break && item?.total_work_time) {
            bg = '#d7f542';
          }
          return {
            props: {
              style: {
                background: bg,
                cursor: item?.employee_code ? 'pointer' : 'not-allowed',
                // border: bd,
              },
            },
            children: (
              <div
                className={`cell-content ${cellsActive &&
                  cellsActive.some(
                    (cell: ICellActive) =>
                      item?.employee_code === cell.code &&
                      item?.date === cell.date &&
                      item?.id === cell.id
                  ) &&
                  item?.employee_code
                  ? 'active'
                  : ''
                  }`}
                onClick={event => handleClick(item, event)}
                tabIndex={0}>
                {item?.shift_name && (
                  <Text style={{ color: '#694730' }}>{item?.shift_name}</Text>
                )}
                {item?.total_work_time && (
                  <Text style={{ color: Number(item?.total_shift_work_time) * 60 > Number(item?.total_work_time) ? 'red' : '#815f53' }}>
                    {item?.missing_checkin_break ? Math.round(item?.total_work_time)
                      : item?.shift_name.includes("/OFF") ? Math.round(Math.min(item?.total_work_time, 240) - Math.min(item?.attendance_late, item?.leave_early))
                        : Math.round(item?.total_work_time)}
                  </Text>
                )}
                {/* {item?.extra_hour !== 'undefined' &&
                  Number(item?.extra_hour) > 0.5 && (
                    <WarningSvg width={25} height={25} />
                  )} */}
                {tangCa && <WarningSvg width={25} height={25} />}
                {/* <div>{item?.employee_code}</div> */}
              </div>
            ),
          };

        },

      };
      columns.push(column);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return columns;
  };

  const getAttendance = useCallback(async () => {
    try {
      if (fromDate !== '' && toDate !== '') {
        const args: string[] = [
          fromDate,
          toDate,
          '',
        ];
        const params: IGetAttendanceContentParams = {
          args,
        };
        const body: IGetAttendanceParams = {
          params,
        };

        store.dispatch(setGlobalState({ loading: true }));

        const { result } = (await getAttendanceReport(body)) as any;

        if (result) {
          const formattedObject = transformObject(result);
          setDataAttendant(formattedObject);
          console.log(dataAttendant)
          console.log( "result is",result)
          _setListAttendance(JSON.stringify(formattedObject));
          store.dispatch(setGlobalState({ loading: false }));
          setForceRender(!forceRender);
          
        } else {
          
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [updateAttendance]);

  const handleCalculate = async() => {
    try {
      if (fromDate !== '' && toDate !== '') {
        const args: string[] = [
          fromDate,
          toDate,
          '',
        ];
        const params: IGetAttendanceContentParams = {
          args,
        };
        const body: IGetAttendanceParams = {
          params,
        };
        store.dispatch(setGlobalState({ loading: true }));
        const res = await calculateAttendanceReport(body);
        console.log(" res is",res)
        if(res.result != undefined){
          setUpdateAttendance(!updateAttendance);
          store.dispatch(setGlobalState({ loading: false }));
        }
        
      }
    } catch (error) {
      console.log(error);
    }
    
  }

        

  const Columns: ColumnsType<DataWeeklyType> = [
    {
      title: '#', // Tiêu đề số thứ tự
      key: 'stt',
      align: 'center',
      width: 100,
      render: (_, __, index) => index + 1, // Render số thứ tự
    },
    {
      title: 'Bộ phận',
      dataIndex: 'department',
      key: 'department',
      align: 'left',
      width: 90,

    },
    {
      title: 'Mã nhân viên',
      dataIndex: 'employee_code',
      key: 'employee_code',
      align: 'left',
      // fixed: 'left',
      width: 100,
      render: item => {
        return item && <div>{item}</div>;
      },
    },
    {
      title: 'Họ và tên',
      dataIndex: 'employee_name',
      key: 'employee_name',
      align: 'left',
      // fixed: 'left',
      width: 100,
      render: item => {
        return <div>{item}</div>;
      },
    },
    ...generateColumns(
      fromDate,
      toDate
    ),
  ];

  useEffect(() => {
    getAttendance();
  }, [updateAttendance])

  const onCellClick = (cellSelected: WeeklyReportState) => {
    console.log('shiftname', cellSelected.shift_name)
    _setWeeklyData(cellSelected);
    onShowInfo();
  };

  const [height, setHeight] = useState(window.innerHeight - 400);
  const updateDimensions = () => {
    setHeight(window.innerHeight - 400);
  };
  useEffect(() => {
    setForceRender(!forceRender);
  }, [forceUpdate])
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  return (
    <div className="table-wrapper">
      <Card title={`Báo cáo từ ngày ${fromDate} đến ngày ${toDate}`} extra = {<MyButton disabled = {disabledButton} type ="primary" onClick={handleCalculate}>Tính toán</MyButton>}>
        
        <Spin
          spinning={loading}
          className="app-loading-wrapper"
          tip={<LocaleFormatter id="gloabal.tips.loading" />}></Spin>
        {dataAttendant?.length > 0 && true ? (
          <Table
            columns={Columns}
            // dataSource={data}
            dataSource={dataAttendant}
            bordered
            pagination={false}
            scroll={{ y: height, x: 1200 }}
            expandable={{
              defaultExpandAllRows: false,
            }}
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Card>
    </div>
  );
};

export default index;
