import MyForm from '@/components/core/form';
import { stateOptions } from '@/const/options';
import { useEffect, useState } from 'react';

interface IState {
    value: number;
    label: string;
    country_id: number;
}



const SelectState = ({ onChange,selectedCountryId,selectedStateId, ...props }: any) => {
    const [states, setStates] = useState<IState[]>([]);
    const [isMounted, setIsMounted] = useState(true);
    useEffect(() => {
        stateOptions().then((res) => {
            if (isMounted) {
                setStates(res);
            }
        });

        return () => {
            setIsMounted(false);
        };
    }, []);
    const filteredState = states.filter((state) => state.country_id === selectedCountryId);

    return (
        <MyForm.Item
            options={filteredState}
            label={'Tỉnh/Thành phố'}
            {...props}
            name="state_id"
            type="select"
            innerProps={{
                placeholder: 'Vui lòng chọn',
                allowClear: true,
                loading: !states.length,
                onChange: (value: number) => {
                    console.log(value)
                    onChange(value)
                }
            }}
        />
    );
};

export default SelectState;
