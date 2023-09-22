import MyForm from '@/components/core/form';
import { jobOptions } from '@/const/options';
import { useEffect, useState } from 'react';

interface IJob {
    value: number;
    label: string;
}

const SelectJob = ({ ...props }) => {
    const [job, setJob] = useState<IJob[]>([]);
    useEffect(() => {
        jobOptions().then((res) => {
            setJob(res);
        });
    }, []);
    return (
        <MyForm.Item
            options={job}
            label={'Chức vụ'}
            {...props}
            name="job_id"
            type="select"
            innerProps={{
                placeholder: 'Vui lòng chọn',
                allowClear: true,
                loading: !job.length,
            }}


        />
    )
}

export default SelectJob;