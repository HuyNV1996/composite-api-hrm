import MyForm from '@/components/core/form';
import { stateOptions } from '@/const/options';
import { useEffect, useState } from 'react';

interface IState {
    value: number;
    label: string;
}

const SelectIssuedByIdentification = ({ ...props }) => {
    const [state, setState] = useState<IState[]>([]);
    useEffect(() => {
        stateOptions().then((res) => {
            setState(res);
        });
    }, []);
    return (
        <MyForm.Item
            options={state}
            label={'Nơi cấp CMND/CCCD'}
            {...props}
            name="issued_by_identification"
            type="select"
            innerProps={{
                placeholder: 'Vui lòng chọn',
                allowClear: true,
                loading: !state.length,
            }}
        />
    )
}

export default SelectIssuedByIdentification;