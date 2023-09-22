import MyForm from '@/components/core/form';
import { countryOptions } from '@/const/options';
import { useEffect, useState } from 'react';

interface ICountry {
    value: number;
    label: string;
}

const SelectCountry = ({ onChange, selectedCountryId, ...props }: any) => {
    const [country, setCountry] = useState<ICountry[]>([]);
    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        countryOptions().then((res) => {
            if (isMounted && res) {
                setCountry(res);
            }   
        });

        return () => {
            setIsMounted(false);
        }
    }, []);

    
    return (
        <MyForm.Item
            options={country}
            label={'Quốc gia'}
            {...props}
            name="country_id"
            type="select"
            innerProps={{
                loading: !country.length,
                placeholder: 'Vui lòng chọn',
                allowClear: true,
                onChange: (value: number) => {
                    console.log(value)
                    onChange(value)
                }

            }}
        />
    );
}

export default SelectCountry;