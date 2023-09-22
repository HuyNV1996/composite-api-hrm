import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { useState } from 'react';

import { FC } from 'react';
import { createLeaveAllocation, getEmployeeLeaveList } from '@/api/employee/leave.api';
import { ILeaveAllocationArgs, ILeaveManagement, ILeaveManagementArgs } from '@/interface/leaveManagement';
import store from '@/stores';
import { setGlobalState } from '@/stores/global.store';
import SearchLeaveManagement from '../components/search';
import { useEffect } from 'react';
import { formatDate } from '@/utils/formatDate';
import { Button, Spin, message } from 'antd';
import { LocaleFormatter } from '@/locales';





const leaveManagement: FC = () => {
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [foceUpdate, setFoceUpdate] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    useEffect(() => {
        const currentDate = new Date();
        setSelectedMonth(currentDate.getMonth());
        setSelectedYear(currentDate.getFullYear());
    }, []);

    const handleDateChange = (date: { month: number; year: number } | null) => {
        if (date) {
            setSelectedMonth(date.month);
            setSelectedYear(date.year);
        }
    };
    const generatePageTitle = () => {
        if (selectedMonth && selectedYear) {
            const formattedDate = `${selectedMonth.toString().padStart(2, '0')}/${selectedYear}`;
            return `Quản lý phép tháng ${formattedDate}`;
        } else {
            return 'Quản lý phép';
        }
    };
    const _getLeaveManagementByArgs = async (params: ILeaveManagementArgs) => {
        store.dispatch(setGlobalState({ loading: true }));
        const updatedParams: ILeaveManagementArgs = {
            ...params,
            month: selectedMonth !== null ? selectedMonth : params.month,
            year: selectedYear !== null ? selectedYear : params.year,
        };
        const res = await getEmployeeLeaveList(updatedParams);
        if (res) {
            store.dispatch(setGlobalState({ loading: false }));
            return res;
        }
    }
    const handleClick = async () => {
        try {
            setIsloading(true);
            const paramMonth = (new Date().getMonth() - 1)
            const paramYear = new Date().getFullYear()
            const params: ILeaveManagementArgs = {
                month: paramMonth,
                year: paramYear,
                name: "",
                code: "",
                department_name: "",
                position: "",
            };
            console.log({ "paramMonth": params.month, "paramYear": params.year })
            const leaveList = await getEmployeeLeaveList(params);
            if (leaveList) {
                if (!leaveList.results.data || leaveList.results.data.length === 0) {
                    message.warning("No data to allocate leave.");
                    return;
                }
                const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

                for (const item of leaveList.results.data) {
                    const tong_phep_diff = (item.tong_phep_nam - Number(item.tong_phep)).toFixed(0);
                    if (!tong_phep_diff) {
                        continue;
                    }
                    console.log({
                        "tong phep nam": item.tong_phep_nam,
                        "name": item.name,
                        "phep_tang_theo_tham_nien": item.phep_tang_theo_tham_nien,
                        "tong_phep_diff": tong_phep_diff,
                        "Ngay Huong Phep Nam": item.date_start,
                        "ngay thoi viec": item.severance_day,
                        "date": new Date(new Date().getFullYear(), new Date().getMonth(), 0).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        }),
                    })
                    const args: ILeaveAllocationArgs = {
                        type: "P",
                        code: item.code,
                        date: new Date(new Date().getFullYear(), new Date().getMonth(), 0).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        }),
                        minutes: Number(tong_phep_diff),
                        annual_leave_fund: item.phep_nam_con_lai
                    };


                    const res = await createLeaveAllocation(args);
                    await delay(50);
                }
                for (const item of leaveList.results.data) {
                    const tham_nien_diff = (Number(item.tong_tham_nien) * 365 * 480 - Number(item.tham_nien)).toFixed(1);
                    // console.log({
                    //     "tong tham nien": item.tong_tham_nien,
                    //     "tham_nien": item.tham_nien,
                    //     "name": item.name,
                    //     "tham_nien_diff": tham_nien_diff,
                    //     "date": new Date(new Date().getFullYear(), new Date().getMonth() - 1, 0).toLocaleDateString('en-GB', {
                    //         day: '2-digit',
                    //         month: '2-digit',
                    //         year: 'numeric'
                    //     }),
                    // })
                    if (!tham_nien_diff) {
                        continue;
                    }
                    const args = {
                        type: "TN",
                        code: item.code,
                        date: new Date(new Date().getFullYear(), new Date().getMonth(), 0).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        }),
                        minutes: Number(tham_nien_diff),
                        annual_leave_fund: item.phep_nam_con_lai
                    };
                    const res = await createLeaveAllocation(args);
                    await delay(50);
                }
                setFoceUpdate(!foceUpdate);
                setIsloading(false);
                message.success("Leave allocation completed.");
            }
        } catch (error) {
            console.error(error);
            message.error("Error while allocating leaves.");
        }

    };
    const tableColums: MyPageTableOptions<ILeaveManagement> = [
        {
            title: '#',
            dataIndex: 'no',
            key: 'id',
            width: 60,
            align: 'left'
        },
        {
            title: 'Thông Tin Nhân Viên',
            width: 150,
            align: "center",
            children: [
                {
                    title: 'Mã nhân viên',
                    dataIndex: 'code',
                    key: 'code',
                    width: 150,
                    align: 'left'
                },
                {
                    title: 'Tên nhân viên',
                    dataIndex: 'name',
                    key: 'name',
                    width: 150,
                    align: 'left'
                },
                {
                    title: 'Phòng ban',
                    dataIndex: 'department_name',
                    key: 'department_name',
                    width: 250,
                    align: 'left'
                },
                {
                    title: 'Vị trí',
                    dataIndex: 'position',
                    key: 'position',
                    width: 100,
                    align: 'left'
                },

            ]
        },
        {
            title: "Ngày tháng",
            width: 100,
            align: "center",
            children: [

                {
                    title: 'Ngày vào làm',
                    dataIndex: 'workingday',
                    key: 'workingday',
                    width: 120,
                    align: 'left',
                    render: (item: string) => {
                        return (
                            <span>{item && formatDate(item)}</span>
                        )
                    }
                },
                {
                    title: 'Ngày ký HĐLĐ',
                    dataIndex: 'date_start',
                    key: 'date_start',
                    width: 120,
                    align: 'left',
                    render: (item: string) => {
                        return (
                            <span>{item && formatDate(item)}</span>
                        )
                    }
                },
                {
                    title: 'Ngày hưởng phép năm',
                    dataIndex: 'leave_date',
                    key: 'leave_date',
                    width: 170,
                    align: 'left',
                    render: (item: string) => {
                        return (
                            <span>{item && formatDate(item)}</span>
                        )
                    }
                },
                {
                    title: 'Ngày nghỉ việc',
                    dataIndex: 'severance_day',
                    key: 'severance_day',
                    width: 120,
                    align: 'left',
                    render: (item: string) => {
                        return (
                            <span>{item && formatDate(item)}</span>
                        )
                    }
                },
            ]
        },
        {
            title: "Phép năm tăng theo từng tháng",
            width: 150,
            align: "center",
            children: [
                {
                    title: 'Thâm niên(năm)',
                    dataIndex: 'tham_nien',
                    key: 'tham_nien',
                    width: 120,
                    align: 'left',
                    render: (item: number) => {
                        return (
                            <span>{item && item > 0 ? (item / 365 / 480).toFixed(1) : 0}</span>
                        )
                    }
                },
                {
                    title: "Số ngày phép(ngày)",
                    dataIndex: 'so_ngay_phep',
                    key: 'so_ngay_phep',
                    width: 150,
                    align: 'left',
                    render: (item: number) => {
                        return (
                            <span>{item && item > 0 ? (item).toFixed(3) : 0}</span>
                        )
                    }
                },
                {
                    title: 'Phép tăng theo thâm niên',
                    dataIndex: 'phep_tang_theo_tham_nien',
                    key: "phep_tang_theo_tham_nien",
                    width: 180,
                    align: 'left',
                    render: (item: number) => {
                        return (
                            <span>{item && item > 0 ? item : 0}</span>
                        )
                    }
                },
                {
                    title: 'Tổng phép năm(phút)',
                    dataIndex: 'tong_phep',
                    key: 'tong_phep',
                    width: 160,
                    align: 'left',
                    render: (item: number) => {
                        return (
                            <span>{item && item ? item.toFixed(0) : 0}</span>
                        )
                    }
                },

            ]
        },
        {
            title: "Đã dùng theo dữ liệu chấm công hàng tháng",
            width: 150,
            align: "center",
            children: [
                {
                    title: "Phép 1",
                    dataIndex: "phep_1",
                    key: "phep_1",
                    width: 100,
                    align: "left",
                    render: (item: number) => {
                        return <span>{item && item.toFixed(0)}</span>;
                    },
                },
                {
                    title: "Phép 2",
                    dataIndex: "phep_2",
                    key: "phep_2",
                    width: 100,
                    align: "left",
                    render: (item: number) => {
                        return <span>{item && item.toFixed(0)}</span>;
                    },
                },
                {
                    title: "Phép 3",
                    dataIndex: "phep_3",
                    key: "phep_3",
                    width: 100,
                    align: "left",
                    render: (item: number) => {
                        return <span>{item && item.toFixed(0)}</span>;
                    },
                },
                {
                    title: "Phép 4",
                    dataIndex: "phep_4",
                    key: "phep_4",
                    width: 100,
                    align: "left",
                    render: (item: number) => {
                        return <span>{item && item.toFixed(0)}</span>;
                    },
                },
                {
                    title: "Phép 5",
                    dataIndex: "phep_5",
                    key: "phep_5",
                    width: 100,
                    align: "left",
                    render: (item: number) => {
                        return <span>{item && item.toFixed(0)}</span>;
                    },
                },
                {
                    title: "Phép 6",
                    dataIndex: "phep_6",
                    key: "phep_6",
                    width: 100,
                    align: "left",
                    render: (item: number) => {
                        return <span>{item && item.toFixed(0)}</span>;
                    },
                },
                {
                    title: "Phép 7",
                    dataIndex: "phep_7",
                    key: "phep_7",
                    width: 100,
                    align: "left",
                    render: (item: number) => {
                        return <span>{item && item.toFixed(0)}</span>;
                    },
                },
                {
                    title: "Phép 8",
                    dataIndex: "phep_8",
                    key: "phep_8",
                    width: 100,
                    align: "left",
                    render: (item: number) => {
                        return <span>{item && item.toFixed(0)}</span>;
                    },
                },
                {
                    title: "Phép 9",
                    dataIndex: "phep_9",
                    key: "phep_9",
                    width: 100,
                    align: "left",
                    render: (item: number) => {
                        return <span>{item && item.toFixed(0)}</span>;
                    },
                },
                {
                    title: "Phép 10",
                    dataIndex: "phep_10",
                    key: "phep_10",
                    width: 100,
                    align: "left",
                    render: (item: number) => {
                        return <span>{item && item.toFixed(0)}</span>;
                    },
                },
                {
                    title: "Phép 11",
                    dataIndex: "phep_11",
                    key: "phep_11",
                    width: 100,
                    align: "left",
                    render: (item: number) => {
                        return <span>{item && item.toFixed(0)}</span>;
                    },
                },
                {
                    title: "Phép 12",
                    dataIndex: "phep_12",
                    key: "phep_12",
                    width: 100,
                    align: "left",
                    render: (item: number) => {
                        return <span>{item && item.toFixed(0)}</span>;
                    },
                },

            ]
        },
        {
            title: "Phép năm còn lại(phút)",
            dataIndex: "phep_nam_con_lai",
            key: "phep_nam_con_lai",
            width: 180,
            align: "left",
            render: (item: number) => {
                return <span>{item && item.toFixed(0)}</span>;
            },
        }
    ]
    return (
        <>
            <Spin
                spinning={isLoading}
                className="app-loading-wrapper"
                tip={<LocaleFormatter id="gloabal.tips.loading" />}></Spin>
            <MyPage
                pageApi={_getLeaveManagementByArgs}
                title={generatePageTitle()}
                searchRender={<SearchLeaveManagement onChangeDate={handleDateChange} />}
                tableOptions={tableColums}
                forceUpdate={foceUpdate}
                slot={
                    <>
                        <Button type="primary" onClick={handleClick}>Cấp phát</Button>
                    </>
                }
            />
        </>
    )
}

export default leaveManagement;