import { getAttendanceDetailById } from '@/api/weeklyreport/weeklyreport';
import { IListLeave } from '@/interface/weeklyreport/type';
import store from '@/stores';
import { setGlobalState } from '@/stores/global.store';
import { Button, Divider, Row, Space, Tag, Typography } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './style.css';
import LeaveForm from './leave-form';
const { Text } = Typography;


export const format_time = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear().toString();
  const fortmattedDate = `${day}/${month}/${year}`;
  return fortmattedDate;
}


interface LeaveFormProps {
  foreUpdateLeave: boolean;
  setForceUpdateLeave: (valueType: boolean) => void;
}
const index = (props: LeaveFormProps) => {
  //
  // Props
  //
  const { foreUpdateLeave, setForceUpdateLeave } = props;
  // ================================
  // State
  // ================================
  const initialStateIListLeave: IListLeave = {
    id: 0,
    created_date: '',
    from_date: '',
    state: '',
    date_to: '',
    holiday_status_id: {
      id: 0,
      name: '',
      type:''
    },
    employee_id: {
      id: 0,
      name: ''
    },
    config_id:{
      id: 0,
      name: ''
    },
    for_reasons: '',
    reasons: '',
    time:0,
    minutes:0,

  };
  const [detailAttendanceSelected, setDetailAttendanceSelected] =
    useState<IListLeave | null>(initialStateIListLeave);
  const [isShowPoup, setIsShowPoup] = useState<boolean>(false);
  const [isView, setIsisView] = useState<boolean>(false);

  // ================================
  // Selector
  // ================================
  const { list_leave } = useSelector(
    state => state.detailAttendance
  );
  const {shift_name} = useSelector(state => state.weekly);
  const createExplation = () => {
    setIsShowPoup(!isShowPoup);
    setIsisView(false)
    setDetailAttendanceSelected(null)
  };
  const showExplation = () => {
    setIsShowPoup(!isShowPoup);
    setIsisView(true)
  };
  return (
    <React.Fragment>
      <Space direction="vertical" className="explaintation">
        <Text
          strong
          style={{
            textAlign: 'center',
            display: 'block',
            fontSize: 16,
            fontWeight: 500,
          }}>
          Danh sách đơn
        </Text>
        <Divider />
        {list_leave &&
          list_leave.length > 0 &&
          list_leave.map(item => {
            return (
              <>
                <Space direction="vertical" className="explaintation-section">
                  <Text strong className="label">
                    {item?.holiday_status_id?.name}
                  </Text>
                  <Text className="label">Ngày tạo: {format_time( item?.created_date) ?? 'No date'}</Text>
                  <div className="explaintation-row">
                    <Text className="label">Trạng thái:</Text>
                    {item?.state === 'confirm' && (
                      <Tag
                        className="tag confirm"
                        color="transparent"
                        onClick={() => {
                          // console.log('item',item)


                          // console.log(item)
                          
                          setDetailAttendanceSelected(item);
                          console.log(detailAttendanceSelected)
                          showExplation();
                        }}
                      >
                        Chờ xác nhận
                      </Tag>
                    )}
                    {item?.state === 'refuse' && (
                      <Tag
                        className="tag refuse"
                        color="transparent"
                        onClick={() => {

                          setDetailAttendanceSelected(item);
                          showExplation();
                        }}
                      >
                        Từ chối
                      </Tag>
                    )}
                    {item?.state === 'validate' && (
                      <Tag
                        className="tag validate"
                        color="transparent"
                        onClick={() => {

                          setDetailAttendanceSelected(item);
                          showExplation();
                        }}
                      >
                        Phê duyệt
                      </Tag>
                    )}
                  </div>
                  <Divider dashed />
                </Space>
              </>
            );
          })}
        {/* Empty hacking */}
        <Space
          direction="vertical"
          className="explaintation-section"
          style={{ opacity: 0 }}>
          <Text strong className="label">
            Empty
          </Text>
        </Space>
        {/* -------------- */}
      </Space>

      <Row gutter={24}>
        <div className="explaintation-wrapper-btn">
          <Button
            style={{ width: '100%', margin: '20px 0' }}
            className="shift-update-btn"
            type="primary"
            disabled = {shift_name ==='-' || shift_name === undefined || shift_name === ''}
            onClick={() => {
              createExplation();
            }}>
            Tạo đơn
          </Button>
        </div>
      </Row>
      <LeaveForm
        show={isShowPoup}
        setShow={setIsShowPoup}
        showExplainForm={isShowPoup}
        setShowExplainForm={setIsShowPoup}
        setForceUpdateLeave={setForceUpdateLeave}
        foreUpdateLeave={foreUpdateLeave}
        detailAttendanceSelected={detailAttendanceSelected}
        isView={isView}
      />
    </React.Fragment>
  );
};

export default index;
