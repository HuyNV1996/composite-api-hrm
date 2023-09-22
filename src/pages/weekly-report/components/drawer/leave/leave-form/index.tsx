import React, { useEffect, useState } from 'react';
import { IListLeave } from '@/interface/weeklyreport/type';
import BaseForm from '../../base-form';
import {
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  TimePicker,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import SelectTypeLeave from '@/pages/components/selects/SelectTypeTreeLeave';
import mockLeaveTypeData from '@/mock/select/leaveType.json';
import { IListLeaveResult } from '@/interface/weeklyreport/type';
import { convertToTreeDataSelector } from '@/utils/common';
import {
  createLeaveByEmployeeId,
  getListLeave,
} from '@/api/weeklyreport/weeklyreport';
import { useSelector } from 'react-redux';
import './style.css';
import { setGlobalState } from '@/stores/global.store';
import store from '@/stores';
import { message as $message } from 'antd';
import moment from 'moment';
import { data } from '@/mock/applicationlist/list';
import { type } from 'os';
import { set } from 'lodash';
interface ILeaveFormProps {
  show: boolean;
  setShow: (value: boolean) => void;
  showExplainForm: boolean;
  setShowExplainForm: (value: boolean) => void;
  foreUpdateLeave: boolean;
  setForceUpdateLeave: (valueType: boolean) => void;
  detailAttendanceSelected: IListLeave | null;
  isView: boolean;
}
const index = (props: ILeaveFormProps) => {
  const {
    show,
    setShow,
    showExplainForm,
    setShowExplainForm,
    foreUpdateLeave,
    detailAttendanceSelected,
    setForceUpdateLeave,
    isView
  } = props;
  const [form] = Form.useForm();
  const { Text } = Typography;
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [dataLeaveType, setDataLeaveType] = useState<any[]>([]);
  const [typeLeaveValue, setTypeLeaveValue] = useState(''); // 7~1
  const [typeLeaveInfo, setTypeLeaveInfo] = useState<string[]>([]); //[7,1]
  const [conpensatoryfund, setConpensatoryfund] = useState<string>();
  const [triggerFillData , setTriggerFillData] = useState<boolean>(false);
  const [triggerViewData , setTriggerViewData] = useState<boolean>(false);
  const [defaultLeaveType , setDefaultLeaveType ] = useState<string>("1")
  const [readOnly, setReadOnly] = useState<boolean>(false);
  // ================================
  // Selector
  // ================================
  const { id, employee_code, employee_name, company, department, job_title } =
    useSelector(state => state.weekly);
  const onFinish = async (formData: any) => {
    
    store.dispatch(
      setGlobalState({
        loading: true,
      })
    );

    var config_id = '';
    var fromDate = '';
    var toDate = '';
    var hours = '0';
    var minutes = '0';
    if (typeLeaveInfo[0] === 'TC') {
      // minutes = formData?.totalOvertimeMinute;
      hours = formData?.totalOvertimeHour;
      config_id = typeLeaveInfo[2];
      fromDate = toDate = formData.leaveDay.format('DD/MM/YYYY');
    } else if(typeLeaveInfo[0] === 'P' || typeLeaveInfo[0] === 'B'){
      config_id = '';
      fromDate = dateRange[0];
      toDate = dateRange[1];
      if(  form.getFieldValue('restHour') /60 > Number((conpensatoryfund ?? 0))){
      
        // $message.error('Số giờ nghỉ phép không được lớn hơn quỹ nghỉ');
        // return
      }
      minutes = formData?.restMinutes;
      // hours = formData?.restHour;
    }
    else{
      config_id = '';
      fromDate = dateRange[0];
      toDate = dateRange[1];
      minutes = formData?.restMinutes;
      // hours = formData?.restHour;
    }

    
    const holiday_status_id = typeLeaveInfo[1];
    const body = {
      params: {
        args: [
          employee_code,
          Number(config_id),
          fromDate,
          toDate,
          formData.typeReason,
          formData.reason,
          Number(holiday_status_id),
          Number(hours),
          Number(minutes),
        ],
      },
    };
    store.dispatch(
      setGlobalState({
        loading: true,
      })
    );
    const res = (await createLeaveByEmployeeId(body)) as any;
    if (res?.result) {
   
      store.dispatch(
        setGlobalState({
          loading: false,
        })
      );
      setForceUpdateLeave(!foreUpdateLeave);
      setShow(!show);
    }
    else {
      $message.error(res?.error.data.message ?? res?.error.message);
    }
  };
  const getListLeaveType = () => {
    const body = {
      params: {
        args: [id],
      },
    };
    getListLeave(body).then(res => {

      setDataLeaveType(convertToTreeDataSelector(res.result));
      setTriggerViewData(!triggerViewData);
    });
  };
  const [dateRange, setDateRange] = useState<string[]>([]);

  const onCalendarChange = (dates: any, dateStrings: string[]) => {
    setDateRange(dateStrings);
  };

  useEffect(() => {
    getListLeaveType();
  }, [show]);
  useEffect(() => {
    if ((typeLeaveInfo[0] === 'P' || typeLeaveInfo[0] === 'B' ) && typeLeaveInfo[3] !== undefined  && typeLeaveInfo[3] !== null && typeLeaveInfo[3] !== '' ) {
      setConpensatoryfund(typeLeaveInfo[3]);
    }

    if(typeLeaveInfo[0] === "P" || typeLeaveInfo[0] === "B"){
      form.setFieldValue("typeReason" , "2")
      setReadOnly(true)
      // setDefaultLeaveType("1")
    }
    else if (typeLeaveInfo[0] === "false"){
      form.setFieldValue("typeReason" , "1")
      setReadOnly(true)
      // setDefaultLeaveType("2")
    }
    else if(typeLeaveInfo[0] === "TC"){
      form.setFieldValue("typeReason" , "2")
      setReadOnly(true)
    }
    else {
      
      setReadOnly(false)
    }
    setTriggerFillData(!triggerFillData);

  }, [typeLeaveInfo]);
  useEffect(() => {
   
    if (typeLeaveValue !== '' && typeLeaveValue !== undefined && typeLeaveValue !== null){
    setTypeLeaveInfo(typeLeaveValue.split('~'));
    
    }
  }, [typeLeaveValue]);
  useEffect(() => {
    if (isView) {
      setIsEditMode(false);
      form.setFieldsValue({
        typeLeave: detailAttendanceSelected?.holiday_status_id?.name,
        reason: detailAttendanceSelected?.reasons,
        typeReason: detailAttendanceSelected?.for_reasons,
        restMinutes: detailAttendanceSelected?.minutes
        
      })
    } else {
      setIsEditMode(true);
      form.resetFields();
    }
  }, [show, isView, form, detailAttendanceSelected]);

  useEffect(() => {
    const body = {
      params: {
        args: [id],
      },
    };
    getListLeave(body).then(res => {
      console.log(res.result)
      setDataLeaveType(convertToTreeDataSelector(res.result));

    });
  },[detailAttendanceSelected])

  useEffect(() => {
  console.log(dataLeaveType)
  if (detailAttendanceSelected?.holiday_status_id.type === 'TC') {
    for(let i = 0; i < dataLeaveType.length; i++) {
      for (let j = 0; j < dataLeaveType[i].children.length; j++) {
        if (dataLeaveType[i].children[j].title === detailAttendanceSelected?.config_id.name) {
          if(typeLeaveValue !== dataLeaveType[i].children[j].value + '~' + detailAttendanceSelected?.id){
            form.resetFields();
          }
              
          setTypeLeaveValue(dataLeaveType[i].children[j].value + '~' + detailAttendanceSelected?.id);
          break;
        }
     
      }

    }
  }
  else if (detailAttendanceSelected?.holiday_status_id.type == 'P' || detailAttendanceSelected?.holiday_status_id.type == 'B'){
    for(let i = 0; i < dataLeaveType.length; i++) {
      if (dataLeaveType[i].title === detailAttendanceSelected?.holiday_status_id.name && dataLeaveType[i].children.length === 1) {
        if (typeLeaveValue !== dataLeaveType[i].children[0].value + '~' + detailAttendanceSelected?.id  ){
          form.resetFields();
        }
        
       

        setTypeLeaveValue(dataLeaveType[i].children[0].value + '~' + detailAttendanceSelected?.id);
        break;
      }
    }
  
  }
  else {
    if(typeLeaveValue !== detailAttendanceSelected?.holiday_status_id.type + '~' + detailAttendanceSelected?.id){
      form.resetFields();
    }
    
    setTypeLeaveValue(detailAttendanceSelected?.holiday_status_id.type + '~' + detailAttendanceSelected?.id);
  }
    

    

}, [triggerViewData]);
  



useEffect(() => {
  
  
  if(detailAttendanceSelected !== undefined && detailAttendanceSelected !== null){
    if (typeLeaveInfo[0] && typeLeaveInfo[0] === 'TC'){
      form.setFieldsValue({
        typeLeave: detailAttendanceSelected.config_id.name,
        reason: detailAttendanceSelected.reasons,
        typeReason: detailAttendanceSelected.for_reasons,
        leaveDay: moment(detailAttendanceSelected.from_date, 'YYYY-MM-DD'),
        // totalOvertimeHour: detailAttendanceSelected.time,
        totalOvertimeMinute: detailAttendanceSelected.minutes,
      });
   

    } else if (typeLeaveInfo[0] && typeLeaveInfo[0] === 'P' || typeLeaveInfo[0] === 'B') {
      console.log(detailAttendanceSelected?.time)
      form.setFieldsValue({
        leaveDay: [
          detailAttendanceSelected.from_date ? moment(detailAttendanceSelected.from_date, 'YYYY-MM-DD') : null,
          detailAttendanceSelected.date_to ? moment(detailAttendanceSelected.date_to, 'YYYY-MM-DD') : null
        ],
        reason: detailAttendanceSelected?.reasons,
        typeReason: detailAttendanceSelected?.for_reasons,
        typeLeave: detailAttendanceSelected?.holiday_status_id?.name,
        // restHour: detailAttendanceSelected?.time,
        restMinutes: detailAttendanceSelected?.minutes,
      }); 
      
    }
    else {

      form.setFieldsValue({
        leaveDay: [
          detailAttendanceSelected.from_date ? moment(detailAttendanceSelected.from_date, 'YYYY-MM-DD') : null,
          detailAttendanceSelected.date_to ? moment(detailAttendanceSelected.date_to, 'YYYY-MM-DD') : null
        ],
        reason: detailAttendanceSelected?.reasons,
        typeReason: detailAttendanceSelected?.for_reasons,
        typeLeave: detailAttendanceSelected?.holiday_status_id?.name,
        // restHour: detailAttendanceSelected?.time,
        restMinutes: detailAttendanceSelected?.minutes,
      });
    }

  }
    },[triggerFillData])




  return (
    <BaseForm
      title={`Tạo đơn`}
      showAddUpdate={show}
      onFinish={onFinish}
      setShowAddUpdate={setShow}
      showExplainForm={showExplainForm}
      setShowExplainForm={setShowExplainForm}
      form={form}
      isHideFooter={!isEditMode}
      detailAttendanceSelected={detailAttendanceSelected}
      compensatoryFund={conpensatoryfund}
    >
      {/* Loại đơn */}
      <Row gutter={24}>
        <Col span={24}>
          <SelectTypeLeave
            treeData={dataLeaveType}
            setTypeLeaveValue={setTypeLeaveValue}
            typeLeaveValue={typeLeaveValue}
          />
        </Col>
      </Row>
      {/* Thông tin xin nghỉ */}
      {typeLeaveInfo[0] && typeLeaveInfo[0] !== 'TC' && 
        <Row gutter={24}>
          <Col span={24}>
            <Text className="header-form">Thông tin xin nghỉ</Text>
          </Col>
          <Col span={24}>
            <Form.Item
              label={'Thời gian nghỉ'}
              name="leaveDay"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập thời gian nghỉ',
                },
              ]}>
              <RangePicker
                format={'DD/MM/YYYY'}
                style={{ width: '100%' }}
                onCalendarChange={onCalendarChange}
              />
            </Form.Item>
          </Col>
          {typeLeaveInfo[0] === 'B' && (
            <>
              <Col span={12}>
                <Text className="text-label">Quỹ bù:</Text>
              </Col>
              <Col span={12}>
                <Text className="text-label text-value">{conpensatoryfund ? (parseFloat(conpensatoryfund) < 0 ? 0 : conpensatoryfund) + ' giờ' : ''}</Text>
              </Col>
            </>
          )}
          {typeLeaveInfo[0] === 'P' && (
            <>
              <Col span={12}>
                <Text className="text-label">Quỹ phép:</Text>
              </Col>
              <Col span={12}>
                <Text className="text-label text-value">{conpensatoryfund ? (parseFloat(conpensatoryfund) < 0 ? 0 : conpensatoryfund) + ' giờ' : ''}</Text>
              </Col>
            </>
          )}
         
          <Col span={12}>
            <Form.Item
              label={'Số phút nghỉ'}
              name="restMinutes"
              rules={[
                { required: true, message: 'Vui lòng nhập số phút nghỉ!' },
              ]}>
              <Input
                type="number"
                min={0}
                size="middle"
                placeholder=" Vd: 30 phút"
              
              />
            </Form.Item>
          </Col>
        </Row>
      }
      {/* Thông tin tăng ca */}
      { typeLeaveInfo[0] && typeLeaveInfo[0] === 'TC' && 
      <>
        <Row gutter={24}>
          <Col span={24}>
            <Text className="header-form">Thông tin tăng ca</Text>
          </Col>
          <Col span={12}>
            <Form.Item
              label={'Ngày tăng ca'}
              name="leaveDay"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập ngày tăng ca',
                },
              ]}>
              <DatePicker format={'DD/MM/YYYY'} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              label={'Số phút tăng ca'}
              name="totalOvertimeMinute"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tổng thời gian tăng ca!',
                },
              ]}>
              <Input
                size="middle"
                type="number"
                min={0}
                placeholder=" Vd: 30 phút"
                
              />
            </Form.Item>
          </Col>


        </Row>


        



          
         
        </>
        
     

      }
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            label={'Vì lý do'}
            name="typeReason"
            rules={[{ required: true, message: 'Vui lòng chọn vì lý do!' }]}>
            <Radio.Group 
              defaultValue={defaultLeaveType}
              disabled={readOnly}
            >
              <Radio value={'1'}>Cá nhân</Radio>
              <Radio value={'2'}>Công việc</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={'Lý do:'}
            name="reason"
            rules={[{ required: true, message: 'Vui lòng nhập lý do!' }]}>
            <TextArea
              rows={5}
              placeholder="Tối đa 255 ký tự"
              maxLength={255}
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>
    </BaseForm>
  );
};

export default index;
