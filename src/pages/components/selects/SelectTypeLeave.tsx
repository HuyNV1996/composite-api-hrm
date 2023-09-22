import MyForm from '@/components/core/form';
import { leaveTypeOptions } from '@/const/options';
import React from 'react';
import { getLeaveTypeSource, getListLeaveType } from '@/api/shift/leavetype';
import { useEffect, useState } from 'react';
import { formatObjectLabelValue } from '@/utils/common';

interface ILeaveType {
  value: string;
  label: string;
}

const SelecLeaveType = ({ ...props }) => {
  const [leavetype, setLeavetype] = useState<ILeaveType[]>([]);
  const fetchTypeLeaveSource = async () => {
    const res = await getLeaveTypeSource();
    if (res) {
      let array : any = [];
      for (let i = 0; i < res.result.length; i++) {
        const object = res.result[i];
        if(object.name == "Nghỉ phép năm" || object.name == "Nghỉ bệnh" ||  object.name == "Ngày nghỉ bù" || object.name == "Ngày tăng ca"){
           array.push(res.result[i])
        }
        // Do something with the 'object'
      }
      console.log("result selection is" , array)
      if (Array.isArray(res.result) && res.result.length > 0) {
        setLeavetype(formatObjectLabelValue(array));
      }
    }
  };
  useEffect(() => {
    fetchTypeLeaveSource();
  }, []);

  return (
    <MyForm.Item
      options={leavetype}
      label={'Loại đơn'}
      {...props}
      name="type_leave"
      type="select"
    />
  );
};

export default SelecLeaveType;
