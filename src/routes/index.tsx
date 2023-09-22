import { FC, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Navigate, RouteObject } from 'react-router';

import LoginPage from '@/pages/login';
import LayoutPage from '@/pages/layout';
import EmployeeList from '@/pages/employee-list/list';
import WeeklyReport from '@/pages/weekly-report';
import MonthlyReport from '@/pages/monthly-report';
import TimeKeepingList from '@/pages/timekeeping-list/list';
import ShiftsList from '@/pages/shifts-list/list';
import ExplanationRequest from '@/pages/explanation-request/list';
import WrapperRouteComponent from './config';
import ExportExcel from '@/pages/export-excel';
import ApplicationList from '@/pages/application-list/list';
import LeaveManagement from '@/pages/leave-management/list';
import EmployeeByLeave from '@/pages/employeeByLeaveList/list';
import ContractList from '@/pages/contract-list/list';
import DepartmentList from '@/pages/department-list/list';
import { IdcardOutlined } from '@ant-design/icons';

const NotFound = lazy(
  () => import(/* webpackChunkName: "404'"*/ '@/pages/404')
);

const Guide = lazy(
  () => import(/* webpackChunkName: "guide'"*/ '@/pages/guide')
);
// const RoutePermission = lazy(
//   () =>
//     import(/* webpackChunkName: "route-permission"*/ '@/pages/permission/route')
// );
const FormPage = lazy(
  () => import(/* webpackChunkName: "form'"*/ '@/pages/components/form')
);
const TablePage = lazy(
  () => import(/* webpackChunkName: "table'"*/ '@/pages/components/table')
);
const TabsPage = lazy(
  () => import(/* webpackChunkName: "tabs'"*/ '@/pages/components/tabs')
);
const AsidePage = lazy(
  () => import(/* webpackChunkName: "aside'"*/ '@/pages/components/aside')
);
const RadioCardsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "radio-cards'"*/ '@/pages/components/radio-cards'
    )
);
const BusinessBasicPage = lazy(
  () => import(/* webpackChunkName: "basic-page" */ '@/pages/business/basic')
);
const BusinessWithSearchPage = lazy(
  () =>
    import(/* webpackChunkName: "with-search" */ '@/pages/business/with-search')
);
const BusinessWithAsidePage = lazy(
  () =>
    import(/* webpackChunkName: "with-aside" */ '@/pages/business/with-aside')
);
const BusinessWithRadioCardsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "with-aside" */ '@/pages/business/with-radio-cards'
    )
);
const BusinessWithTabsPage = lazy(
  () => import(/* webpackChunkName: "with-tabs" */ '@/pages/business/with-tabs')
);

const routeList: RouteObject[] = [
  {
    path: '/login',
    element: (
      <WrapperRouteComponent element={<LoginPage />} titleId="title.login" />
    ),
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" auth />,
    children: [
      {
        path: '',
        element: <Navigate to="weeklyreport" />,
      },
      {
        path: 'leavemanagement',
        element: (
          <WrapperRouteComponent
            element={<LeaveManagement />}
            titleId="title.leavemanagement"
          />
        ),
      },
      {
        path: "employeebyleave",
        element: (
          <WrapperRouteComponent
            element={<EmployeeByLeave />}
            titleId="title.employeebyleave"
          />
        ),

      },
      {
        path: 'contract',
        element: (
          <WrapperRouteComponent
            element={<ContractList />}
            titleId="title.contract"
          />
        )
      },
      {
        path: 'employeelist',
        element: (
          <WrapperRouteComponent
            element={<EmployeeList />}
            titleId="title.employeelist"
          />
        ),
      },
      {
        path: 'departmentlist',
        element: (
          <WrapperRouteComponent 
            element={<DepartmentList />}
            titleId="title.department"
          />
        )
      },
      {
        path: 'weeklyreport',
        element: (
          <WrapperRouteComponent
            element={<WeeklyReport />}
            titleId="title.weeklyreport"
          />
        ),
      },
      {
        path: 'monthlyreport',
        element: (
          <WrapperRouteComponent
            element={<MonthlyReport />}
            titleId="title.monthlyreport"
          />
        ),
      },
      {
        path: 'shiftslist',
        element: (
          <WrapperRouteComponent
            element={<ShiftsList />}
            titleId="title.shiftslist"
          />
        ),
      },
      {
        path: 'timekeepinglist',
        element: (
          <WrapperRouteComponent
            element={<TimeKeepingList />}
            titleId="title.timekeepinglist"
          />
        ),
      },
      {
        path: 'explanationrequest',
        element: (
          <WrapperRouteComponent
            element={<ExplanationRequest />}
            titleId="title.explanationrequest"
          />
        ),
      },
      {
        path: 'exportexcel',
        element: (
          <WrapperRouteComponent
            element={<ExportExcel />}
            titleId="title.exportexcel"
          />
        ),
      },
      {
        path: 'applicationlist',
        element: (
          <WrapperRouteComponent
            element={<ApplicationList />}
            titleId="title.applicationlist"
          />
        ),
      },
      {
        path: 'guide',
        element: (
          <WrapperRouteComponent element={<Guide />} titleId="title.guide" />
        ),
      },
      {
        path: 'component/form',
        element: (
          <WrapperRouteComponent
            element={<FormPage />}
            titleId="title.account"
          />
        ),
      },
      {
        path: 'component/table',
        element: (
          <WrapperRouteComponent
            element={<TablePage />}
            titleId="title.account"
          />
        ),
      },

      {
        path: 'component/tabs',
        element: (
          <WrapperRouteComponent
            element={<TabsPage />}
            titleId="title.account"
          />
        ),
      },
      {
        path: 'component/aside',
        element: (
          <WrapperRouteComponent
            element={<AsidePage />}
            titleId="title.account"
          />
        ),
      },
      {
        path: 'component/radio-cards',
        element: (
          <WrapperRouteComponent
            element={<RadioCardsPage />}
            titleId="title.account"
          />
        ),
      },
      {
        path: 'business/basic',
        element: (
          <WrapperRouteComponent
            element={<BusinessBasicPage />}
            titleId="title.account"
          />
        ),
      },
      {
        path: 'business/with-search',
        element: (
          <WrapperRouteComponent
            element={<BusinessWithSearchPage />}
            titleId="title.account"
          />
        ),
      },
      {
        path: 'business/with-aside',
        element: (
          <WrapperRouteComponent
            element={<BusinessWithAsidePage />}
            titleId="title.account"
          />
        ),
      },
      {
        path: 'business/with-radio-cards',
        element: (
          <WrapperRouteComponent
            element={<BusinessWithRadioCardsPage />}
            titleId="title.account"
          />
        ),
      },
      {
        path: 'business/with-tabs',
        element: (
          <WrapperRouteComponent
            element={<BusinessWithTabsPage />}
            titleId="title.account"
          />
        ),
      },
      {
        path: '*',
        element: (
          <WrapperRouteComponent
            element={<NotFound />}
            titleId="title.notFount"
          />
        ),
      },
    ],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
