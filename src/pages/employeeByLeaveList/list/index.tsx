import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { useState } from 'react';
import { setGlobalState } from '@/stores/global.store';
import { FC } from 'react';
import store from '@/stores';
import { IEmployeeByLeaveArgs, getEmployeeByLeave } from '@/api/employee/employeeByLeave.api';
import { IEmployeeByLeave } from '@/interface/leaveManagement';
import { formatDate } from '@/utils/formatDate';
import SearchEmployeeByLeave from '../components/search';


const EmployeeByLeave: FC = () => {
    const _getEmployeeByLeaveByArgs = async (params: IEmployeeByLeaveArgs) => {
        store.dispatch(setGlobalState({ loading: true }));
        const res = await getEmployeeByLeave(params);
        if (res) {
            store.dispatch(setGlobalState({ loading: false }));
            return res;
        }
    }
    const tableColumns: MyPageTableOptions<IEmployeeByLeave> = [
        {
            title: '#',
            dataIndex: 'no',
            key: 'id',
            width: 60,
            align: 'left',
        },

        {
            title: 'Mã nhân viên',
            dataIndex: 'code',
            key: 'code',
            width: 120,
            align: 'left',
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'name',
            key: 'name',
            width: 150,
            align: 'left',
        },
        {
            title: 'Phòng ban',
            dataIndex: 'department_name',
            key: 'department_name',
            width: 150,
            align: 'left',
        },
        {
            title: 'Vị trí',
            dataIndex: 'position',
            key: 'position',
            width: 150,
            align: 'left',
        },
        {
            title: 'Ngày vào làm',
            dataIndex: 'workingday',
            key: 'workingday',
            width: 150,
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
            title: 'Ngày thôi việc',
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
        {
            title: "Tháng 1",
            width: 100,
            align: 'center',
            children: [
                {
                    title: "Phát sinh tăng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_bu_tv_1',
                            key: 'tang_bu_tv_1',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_bu_ct_1',
                            key: 'tang_bu_ct_1',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Sử dụng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'su_dung_tv_1',
                            key: 'su_dung_tv_1',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'su_dung_ct_1',
                            key: 'su_dung_ct_1',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Tăng ca",
                    width: 100,
                    align: "center",
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_ca_tv_1',
                            key: 'tang_ca_tv_1',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_ca_ct_1',
                            key: 'tang_ca_ct_1',
                            width: 100,
                            align: 'center',
                        },

                    ]
                }
            ]
        },
        {
            title: "Tháng 2",
            width: 100,
            align: 'center',
            children: [
                {
                    title: "Phát sinh tăng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_bu_tv_2',
                            key: 'tang_bu_tv_2',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_bu_ct_2',
                            key: 'tang_bu_ct_2',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Sử dụng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'su_dung_tv_2',
                            key: 'su_dung_tv_2',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'su_dung_ct_2',
                            key: 'su_dung_ct_2',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Tăng ca",
                    width: 100,
                    align: "center",
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_ca_tv_2',
                            key: 'tang_ca_tv_2',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_ca_ct_2',
                            key: 'tang_ca_ct_2',
                            width: 100,
                            align: 'center',
                        },

                    ]
                }
            ]
        },
        {
            title: "Tháng 3",
            width: 100,
            align: 'center',
            children: [
                {
                    title: "Phát sinh tăng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_bu_tv_3',
                            key: 'tang_bu_tv_3',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_bu_ct_3',
                            key: 'tang_bu_ct_3',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Sử dụng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'su_dung_tv_3',
                            key: 'su_dung_tv_3',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'su_dung_ct_3',
                            key: 'su_dung_ct_3',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Tăng ca",
                    width: 100,
                    align: "center",
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_ca_tv_3',
                            key: 'tang_ca_tv_3',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_ca_ct_3',
                            key: 'tang_ca_ct_3',
                            width: 100,
                            align: 'center',
                        },

                    ]
                }
            ]
        },
        {
            title: "Tháng 4",
            width: 100,
            align: 'center',
            children: [
                {
                    title: "Phát sinh tăng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_bu_tv_4',
                            key: 'tang_bu_tv_4',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_bu_ct_4',
                            key: 'tang_bu_ct_4',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Sử dụng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'su_dung_tv_4',
                            key: 'su_dung_tv_4',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'su_dung_ct_4',
                            key: 'su_dung_ct_4',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Tăng ca",
                    width: 100,
                    align: "center",
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_ca_tv_4',
                            key: 'tang_ca_tv_4',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_ca_ct_4',
                            key: 'tang_ca_ct_4',
                            width: 100,
                            align: 'center',
                        },

                    ]
                }
            ]
        },
        {
            title: "Tháng 5",
            width: 100,
            align: 'center',
            children: [
                {
                    title: "Phát sinh tăng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_bu_tv_5',
                            key: 'tang_bu_tv_5',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_bu_ct_5',
                            key: 'tang_bu_ct_5',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Sử dụng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'su_dung_tv_5',
                            key: 'su_dung_tv_5',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'su_dung_ct_5',
                            key: 'su_dung_ct_5',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Tăng ca",
                    width: 100,
                    align: "center",
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_ca_tv_5',
                            key: 'tang_ca_tv_5',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_ca_ct_5',
                            key: 'tang_ca_ct_5',
                            width: 100,
                            align: 'center',
                        },

                    ]
                }
            ]
        },
        {
            title: "Tháng 6",
            width: 100,
            align: 'center',
            children: [
                {
                    title: "Phát sinh tăng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_bu_tv_6',
                            key: 'tang_bu_tv_6',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_bu_ct_6',
                            key: 'tang_bu_ct_6',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Sử dụng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'su_dung_tv_6',
                            key: 'su_dung_tv_6',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'su_dung_ct_6',
                            key: 'su_dung_ct_6',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Tăng ca",
                    width: 100,
                    align: "center",
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_ca_tv_6',
                            key: 'tang_ca_tv_6',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_ca_ct_6',
                            key: 'tang_ca_ct_6',
                            width: 100,
                            align: 'center',
                        },

                    ]
                }
            ]
        },
        {
            title: "Tháng 7",
            width: 100,
            align: 'center',
            children: [
                {
                    title: "Phát sinh tăng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_bu_tv_7',
                            key: 'tang_bu_tv_7',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_bu_ct_7',
                            key: 'tang_bu_ct_7',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Sử dụng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'su_dung_tv_7',
                            key: 'su_dung_tv_7',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'su_dung_ct_7',
                            key: 'su_dung_ct_7',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Tăng ca",
                    width: 100,
                    align: "center",
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_ca_tv_7',
                            key: 'tang_ca_tv_7',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_ca_ct_7',
                            key: 'tang_ca_ct_7',
                            width: 100,
                            align: 'center',
                        },

                    ]
                }
            ]
        },
        {
            title: "Tháng 8",
            width: 100,
            align: 'center',
            children: [
                {
                    title: "Phát sinh tăng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_bu_tv_8',
                            key: 'tang_bu_tv_8',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_bu_ct_8',
                            key: 'tang_bu_ct_8',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Sử dụng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'su_dung_tv_8',
                            key: 'su_dung_tv_8',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'su_dung_ct_8',
                            key: 'su_dung_ct_8',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Tăng ca",
                    width: 100,
                    align: "center",
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_ca_tv_8',
                            key: 'tang_ca_tv_8',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_ca_ct_8',
                            key: 'tang_ca_ct_8',
                            width: 100,
                            align: 'center',
                        },

                    ]
                }
            ]
        },
        {
            title: "Tháng 9",
            width: 100,
            align: 'center',
            children: [
                {
                    title: "Phát sinh tăng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_bu_tv_9',
                            key: 'tang_bu_tv_9',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_bu_ct_9',
                            key: 'tang_bu_ct_9',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Sử dụng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'su_dung_tv_9',
                            key: 'su_dung_tv_9',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'su_dung_ct_9',
                            key: 'su_dung_ct_9',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Tăng ca",
                    width: 100,
                    align: "center",
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_ca_tv_9',
                            key: 'tang_ca_tv_9',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_ca_ct_9',
                            key: 'tang_ca_ct_9',
                            width: 100,
                            align: 'center',
                        },

                    ]
                }
            ]
        },
        {
            title: "Tháng 10",
            width: 100,
            align: 'center',
            children: [
                {
                    title: "Phát sinh tăng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_bu_tv_10',
                            key: 'tang_bu_tv_10',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_bu_ct_10',
                            key: 'tang_bu_ct_10',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Sử dụng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'su_dung_tv_10',
                            key: 'su_dung_tv_10',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'su_dung_ct_10',
                            key: 'su_dung_ct_10',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Tăng ca",
                    width: 100,
                    align: "center",
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_ca_tv_10',
                            key: 'tang_ca_tv_10',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_ca_ct_10',
                            key: 'tang_ca_ct_10',
                            width: 100,
                            align: 'center',
                        },

                    ]
                }
            ]
        },
        {
            title: "Tháng 11",
            width: 100,
            align: 'center',
            children: [
                {
                    title: "Phát sinh tăng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_bu_tv_11',
                            key: 'tang_bu_tv_11',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_bu_ct_11',
                            key: 'tang_bu_ct_11',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Sử dụng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'su_dung_tv_11',
                            key: 'su_dung_tv_11',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'su_dung_ct_11',
                            key: 'su_dung_ct_11',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Tăng ca",
                    width: 100,
                    align: "center",
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_ca_tv_11',
                            key: 'tang_ca_tv_11',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_ca_ct_11',
                            key: 'tang_ca_ct_11',
                            width: 100,
                            align: 'center',
                        },

                    ]
                }
            ]
        },
        {
            title: "Tháng 12",
            width: 100,
            align: 'center',
            children: [
                {
                    title: "Phát sinh tăng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_bu_tv_12',
                            key: 'tang_bu_tv_12',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_bu_ct_12',
                            key: 'tang_bu_ct_12',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Sử dụng",
                    width: 100,
                    align: 'center',
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'su_dung_tv_12',
                            key: 'su_dung_tv_12',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'su_dung_ct_12',
                            key: 'su_dung_ct_12',
                            width: 100,
                            align: 'center',
                        },
                    ]
                },
                {
                    title: "Tăng ca",
                    width: 100,
                    align: "center",
                    children: [
                        {
                            title: 'Thử việc',
                            dataIndex: 'tang_ca_tv_12',
                            key: 'tang_ca_tv_12',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: 'Chính thức',
                            dataIndex: 'tang_ca_ct_12',
                            key: 'tang_ca_ct_12',
                            width: 100,
                            align: 'center',
                        },

                    ]
                }
            ]
        },
        

    ]
    return (
        <>
            <MyPage
                pageApi={_getEmployeeByLeaveByArgs}
                title={'Quản lý bù'}
                searchRender={<SearchEmployeeByLeave />}
                tableOptions={tableColumns}
            />
        </>
    )
}

export default EmployeeByLeave
