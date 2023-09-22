import MyForm from '@/components/core/form';
import { leaveTypeOptions} from '@/const/options';
import React from 'react';
import { getListLeaveType} from '@/api/shift/leavetype';
import {useEffect , useState} from 'react';


interface ILeaveType  {
    value: string;
    label: string;
}

const SelectListLeaveType = ({ ...props }) => {

    const [leavetype , setLeavetype] = useState<ILeaveType[]>([]);

    useEffect(() => {
        leaveTypeOptions().then((res) => {
            // console.log(res);
            setLeavetype(res);
        });
    }, []);
        
     
    return (
      <MyForm.Item
          options={leavetype}
          label={'Mã ca nghỉ'}
          {...props}
          name="rest_shift_id"
          type="select"
          innerProps={{
            allowClear: true,
            loading: !leavetype.length,
          }}
          
        />
    );
  };
  
  export default SelectListLeaveType;