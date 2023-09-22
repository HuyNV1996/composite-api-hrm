import React, { useEffect, useState } from 'react';
import { Divider, Space, Typography, message } from 'antd';
import { useSelector } from 'react-redux';
import './style.css';
import moment from 'moment';
import {
  formatDateCallApi,
  formatDateDot,
  formatDateMonth,
} from '@/utils/formatDate';
import { ArrowRightOutlined } from '@ant-design/icons';
import {
  historyShiftEditBody,
  historyShiftEditParams,
} from '@/interface/weeklyreport/type';
import { getHistoryEditById } from '@/api/shift/shift.api';
import { formatedHistoryShift } from '@/utils/common';
const { Text } = Typography;
interface IInforProps {
  currentTabIndex: number;
  forceUpdate: boolean;
}
import { format_time } from '../leave';
const floatToHourMinute = (floatValue: number): string => {
  const hours = Math.floor(floatValue);
  const minutes = Math.round((floatValue - hours) * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
function formatDate(inputDateStr: string): string {
  // Parse the input string into a Date instance
  const inputDate = new Date(inputDateStr);

  // Extract individual components from the Date instance
  const day = inputDate.getDate().toString().padStart(2, '0');
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
  const year = inputDate.getFullYear();
  const hours = inputDate.getHours().toString().padStart(2, '0');
  const minutes = inputDate.getMinutes().toString().padStart(2, '0');

  // Create the formatted date string
  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;

  return formattedDate;
}
const index = (props: IInforProps) => {
  const { currentTabIndex, forceUpdate } = props;
  // =================
  // Selectors
  // =================
  const {
    shift_name,
    shift_start,
    shift_end,
    rest_start,
    rest_end,
    total_work_time,
    total_shift_work_time,
    time_keeping_code,
    missing_checkin_break,
    resource_calendar,
    id,
    attendance_attempt_1,
    attendance_attempt_2,
    attendance_attempt_3,
    attendance_attempt_4,
    attendance_attempt_5,
    attendance_attempt_6,
    attendance_attempt_7,
    attendance_attempt_8,
    attendance_attempt_9,
    attendance_attempt_10,
    attendance_attempt_11,
    attendance_attempt_12,
    attendance_attempt_13,
    attendance_attempt_14,
    attendance_attempt_15,
    last_attendance_attempt,
  } = useSelector(state => state.weekly);
  const attendance_attemptArr = [
    attendance_attempt_1,
    attendance_attempt_2,
    attendance_attempt_3,
    attendance_attempt_4,
    attendance_attempt_5,
    attendance_attempt_6,
    attendance_attempt_7,
    attendance_attempt_8,
    attendance_attempt_9,
    attendance_attempt_10,
    attendance_attempt_11,
    attendance_attempt_12,
    attendance_attempt_13,
    attendance_attempt_14,
    attendance_attempt_15,
    last_attendance_attempt,
  ];
  const nonNullUndefinedattendance_attemptArr: string[] = [];
  attendance_attemptArr.forEach(variable => {
    if (variable !== null && variable !== undefined && variable) {
      nonNullUndefinedattendance_attemptArr.push(variable);
    }
  });
  const [historyShiftEdits, setHistoryShiftEdits] = useState<any>([]);

  // ========================
  // State
  // ========================

  var typeShift = 'Ca chính';
  // const [typeShift,setTypeShift] = useState('');
  const fixedShift = JSON.parse(localStorage.getItem('fixedShift')!);
  const restShift = JSON.parse(localStorage.getItem('restShift')!);
  const coupleShift = JSON.parse(localStorage.getItem('coupleShift')!);
  const mainShift = JSON.parse(localStorage.getItem('mainShift')!);
  if (fixedShift?.includes(shift_name)) {
    typeShift = 'Ca gãy';
  } else if (restShift?.includes(shift_name)) {
    typeShift = 'Ca nghỉ';
  } else if (coupleShift?.includes(shift_name)) {
    typeShift = 'Ca ghép';
  } else if (mainShift?.includes(shift_name)) {
    typeShift = 'Ca chính';
  } else {
    typeShift = 'Ca trống';
  }
  const getHistoryEdit = async (idShift: number) => {
    const args: string[] = [idShift.toString()];
    const params: historyShiftEditParams = {
      args: args,
    };
    const body: historyShiftEditBody = {
      params: params,
    };
    const res = await getHistoryEditById(body);
    if (res.result?.length > 0) {
      if (Array.isArray(res.result) && res.result.length > 0) {
        const formatedObj = formatedHistoryShift(res.result.reverse());
        setHistoryShiftEdits(formatedObj);

      }
    }
    else {
      setHistoryShiftEdits([])
    }
  };
  // Hooks

  useEffect(() => {
    console.log(id)
    if (id) {
      getHistoryEdit(id);
      console.log("forceUpdate in info", forceUpdate)
    }
  }, [id, forceUpdate, currentTabIndex]);
  return (
    <Space direction="vertical" className="weekly-info">
      <Text
        strong
        style={{
          textAlign: 'center',
          display: 'block',
          fontSize: 16,
          fontWeight: 500,
        }}>
        {typeShift}
      </Text>
      <Divider />
      <div className="weekly-info-row">
        <Text strong className="label">
          Mã ca:{' '}
        </Text>
        <Text strong className="content">
          {shift_name}
        </Text>
      </div>
      <div className="weekly-info-row">
        <Text strong className="label">
          Mã Chấm công:{' '}
        </Text>
        <Text strong className="content">
          {time_keeping_code}
        </Text>
      </div>
      {typeShift !== 'Ca nghỉ' ? (
        <React.Fragment>
          <div className="weekly-info-row">
            <Text strong className="label">
              Tổng thời gian ca:{' '}
            </Text>
            <Text strong className="content">
              {Number(total_shift_work_time)}h
            </Text>
          </div>
          <div className="weekly-info-row">
            <Text className="label">Giờ bắt đầu ca: </Text>
            <Text strong className="content">
              {shift_start && floatToHourMinute(shift_start)}
            </Text>
          </div>
          <div className="weekly-info-row">
            <Text className="label">Giờ kết thúc ca: </Text>
            <Text strong className="content">
              {shift_end && floatToHourMinute(shift_end)}
            </Text>
          </div>
          <div className="weekly-info-row">
            <Text className="label">Tổng thời gian làm thực tế: </Text>
            <Text strong className="content">
              {total_work_time && missing_checkin_break ? floatToHourMinute(total_work_time / 60 / 2) : total_work_time && floatToHourMinute(total_work_time / 60)}h
            </Text>
          </div>
          <div className="weekly-info-row">
            <Text strong className="label">
              Tổng thời gian nghỉ:
            </Text>
            <Text strong className="content">
              {Number(rest_end) - Number(rest_start)}
            </Text>
          </div>
          <div className="weekly-info-row">
            <Text strong className="label">
              Giờ làm việc
            </Text>
            <Text strong className="content">
              {resource_calendar && resource_calendar}
            </Text>
          </div>
        </React.Fragment>
      ) : (
        <div className="weekly-info-row">
          <Text className="label">Tên ca: </Text>
          <Text className="content">Nghỉ phép</Text>
        </div>
      )}
      <Text
        strong
        style={{
          textAlign: 'center',
          display: 'block',
          fontSize: 16,
          fontWeight: 500,
          marginTop: 20,
        }}>
        Lịch sử chấm công
      </Text>
      <Divider />
      <div className="attendance-info-row">
        {nonNullUndefinedattendance_attemptArr.map((attempt, index) => {
          if ((attempt !== null && index < nonNullUndefinedattendance_attemptArr.length - 1) || (attempt !== null && index === 0)) {
            return (
              <div key={index} className="weekly-info-row">

                <Text className="label">Chấm lần {index + 1}: </Text>
                <Text className="content">{index === 0 ? formatDate(attempt) : formatDateDot(attempt)}</Text>
              </div>
            );
          }

          return null;
        })}
        {(() => {
          console.log(nonNullUndefinedattendance_attemptArr)
          if (nonNullUndefinedattendance_attemptArr.length > 0) {
            return (
              <div className="weekly-info-row">
                <Text className="label">Chấm lần cuối: </Text>
                <Text className="content">{formatDate((nonNullUndefinedattendance_attemptArr[nonNullUndefinedattendance_attemptArr.length - 1]))}</Text>
              </div>
            );
          }
          return null;
        })()
        }

      </div>
      <Text
        strong
        style={{
          textAlign: 'center',
          display: 'block',
          fontSize: 16,
          fontWeight: 500,
          marginTop: 20,
        }}>
        Lịch sử sửa ca
      </Text>
      <Divider />
      <div className="history-edit">
        {historyShiftEdits &&
          Array.isArray(historyShiftEdits) &&
          historyShiftEdits.length > 0 &&
          historyShiftEdits.map((historyShiftEdit, index) => {
            return (
              <div className="attendance-info-row" key={index}>
                <Space
                  direction="vertical"
                  className="weekly-info-row"
                  style={{ marginTop: 15 }}>
                  <Space direction='horizontal'>
                    <Text className="label" strong>
                      {format_time(historyShiftEdit?.create_date)}
                    </Text>
                    <Divider style={{ width: 200 }} />
                  </Space>
                  {historyShiftEdit.user &&
                    Array.isArray(historyShiftEdit.user) &&
                    historyShiftEdit.user.length > 0 &&
                    historyShiftEdit.user.map((user: any, index: number) => {
                      return (
                        <Space key={index} direction="vertical">
                          <Text className="content">{user?.name}</Text>
                          {user.value &&
                            Array.isArray(user.value) &&
                            user.value.length > 0 &&
                            user.value.map((value: any, index: number) => {
                              return (
                                <div key={index} className="weekly-info-row" style={{ marginLeft: 20 }}>
                                  <Text className="label">
                                    {value?.old_value}
                                  </Text>
                                  <ArrowRightOutlined />
                                  <Text className="content">
                                    {value?.new_value}
                                  </Text>
                                </div>
                              );
                            })}
                        </Space>
                      );
                    })}
                </Space>
              </div>
            );
          })}
      </div>
    </Space>
  );
};

export default index;
