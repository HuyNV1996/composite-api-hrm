import { Tabs, TabsProps, message, message as $message } from 'antd';
import Info from '../info';
import Shift from '../shifts';
import Leave from '../leave';
import Explaintation from '../explaintation';
import { useEffect, useState } from 'react';
import './style.css';
import store from '@/stores';
import { setGlobalState } from '@/stores/global.store';
import { setSelectedShifts } from '@/stores/shifts.store';//clearSelectedShifts,
import { formatDate } from '@/utils/formatDate';
import {
  IGetAttendanceDetails,
  IGetAttendanceDetailsParams,
} from '@/interface/weeklyreport/type';
import { getAttendanceDetailById } from '@/api/weeklyreport/weeklyreport';
import { useDispatch, useSelector } from 'react-redux';
import { setDetailAttendanceItem } from '@/stores/detail-attendance.store';
import moment from 'moment';
interface tabsProps {
  setForceUpdate: any;
  forceUpdate: boolean;
}
const index = (props: tabsProps) => {
  const { setForceUpdate, forceUpdate } = props;
  // ================================
  // State
  // ================================
  const [currentTabIndex, setCurrentTabIndex] = useState(1);
  const [foreUpdateLeave, setForceUpdateLeave] = useState(false);
  const [foreUpdateShift, setForceUpdateShift] = useState(false);
  const { selectedShift, message } = useSelector(state => state.shifts);
  console.log('selectedShift dơn', selectedShift[0])

  const dispatch = useDispatch();
  const _setSelectedShifts = (item: string) =>
    dispatch(setSelectedShifts(item));

  const toggleActiveListShifts = (item: string) => {
    _setSelectedShifts(item);
  };

  // ================================
  // Selectors
  // ================================
  const { id, shift_name, attendance_attempt_1, last_attendance_attempt, shift_start, shift_end, employee_name, date } = useSelector(state => state.weekly);
  useEffect(() => {
    console.log('foreUpdateLeave', foreUpdateLeave)
  },[foreUpdateLeave])
  // if (date)
  // {
  //   const formattedDate = formatDate(date)
  //   if (attendance_attempt_1 && last_attendance_attempt) {
  //     const hourFloat = moment(attendance_attempt_1).hour() + moment(attendance_attempt_1).minute() / 60;
  //     const hourFloat2 = moment(last_attendance_attempt).hour() + moment(last_attendance_attempt).minute() / 60;
  //     if (shift_start && shift_end) {
  //       if (shift_start && shift_end && (shift_start - hourFloat >= 0.5 || hourFloat2 - shift_end >= 0.5)) {
  //         $message.warning(`Bạn nên tạo đơn cho nhân viên ${employee_name} với ca ${shift_name} ngày ${formattedDate}`);
  //       }
  //       else if (shift_start - hourFloat == 0 && hourFloat2 - shift_end >= 0.5) {
  //         $message.warning(`Bạn nên tạo đơn cho nhân viên ${employee_name} với ca ${shift_name} ngày ${formattedDate}`);
  //       }
  //     }
  //   }
  // }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 16,
          }}>
          Thông tin
        </span>
      ),
      children: <Info currentTabIndex={currentTabIndex} forceUpdate={forceUpdate} />,
    },
    {
      key: '2',
      label: (
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 16,
          }}>
          Sửa ca
        </span>
      ),
      children: (
        <Shift currentTabIndex={currentTabIndex} setForceUpdate={setForceUpdate} forceUpdate={forceUpdate} forceUpdateShift={foreUpdateShift} setForceUpdateShift={setForceUpdateShift} />
      ),
    },
    {
      key: '3',
      label: (
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 16,
          }}>
          Đơn
        </span>
      ),
      children: <Leave
        foreUpdateLeave={foreUpdateLeave}
        setForceUpdateLeave={setForceUpdateLeave} />,
    },
    {
      key: '4',
      label: (
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 16,
          }}>
          Giải trình
        </span>
      ),
      children: <Explaintation
        foreUpdateLeave={foreUpdateLeave}
        setForceUpdateLeave={setForceUpdateLeave} />,
    },
  ];
  // ================================
  // Handler
  // ================================
  const onChange = (key: string) => {
    console.log('selectedShift', selectedShift)
    setCurrentTabIndex(Number(key));
    setForceUpdateLeave(!foreUpdateLeave);
    setForceUpdateShift(!foreUpdateShift);
  };
  const getAttendanceByIdAsync = async () => {
    // store.dispatch(
    //   setGlobalState({
    //     loading: true,
    //   })
    // );
    const args: number[] = [id!];
    const params: IGetAttendanceDetailsParams = {
      args,
    };
    const body: IGetAttendanceDetails = {
      params,
    };
    const res = (await getAttendanceDetailById(body)) as any;
    if (res) {
      if (res?.result) {
        // store.dispatch(
        //   setGlobalState({
        //     loading: false,
        //   })
        // );
        dispatch(setDetailAttendanceItem(res?.result));
        localStorage.setItem('detailAttendance', JSON.stringify(res?.result));
        return true;
      }
    }
    return false;
  };
  // =============
  // Hooks
  // =============

  useEffect(() => {
    console.log('currentTabIndex', currentTabIndex)
    if (currentTabIndex === 3 || currentTabIndex === 4) {

      console.log('refresh leave');
      getAttendanceByIdAsync();
    }
  }, [id, foreUpdateLeave]);
  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      type="card"
      size="small"
      onChange={onChange}
      style={{ height: '100%' }}
      className="tabs-wrapper"
    />
  );
};

export default index;
