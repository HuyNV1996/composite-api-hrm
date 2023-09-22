import React, { useEffect, useState } from 'react';
import Table from '../../containers/table';
import Drawer from './components/drawer';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUserItem } from '@/stores/user.store';
import Search from '@/containers/search';
import { Card } from 'antd';
import DatePicker from './components/datepicker';
const index = () => {
  const [forceUpdate,setForceUpdate] = useState(false);
  const [fromDate,setFromDate] = useState<string>('');
  const [toDate,setToDate] = useState<string>('');

   // =================
  // State
  // =================
  const [dataAttendant, setDataAttendant] = useState([]);
  // =================
  // =================================================================
  // Selector
  // =================================================================
  const {isShowInfoDrawer,fromToWeeklyDate} = useSelector(state => state.user);
  // =================================================================
  // Dispatch
  // =================================================================
  const dispatch = useDispatch();
  const onShowInfoDrawer = () => {
    dispatch(
      setUserItem({
        isShowInfoDrawer: true,
        collapsed: true
      })
    );
  };
  const onCloseInfoDrawer = () => {
    dispatch(
      setUserItem({
        isShowInfoDrawer: false,
        collapsed: true
      })
    );
  };
  return (
    <React.Fragment>
      <div className="weekly-content-container">
        <div className ="col-left">
        <Card style={{ marginBottom: 16 }}>
          <Search
            setDataAttendant={setDataAttendant}
            dataAttendant={dataAttendant}
            forceUpdate={forceUpdate}
            fromDate= {fromDate}
            toDate= {toDate}
          >
            <DatePicker
            setFromDate= {setFromDate}
            setToDate= {setToDate}
            />
          </Search>
        </Card>
        <Table 
        onShowInfo={onShowInfoDrawer} 
        forceUpdate ={forceUpdate}
        fromDate= {fromDate}
        toDate = {toDate}
        dataAttendant = {dataAttendant}
        setDataAttendant={setDataAttendant}
        disabledButton = {false}
        />

        </div>
        <Drawer
          onClose ={onCloseInfoDrawer}
          isShow={isShowInfoDrawer}
          // isShow={true}
          setForceUpdate ={setForceUpdate}
          forceUpdate = {forceUpdate}
        />
      </div>
    </React.Fragment>
  );
};

export default index;
