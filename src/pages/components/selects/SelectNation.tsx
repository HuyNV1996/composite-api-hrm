import MyForm from '@/components/core/form';
import { nationOptions } from '@/const/options';
import { useEffect, useState } from 'react';

interface INation {
    value: number;
    label: string;
}

const SelectNation = ({ ...props }) => {
    const [nation, setNation] = useState<INation[]>([]);
    useEffect(() => {
        nationOptions().then((res) => {
            setNation(res);
        });
    }, []);
    return (
        <MyForm.Item
            options={nation}
            label={'Dân tộc'}
            {...props}
            name="nation_id"
            type="select"
            innerProps={{
                placeholder: 'Vui lòng chọn',
                allowClear: true,
                loading: !nation.length,
            }}
        />
    )
}

export default SelectNation;