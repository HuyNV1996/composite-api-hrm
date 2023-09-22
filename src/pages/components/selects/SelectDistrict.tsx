import MyForm from '@/components/core/form';
import { districtOptions } from '@/const/options';
import { useEffect, useState } from 'react';

interface IDistrict {
    value: number;
    label: string;
    state_id: number;
}

const SelectDistrict = ({ onChange, selectedStateId, selectedDistrictId, ...props }: any) => {
    const [district, setDistrict] = useState<IDistrict[]>([]);
    const [isMounted, setIsMounted] = useState(true);
    useEffect(() => {
        setIsMounted(true);
        districtOptions().then((res) => {
            if (isMounted) {
                setDistrict(res);
            }
        });
        return () => {
            setIsMounted(false);
        }
    }, []);
    const filteredDistrict = district.filter((district) => district.state_id === selectedStateId);
    return (
        <MyForm.Item
            options={filteredDistrict}
            label={'Quận/Huyện'}
            {...props}
            name="district_vietnam_id"
            type="select"
            innerProps={{
                placeholder: 'Vui lòng chọn',
                allowClear: true,
                loading: !district.length,
                onChange: (value: number) => {
                    console.log(value)
                    onChange(value)
                }
            }}
        />
    )
}

export default SelectDistrict;