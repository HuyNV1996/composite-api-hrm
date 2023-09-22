import MyForm from '@/components/core/form';
import { cityOptions } from '@/const/options';
import { useEffect, useState } from 'react';

interface ICity {
    value: number;
    label: string;
}

const SelectCity = ({ ...props }) => {
    const [city, setCity] = useState<ICity[]>([]);
    const [isMounted, setIsMounted] = useState(true); 

    useEffect(() => {
        setIsMounted(true);
        cityOptions().then((res) => {
            if (isMounted) { 
                setCity(res);
            }
        });

        return () => {
            setIsMounted(false);
        };
    }, []);

    return (
        <MyForm.Item
            options={city}
            label={'Tỉnh/Thành phố'}
            {...props}
            name="city_id"
            type="select"
            innerProps={{
                showSearch: true,
                placeholder: 'Vui lòng chọn',
                defaultValue: '',
                loading: !city.length,
            }}
        />
    )
}

export default SelectCity;