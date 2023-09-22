import MyForm from '@/components/core/form';
import { jobOptions } from '@/const/options';
import { useEffect, useState } from 'react';

export interface IJob {
    value: number;
    label: string;
}

 const SelectSubJob = ({ ...props }) => {
    const [job, setJob] = useState<IJob[]>([]);
    useEffect(() => {
        jobOptions().then((res) => {
            setJob(res);
        });
    }, []);
    return (
        <MyForm.Item
            options={job}
            label={'Chức vụ kiêm nhiệm'}
            {...props}
            name="part_time_job_title"
            type="select"
            innerProps={{
                placeholder: 'Vui lòng chọn',
                allowClear: true,
                loading: !job.length,
            }}


        />
    )
}

export default SelectSubJob;