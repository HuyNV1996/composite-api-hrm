import { FC, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Navigate, RouteObject } from 'react-router';

import Dashboard from '@/pages/dashboard';
import LoginPage from '@/pages/login';
import LayoutPage from '@/pages/layout';

import UserListPage_FA from '@/pages/fireant/users/list';
import PostsListPage_FA from '@/pages/fireant/posts/list';
import RoomsListPage_FA from '@/pages/fireant/rooms/list';
import CommentsListPage_FA from '@/pages/fireant/comments/list';

import UserListPage_FB from '@/pages/facebook/users/list';
import PostsListPage_FB from '@/pages/facebook/posts/list';
import CommentsListPage_FB from '@/pages/facebook/comments/list';

import UserListPage_TW from '@/pages/twitter/users/list';
import PostsListPage_TW from '@/pages/twitter/posts/list';
import CommentsListPage_TW from '@/pages/twitter/comments/list';

import Register from '@/pages/register';
import UserSeeding from '@/pages/common/users_seeding/list'
import WrapperRouteComponent from './config';
import CampaignPage_CM from '@/pages/common/campaign/list'
import CampaignCreate_CM from '@/pages/common/campaign/handle/create'

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
        element: <Navigate to="users_fa" />,
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
        path: 'users_fa',
        element: (
          <WrapperRouteComponent
            element={<UserListPage_FA />}
            titleId="title.users"
          />
        ),
      },
      {
        path: 'users_fb',
        element: (
          <WrapperRouteComponent
            element={<UserListPage_FB />}
            titleId="title.users"
          />
        ),
      },
      {
        path: 'users_tw',
        element: (
          <WrapperRouteComponent
            element={<UserListPage_TW />}
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
        path: 'posts_fa',
        element: (
          <WrapperRouteComponent
            element={<PostsListPage_FA />}
            titleId="title.posts"
          />
        ),
      },
      {
        path: 'posts_fb',
        element: (
          <WrapperRouteComponent
            element={<PostsListPage_FB />}
            titleId="title.posts"
          />
        ),
      },
      {
        path: 'posts_tw',
        element: (
          <WrapperRouteComponent
            element={<PostsListPage_TW />}
            titleId="title.posts"
          />
        ),
      },
      {
        path: 'rooms_fa',
        element: (
          <WrapperRouteComponent
            element={<RoomsListPage_FA />}
            titleId="title.rooms"
          />
        ),
      },
      {
        path: 'comments_fa',
        element: (
          <WrapperRouteComponent
            element={<CommentsListPage_FA />}
            titleId="title.comments"
          />
        ),
      },
      {
        path: 'comments_fb',
        element: (
          <WrapperRouteComponent
            element={<CommentsListPage_FB />}
            titleId="title.comments"
          />
        ),
      },
      {
        path: 'comments_tw',
        element: (
          <WrapperRouteComponent
            element={<CommentsListPage_TW />}
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
