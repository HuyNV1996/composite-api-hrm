import { MenuList } from '@/interface/layout/menu.interface';
import { mock, intercepter } from '../config';
const mockMenuList: MenuList = [
  // {
  //   code: 'weeklyyreport',
  //   label: {
  //     en_US: 'Báo cáo theo tuần',
  //     vi_VN: 'Báo cáo theo tuần',
  //   },
  //   icon: 'weeklyreport',
  //   path: '/weeklyreport',
  // },
  // {
  //   code: 'monthlyreport',
  //   label: {
  //     en_US: 'Báo cáo theo tháng',
  //     vi_VN: 'Báo cáo theo tháng',
  //   },
  //   icon: 'monthlyreport',
  //   path: '/monthlyreport',
  // },
  {
    code: 'shiftslist',
    label: {
      en_US: 'Danh sách phòng',
      vi_VN: 'Danh sách phòng',
    },
    icon: 'shift',
    path: '/shiftslist',
  },
  {
    code: 'departmentlist',
    label: {
      en_US: 'Danh sách bài viết',
      vi_VN: 'Danh sách bài viết',
    },
    icon: 'department',
    path: '/departmentlist',
  },
  {
    code: 'employeelist',
    label: {
      en_US: 'Danh sách nhân viên',
      vi_VN: 'Danh sách nhân viên',
    },
    icon: 'employee',
    path: '/employeelist',
  },
  {
    code: 'contract',
    label: {
      en_US: 'Danh sách người dùng',
      vi_VN: 'Danh sách người dùng',
    },
    icon: 'contract',
    path: '/contract',
  },
  // {
  //   code: 'timekeepinglist',
  //   label: {
  //     en_US: 'Danh sách chấm công',
  //     vi_VN: 'Danh sách chấm công',
  //   },
  //   icon: 'timekeeping',
  //   path: '/timekeepinglist',
  // },
  // {
  //   code: 'explanationrequest',
  //   label: {
  //     en_US: 'Yêu cầu giải trình',
  //     vi_VN: 'Yêu cầu giải trình',
  //   },
  //   icon: 'explanationrequest',
  //   path: '/explanationrequest',
  // },
  // {
  //   code: 'applicationlist',
  //   label: {
  //     en_US: 'Quản lý đơn yêu cầu',
  //     vi_VN: 'Quản lý đơn yêu cầu',
  //   },
  //   icon: 'applicationlist',
  //   path: '/applicationlist',
  // },
  // {
  //   code: 'leave',
  //   label: {
  //     en_US: 'Quản lý phép',
  //     vi_VN: 'Quản lý phép',
  //   },
  //   icon: 'leavemanagement',
  //   path: '/leavemanagement',
  // },
  // {
  //   code: 'employeebyleavelist',
  //   label: {
  //     en_US: 'Leave Managent',
  //     vi_VN: 'Quản lý bù',
  //   },
  //   icon: 'employeebyleave',
  //   path: '/employeebyleave',
  // },
  // {
  //   code: 'exportexcel',
  //   label: {
  //     en_US: 'Xuất file báo cáo',
  //     vi_VN: 'Xuất file báo cáo',
  //   },
  //   icon: 'export',
  //   path: '/exportexcel',
  // },
];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
