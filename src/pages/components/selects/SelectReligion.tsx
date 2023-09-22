import MyForm from '@/components/core/form';
import { religionOptions } from '@/const/options';
import { useEffect, useState } from 'react';

interface IReligion {
    value: number;
    label: string;
}

const SelectReligion = ({ ...props }) => {
    const [religion, setReligion] = useState<IReligion[]>([]);
    const [isMounted, setIsMounted] = useState(true); 

    useEffect(() => {
        setIsMounted(true);
        religionOptions().then((res) => {
            if (isMounted) { 
                setReligion(res);
            }
        });

        return () => {
            setIsMounted(false);
        };
    }, []);

    return (
        <MyForm.Item
            options={religion}
            label={'Tôn giáo'}
            {...props}
            name="religion_id"
            type="select"
            innerProps={{
                showSearch: true,
                placeholder: 'Vui lòng chọn',
                defaultValue: '',
                loading: !religion.length,
                allowClear: true,
            }}
        />
    )
}

export default SelectReligion;
