import { useEffect, useState } from 'react';
import BaseForm from '../../base-form';
import { Col, DatePicker, Form, Input, Radio, Row, Typography } from 'antd';
import { createExplainLeave } from '@/api/weeklyreport/weeklyreport';
import './style.css';
import { setGlobalState } from '@/stores/global.store';
import store from '@/stores';
import { message as $message } from 'antd';
import { InvalidTimesheet } from '@/interface/weeklyreport/type';
import detailAttendanceSlice from '../../../../../../stores/detail-attendance.store';
import { createInvalidTimeSheet } from '@/api/invalidTimesheet/invalidTimesheet.api';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { convertFloatToHourMinute } from '@/utils/common';
interface ILeaveFormProps {
  show: boolean;
  setShow: (value: boolean) => void;
  showExplainForm: boolean;
  setShowExplainForm: (value: boolean) => void;
  foreUpdateLeave: boolean;
  setForceUpdateLeave: (valueType: boolean) => void;
  detailAttendanceSelected: InvalidTimesheet;
  isView: boolean;
  isCreating: boolean;
}
const index = (props: ILeaveFormProps) => {
  const {
    show,
    setShow,
    showExplainForm,
    setShowExplainForm,
    foreUpdateLeave,
    setForceUpdateLeave,
    detailAttendanceSelected,
    isView,
    isCreating
  } = props;
  const [form] = Form.useForm();
  const { Text } = Typography;
  const { TextArea } = Input;
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { employee_code, employee_name, company, department, job_title, date,shift_start,shift_end,split_shift,attendance_attempt_1,last_attendance_attempt } =
    useSelector(state => state.weekly);
  // ================================
  // Selector
  // ================================
  const onFinish = async (formData: any) => {
    console.log(formData.reason, formData.remarks);
    store.dispatch(
      setGlobalState({
        loading: true,
      })
    );
    const body = {
      params: {
        args: [
          detailAttendanceSelected.id,
          formData.reason.toString(),
          formData.remarks,
          "2",
          detailAttendanceSelected.invalid_type,
        ],
      },
    };
    store.dispatch(
      setGlobalState({
        loading: true,
      })
      );
    if (isCreating) {
      let data = await form?.getFieldsValue();
      data.employee_code = employee_code;
      data.shift_break = split_shift;
      data.shift_from = shift_start;
      data.shift_to = shift_end;
      data.validated = "1";
      data.invalid_date = date;
      data.invalid_type = 3;
      data.real_time_attendance_data = attendance_attempt_1 ? attendance_attempt_1 : last_attendance_attempt
      data.validation_data = attendance_attempt_1 ? shift_start && convertFloatToHourMinute(shift_start) : shift_end && convertFloatToHourMinute(shift_end)
      const res = await createInvalidTimeSheet(data)
      if (res) {
        store.dispatch(
          setGlobalState({
            loading: false,
          })
        );
        setForceUpdateLeave(!foreUpdateLeave);
        setShow(!show);
        form.resetFields();
        $message.success("Tạo giải trình thành công");
      }
      else {
        $message.error("Có lỗi xảy ra");
      }
    }
    else {
      const res = (await createExplainLeave(body)) as any;
      if (res.result) {
        console.log(res.result);
        store.dispatch(
          setGlobalState({
            loading: false,
          })
          );
          form.resetFields();
          setForceUpdateLeave(!foreUpdateLeave);
          setShow(!show);
        } else {
          $message.error(res.error.data.message ?? res.error.message);
        }
      }
  };
  useEffect(() => {
    if (isView) {
      form.setFieldsValue({
        reason: Number(detailAttendanceSelected.reason),
        remarks: detailAttendanceSelected.remarks ? detailAttendanceSelected.remarks : '',
      });
      setIsEditMode(false);
    } else {
      setIsEditMode(true);
      form.setFieldsValue({
        reason: Number(detailAttendanceSelected.reason),
        remarks: detailAttendanceSelected.remarks ? detailAttendanceSelected.remarks : '',
      });
    }
  }, [show, isView, form, detailAttendanceSelected]);
  return (
    <BaseForm
      title={`Tạo giải trình`}
      showAddUpdate={show}
      onFinish={onFinish}
      setShowAddUpdate={setShow}
      showExplainForm={showExplainForm}
      setShowExplainForm={setShowExplainForm}
      form={form}
      isHideFooter={!isEditMode}
      isView={isView}
      detailAttendanceSelected={detailAttendanceSelected}
      >
      
      {/* Lý do */}
      <Col span={24} style={{ marginTop: 20 }}>
        <Text className="header-form">Lý do</Text>
      </Col>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="reason"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn lý do!',
              },
            ]}>
            <Radio.Group>
              <Radio value={1}>Cá nhân</Radio>
              <Radio value={2}>Công việc</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={24} style={{ marginTop: 20 }}>
          <Text className="header-form">Nội dung giải trình</Text>
        </Col>
        <Col span={24}>
          <Form.Item
            label={'Nội dung'}
            name="remarks"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}>
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
