import { FC, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Navigate, RouteObject } from 'react-router';

import Dashboard from '@/pages/dashboard';
import LoginPage from '@/pages/login';
import LayoutPage from '@/pages/layout';

import Register from '@/pages/register';
import UserSeeding from '@/pages/common/users_seeding/list';
import PostSeeding from '@/pages/common/posts_seeding/list';
import WrapperRouteComponent from './config';
import CampaignPage_CM from '@/pages/common/campaign/list';
import CampaignCreate_CM from '@/pages/common/campaign/handle/page_create';
import PostCreate_CM from '@/pages/common/posts_seeding/handle/page_create';

import ListRooms from '@/pages/content/rooms/list';
import ListUsers from '@/pages/content/users/list';
import ListPosts from '@/pages/content/posts/list';
import ListComments from '@/pages/content/comments/list';
import PostViewPage from '@/pages/content/posts/components/page_view';
import CommentViewPage from '@/pages/content/comments/components/crerate';
import PostSendPage from '@/pages/content/posts/components/create_send';
import PageView from '@/pages/common/posts_seeding/handle/page_view';
import SchedulePage from '@/pages/common/schedule/list'
import StockCode from '@/pages/report/stock_code/list';
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

export const routeList: RouteObject[] = [
  {
    path: '/login',
    element: (
      <WrapperRouteComponent element={<LoginPage />} titleId="title.login" />
    ),
  },
  {
    path: '/register',
    element: (
      <WrapperRouteComponent element={<Register />} titleId="title.register" />
    ),
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" auth />,
    children: [
      {
        path: '',
        element: <Navigate to="users" />,
      },
      {
        path: 'dashboard',
        element: (
          <WrapperRouteComponent
            element={<Dashboard />}
            titleId="title.dashboard"
          />
        ),
      },
      {
        path: 'users',
        element: (
          <WrapperRouteComponent
            element={<ListUsers />}
            titleId="title.users"
          />
        ),
      },
      {
        path: 'users-seeding',
        element: (
          <WrapperRouteComponent
            element={<UserSeeding />}
            titleId="title.users-seeding"
          />
        ),
      },
      {
        path: 'posts-seeding',
        element: (
          <WrapperRouteComponent
            element={<PostSeeding />}
            titleId="title.seeding-posts"
          />
        ),
      },
      {
        path: 'post/seeding/create',
        element: (
          <WrapperRouteComponent
            element={<PostCreate_CM />}
            titleId="title.posts"
          />
        ),
      },
      {
        path: 'post/seeding/update/:id',
        element: (
          <WrapperRouteComponent
            element={<PostCreate_CM />}
            titleId="title.campaign"
          />
        ),
      },
      {
        path: '/post/seeding/detail/:id',
        element: (
          <WrapperRouteComponent element={<PageView />} titleId="title.posts" />
        ),
      },
      {
        path: 'posts',
        element: (
          <WrapperRouteComponent
            element={<ListPosts />}
            titleId="title.posts"
          />
        ),
      },
      {
        path: '/posts/view/:id',
        element: (
          <WrapperRouteComponent
            element={<PostViewPage />}
            titleId="title.posts"
          />
        ),
      },
      {
        path: 'stockcode',
        element: (
          <WrapperRouteComponent
            element={<StockCode />}
            titleId="title.stockCode"
          />
        ),
      },
      {
        path: '/comments/view/:id',
        element: (
          <WrapperRouteComponent
            element={<CommentViewPage />}
            titleId="title.comments"
          />
        ),
      },
      {
        path: 'rooms',
        element: (
          <WrapperRouteComponent
            element={<ListRooms />}
            titleId="title.rooms"
          />
        ),
      },
      {
        path: 'schedule',
        element: (
          <WrapperRouteComponent
            element={<SchedulePage />}
            titleId="title.schedule"
          />
        ),
      },
      {
        path: 'comments',
        element: (
          <WrapperRouteComponent
            element={<ListComments />}
            titleId="title.comments"
          />
        ),
      },
      {
        path: 'campaign',
        element: (
          <WrapperRouteComponent
            element={<CampaignPage_CM />}
            titleId="title.campaign"
          />
        ),
      },
      {
        path: 'campaign/create',
        element: (
          <WrapperRouteComponent
            element={<CampaignCreate_CM />}
            titleId="title.campaign"
          />
        ),
      },
      {
        path: '/campaign/update/:id',
        element: (
          <WrapperRouteComponent
            element={<CampaignCreate_CM />}
            titleId="title.campaign"
          />
        ),
      },
      {
        path: '/posts/send/:id',
        element: (
          <WrapperRouteComponent
            element={<PostSendPage />}
            titleId="title.posts"
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
