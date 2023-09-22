import { Button, Col, Divider, Form, Modal, Row, Typography } from 'antd';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { FormInstance } from 'antd/lib/form/Form';
import './style.css';
import moment from 'moment';
import { message as $message } from 'antd';
import { useSelector } from 'react-redux';
interface IBaseFormProps {
  showAddUpdate: boolean;
  title: string;
  setShowAddUpdate: (value: boolean) => void;
  children: ReactNode;
  showExplainForm: boolean;
  setShowExplainForm: (value: boolean) => void;
  form: FormInstance;
  isHideFooter?: boolean;
  onFinish: (formData: any) => void;
  isView?: boolean;
  detailAttendanceSelected?: any;
  compensatoryFund?: any;
}

const index = (props: IBaseFormProps) => {
  const {
    showAddUpdate,
    setShowAddUpdate,
    title,
    onFinish,
    children,
    isHideFooter,
    form,
    isView,
    detailAttendanceSelected,
    compensatoryFund,
  } = props;
  const { Text } = Typography;
  const { employee_code, employee_name, company, department, job_title, date } =
    useSelector(state => state.weekly);

  //===============================
  // State
  // ==============================
  // const [formError, setFormError] = useState(false);
  // ===============================
  // Handler
  // ===============================
  // const onFinish = async () => {
  //   console.log("onFinish");
  //   try {
  //     await form?.validateFields();
  //     onSubmit(await form?.getFieldsValue());
  //   } catch (error) {
  //     console.log("Lỗi xảy ra trong quá trình xử lý:", error);
  //     // Xử lý lỗi tại đây (ví dụ: hiển thị thông báo lỗi cho người dùng)
  //   }
  // };


  const currentDate = moment().format('DD/MM/YYYY');
  const invalidDate = moment(detailAttendanceSelected?.invalid_date).format('DD/MM/YYYY');
  console.log(detailAttendanceSelected)
  const create_date = moment(detailAttendanceSelected?.created_date).format('DD/MM/YYYY');


  //  dateText = moment(detailAttendanceSelected?.created_date).format('DD/MM/YYYY');


  const handleCancel = () => {
    setShowAddUpdate(false);
  };



  // console.log("detailAttendanceSelected", detailAttendanceSelected);

  // if (detailAttendanceSelected === null) {


  //   }
  // else {
  //  const dateText = moment(detailAttendanceSelected?.created_date).format('DD/MM/YYYY');
  // }  // const handleFormChange = () => {
  //   const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
  //   setFormError(hasErrors);
  // };
  //   =============================
  // Hooks
  // ===============================

  return (
    <Modal
      open={showAddUpdate}
      onCancel={handleCancel}
      maskClosable={false}
      title={title}
      footer={null} //} Ẩn nút "Cancel" và "OK"
      className="base-form"
    >
      <Form
        layout="vertical"
        form={form}
        disabled={isHideFooter}
        onFinish={onFinish}>
        <Text className="date-moment">
          Ngày tạo: {create_date}
        </Text>
        <Text className="date-moment">
          Ngày làm việc: {moment(date).format('DD/MM/YYYY')}
        </Text>

        {/* Thông tin nhân viên */}
        <Row gutter={24}>
          <Col span={24}>
            <Text className="header-form">Thông tin nhân viên</Text>
          </Col>
          <Col span={24}>
            <Row gutter={24} className="form-text-row">
              <Col span={8}>
                <Text className="text-label">Tên nhân viên:</Text>
              </Col>
              <Col span={16}>
                <Text className="text-label text-value">{employee_name}</Text>
              </Col>
            </Row>
            <Row gutter={24} className="form-text-row">
              <Col span={8}>
                <Text className="text-label">Mã nhân viên:</Text>
              </Col>
              <Col span={16}>
                <Text className="text-label text-value">{employee_code}</Text>
              </Col>
            </Row>
            <Row gutter={24} className="form-text-row">
              <Col span={8}>
                <Text className="text-label">Công ty:</Text>
              </Col>
              <Col span={16}>
                <Text className="text-label text-value">{company}</Text>
              </Col>
            </Row>
            <Row gutter={24} className="form-text-row">
              <Col span={8}>
                <Text className="text-label">Phòng ban:</Text>
              </Col>
              <Col span={16}>
                <Text className="text-label text-value">{department}</Text>
              </Col>
            </Row>
            <Row gutter={24} className="form-text-row">
              <Col span={8}>
                <Text className="text-label">Chức vụ:</Text>
              </Col>
              <Col span={16}>
                <Text className="text-label text-value">{job_title}</Text>
              </Col>
            </Row>
          </Col>
        </Row>
        {children}
        <Divider />
        {
          <Form.Item className="form-footer">
            <Button key={1} onClick={handleCancel}>
              Hủy bỏ
            </Button>
            <Button key={2} type="primary" htmlType="submit" >
              Cập nhật
            </Button>
          </Form.Item>
        }
      </Form>
    </Modal>
  );
};

export default index;
