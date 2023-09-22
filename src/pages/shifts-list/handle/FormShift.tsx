import { Button, Col, Drawer, FormInstance, Row, Spin, TimePicker } from 'antd';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { message as $message } from 'antd';
import { getListShifts } from '@/api/weeklyreport/weeklyreport';
import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import RadioCaGay from '@/pages/components/radios/RadioCaGay';
import { createShift, updateShift } from '@/api/shift/shift.api';
import { getListCompany } from '@/api/shift/company';
import { getListLeaveType } from '@/api/shift/leavetype';
import SelectCompany from '@/pages/components/selects/SelectCompany';
import SelectListLeaveType from '@/pages/components/selects/SelectListLeaveType';
import moment from 'moment';

interface Props {
  onClose?: () => void;
  showDrawer?: () => void;
  open?: boolean;
  idShift?: string;
  setFoceUpdate?: Dispatch<SetStateAction<boolean>>;
  foceUpdate?: boolean;
  form?: FormInstance<any>;
}
const FormShift: FC<Props> = ({
  onClose,
  open,
  idShift,
  foceUpdate,
  setFoceUpdate,
  form,
}) => {
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const onFinish = async () => {
    await form?.validateFields();
    const data = await form?.getFieldsValue();
    let convert_decimal = (timestring: string) => {
      const [hours, minutes] = timestring.split(':').map(Number);
      return hours + minutes / 60;
    };

    if (data.rest_shift_id == undefined) {
      data.rest_shift_id = null;
    }

    let start_work_time = convert_decimal(data.start_work_time.format('HH:mm'));
    let end_work_time = convert_decimal(data.end_work_time.format('HH:mm'));
    let start_rest_time = convert_decimal(data.start_rest_time.format('HH:mm'));
    let end_rest_time = convert_decimal(data.end_rest_time.format('HH:mm'));

    if (!data.night) {
      if (end_rest_time < start_work_time || start_rest_time > end_work_time || end_rest_time > end_work_time || start_rest_time < start_work_time) {
        $message.error('Thời gian nghỉ không hợp lệ');
        return;
      }
    }

    if (data.company == false) {
      $message.error('Vui lòng chọn công ty');
      return;
    }

    if (data.name == false) {
      $message.error('Vui lòng nhập tên ca');
      return;
    }

    let new_data = {
      name: data.name,
      company_id: data.company,
      start_work_time: start_work_time,
      end_work_time: end_work_time,
      start_rest_time: start_rest_time,
      end_rest_time: end_rest_time,
      fix_rest_time: data.fix_rest_time,
      night: data.night,
      rest_shifts: data.rest_shifts,
      breakfast: data.breakfast,
      lunch: data.lunch,
      dinner: data.dinner,
      rest_shift_id: data.rest_shift_id,
      number_of_attendance: data.number_of_attendance,
      day_work_value: data.day_work_value,
    };



    let jsonbody = {
      params: {
        data: new_data,
      },
    };

    if (idShift == null || idShift == undefined) {
      const res = await getListShifts();
      for (let item of res.result) {
        if (item.name == new_data.name) {
          $message.error('Ca làm việc đã tồn tại');
          return;
        }
      }
    }


    if (new_data) {
      try {
        setLoading(true);
        const res = idShift
          ? await updateShift(jsonbody, idShift)
          : await createShift(jsonbody);
        console.log(res);
        if (res) {
          $message.success('Thành công');
          setFoceUpdate && setFoceUpdate(!foceUpdate);
          onClose && onClose();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getfetchByIdShift = async () => {
    if (!idShift) {
      return;
    }
    try {
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getfetchByIdShift();
  }, [idShift]);

  const [readOnlyState, setReadonlystate] = useState<boolean>(true);
  const [nightDisabled, setNightDisabled] = useState<boolean>(false);
  const [restShiftDisabled, setRestShiftDisabled] = useState<boolean>(false);
  const [fixRestTimeDisabled, setFixRestTimeDisabled] = useState<boolean>(false);
  const setOnchangeReadonly = () => {
    const data = form?.getFieldsValue();
    console.log("data is ", data)

    if (data.start_work_time == null || data.start_work_time == undefined || data.end_work_time == undefined || data.end_work_time == null) {
      setReadonlystate(true);
      console.log("updated")
    }
    else {
      setReadonlystate(false);
      console.log("missed")
    }
  }
  
  const setOnchangeNight = () => {
    const data = form?.getFieldsValue();
    if (data.night) {
      setRestShiftDisabled(true)
      setFixRestTimeDisabled(true)
    }
    else {
      setRestShiftDisabled(false)
      setFixRestTimeDisabled(false)
    }
  }
  const setOnchangeRestShift = () => {
    const data = form?.getFieldsValue();
    if (data.rest_shifts) {
      setNightDisabled(true)
      setFixRestTimeDisabled(true)
    }
    else {
      setNightDisabled(false)
      setFixRestTimeDisabled(false)
    }
  }
  const setOnchangeFixRestTime = () => {
    const data = form?.getFieldsValue();
    if (data.fix_rest_time) {
      setNightDisabled(true)
      setRestShiftDisabled(true)
    }
    else {
      setNightDisabled(false)
      setRestShiftDisabled(false)
    }
  }

  useEffect(() => {
    setOnchangeReadonly();
  }, [open]);


  return (
    <>
      <Drawer
        key={idShift}
        title={idShift ? t({ id: 'update' }) : t({ id: 'create' })}
        width={720}
        onClose={onClose}
        open={open}
        destroyOnClose
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button key={1} onClick={onClose}>
              Hủy
            </Button>
            <Button key={2} onClick={onFinish} type="primary" loading={loading}>
              Lưu
            </Button>
          </div>
        }>
        <Spin spinning={loading}>
          <MyForm<any> onFinish={onFinish} form={form} layout="vertical">
            <Row gutter={24}>
              <Col span={12}>
                <MyForm.Item
                  innerProps={{
                    placeholder: t(
                      { id: 'placeholder_input' },
                      { msg: 'tên ca' }
                    ),
                  }}
                  rules={[
                    {
                      max: 150,
                      message: "Tên ca không được vượt quá 150 ký tự"
                    },
                    {
                      required: true,
                      message: "Vui lòng nhập tên ca"
                    }
                  ]}
                  label={'Tên ca'}
                  name="name"
                  type="input"
                />
              </Col>

              <Col span={12}>
                <SelectCompany />
              </Col>

              <Col span={12}>
                <MyForm.Item
                  label={'Thời gian bắt đầu làm'}
                  name="start_work_time"
                  type="time-picker"
                  required
                  innerProps={{
                    format: 'HH:mm',
                    // inputReadOnly:true,
                    onChange: setOnchangeReadonly,
                  }}
                />
              </Col>
              <Col span={12}>
                <MyForm.Item
                  label={'Thời gian kết thúc làm'}
                  name="end_work_time"
                  type="time-picker"
                  required

                  innerProps={{
                    format: 'HH:mm',
                    // inputReadOnly:true,
                    onChange: setOnchangeReadonly,
                    
                  }}
                />
              </Col>

              <Col span={12}>
                <MyForm.Item
                  label={'Thời gian bắt đầu Nghỉ'}
                  name="start_rest_time"
                  type="time-picker"
                  required
                  innerProps={{
                    format: 'HH:mm',
                    disabled: readOnlyState,
                  }}
                />
              </Col>
              <Col span={12}>
                <MyForm.Item
                  label={'Thời gian kết thúc Nghỉ'}
                  name="end_rest_time"
                  type="time-picker"
                  required
                  innerProps={{
                    format: 'HH:mm',
                    disabled: readOnlyState,
                  }}
                />
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <MyForm.Item
                  options={[
                    { label: 'có', value: true },
                    { label: 'không', value: false },
                  ]}
                  label={'Ca Nghỉ'}
                  name="rest_shifts"
                  type="radio"
                  required
                  innerProps={{
                    disabled: restShiftDisabled,
                    onChange: setOnchangeRestShift,
                  }}
                  initialValue={false}
                />
              </Col>
              

                <Col span={8}>
                  <MyForm.Item
                    options={[
                      { label: 'có', value: true },
                      { label: 'không', value: false },

                    ]}
                    label={'Ca đêm'}
                    name="night"
                    type="radio"
                    required
                    innerProps={{
                      disabled: nightDisabled,
                      onChange: setOnchangeNight,
                    }}
                    initialValue={false}
                  />
                </Col>
              

              <Col span={8}>
                <RadioCaGay disabled={fixRestTimeDisabled} onChange={setOnchangeFixRestTime}/>
              </Col>

              {/* </Row> */}
            </Row>

            <Row gutter={24}>
              <Col span={8}>
                <MyForm.Item
                  options={[
                    { label: 'có', value: true },
                    { label: 'không', value: false },
                  ]}
                  label={'Ăn sáng'}
                  name="breakfast"
                  type="radio"
                  required
                  initialValue={false}
                />
              </Col>

              <Col span={8}>
                <MyForm.Item
                  options={[
                    { label: 'có', value: true },
                    { label: 'không', value: false },
                  ]}
                  label={'Ăn trưa'}
                  name="lunch"
                  type="radio"
                  required
                  initialValue={false}
                />
              </Col>

              <Col span={8}>
                <MyForm.Item
                  options={[
                    { label: 'có', value: true },
                    { label: 'không', value: false },
                  ]}
                  label={'Ăn tối'}
                  name="dinner"
                  type="radio"
                  required
                  initialValue={false}
                />
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <SelectListLeaveType
                />
              </Col>

              {/* <Col span={8}>
                <MyForm.Item
                  label={'Số lần chấm công'}
                  name="number_of_attendance"
                  type="input"
                  initialValue={2}
                />
              </Col> */}

              {/* <Col span={8}>
                <MyForm.Item
                  label={'Giá trị ca làm'}
                  name="day_work_value"
                  type="input"
                  initialValue={2}
                />
              </Col> */}
            </Row>
          </MyForm>
        </Spin>
      </Drawer>
    </>
  );
};

export default FormShift;
