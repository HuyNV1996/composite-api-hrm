import MyForm from '@/components/core/form';
import { wardOptions } from '@/const/options';
import { useEffect, useState } from 'react';

interface IWard {
    value: number;
    label: string;
    district_id: number;
}

const SelectWard = ({ selectedDistrictId,...props }: any) => {
    const [ward, setWard] = useState<IWard[]>([]);
    const [isMounted, setIsMounted] = useState(true);
    useEffect(() => {
        setIsMounted(true);
        wardOptions().then((res) => {
            if (isMounted) {
                setWard(res);
            }
        });
        return () => {
            setIsMounted(false);
        }
    }, []);
    const filteredWard = ward.filter((ward) => ward.district_id === selectedDistrictId);
    return (
        <MyForm.Item
            options={filteredWard}
            label={'Phường/Xã'}
            {...props}
            name="ward_vietnam_id"
            type="select"
            innerProps={{
                placeholder: 'Vui lòng chọn',
                allowClear: true,
                loading: !ward.length,

            }}
        />
    )
}

export default SelectWard;