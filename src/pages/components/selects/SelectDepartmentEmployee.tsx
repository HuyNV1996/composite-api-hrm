import MyForm from '@/components/core/form';
import { departmentOptions } from '@/const/options';
import { useEffect, useState } from 'react';
import MyPage from '@/components/business/page';
interface IDepartment {
    value: number;
    label: string;
}
const { Item: SearchItem } = MyPage.MySearch;
const SelectDepartmentEmployee = ({ ...props }) => {
    const [department, setDepartment] = useState<IDepartment[]>([]);
    const [isMounted, setIsMounted] = useState(true);
    useEffect(() => {
        setIsMounted(true);
        departmentOptions().then((res) => {
            if (isMounted)
                setDepartment(res);

        });
        return () => {
            setIsMounted(false);
        }
    }, []);
    return (
        <SearchItem
            options={department}
            label={'Phòng ban'}
            {...props}
            name="department_id"
            type="select"
            innerProps={{
                placeholder: 'Vui lòng chọn',
                allowClear: true,
            }}


        />
    )
}

export default SelectDepartmentEmployee;