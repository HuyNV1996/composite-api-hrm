import { MenuList } from '@/interface/layout/menu.interface';
import { mock, intercepter } from '../config';

const mockMenuList: MenuList = [
  {
    code: 'common',
    label: {
      vi_VN: 'Chung',
      en_US: 'Chung',
      zh_CN: 'Chung',
    },
    icon: 'system',
    path: '',
    children: [
      {
        code: 'campaign',
        label: {
          zh_CN: 'Chiến dịch tin nhắn',
          en_US: 'Chiến dịch tin nhắn',
          vi_VN: 'Chiến dịch tin nhắn',
        },
        icon: 'system',
        path: '/campaign',
      },
      {
        code: 'user-seeding',
        label: {
          zh_CN: 'Users seeding',
          en_US: 'Users seeding',
          vi_VN: 'Users seeding',
        },
        icon: 'system',
        path: '/users-seeding',
      },
    ],
  },
  {
    code: 'FireAnt',
    label: {
      vi_VN: 'FireAnt.vn',
      en_US: 'FireAnt.vn',
      zh_CN: 'FireAnt.vn',
    },
    icon: 'fireant',
    path: '',
    children: [
      {
        code: 'user',
        label: {
          zh_CN: 'Danh sách users',
          en_US: 'Danh sách users',
          vi_VN: 'Danh sách users',
        },
        icon: 'system',
        path: '/users_fa',
      },
      {
        code: 'post',
        label: {
          zh_CN: 'Danh sách post',
          en_US: 'Danh sách post',
          vi_VN: 'Danh sách post',
        },
        icon: 'system',
        path: '/posts_fa',
      },
      {
        code: 'comments',
        label: {
          zh_CN: 'Danh sách comments',
          en_US: 'Danh sách comments',
          vi_VN: 'Danh sách comments',
        },
        icon: 'system',
        path: '/comments_fa',
      },
      {
        code: 'rooms_fa',
        label: {
          zh_CN: 'Danh sách nhóm',
          en_US: 'Danh sách nhóm',
          vi_VN: 'Danh sách nhóm',
        },
        icon: 'system',
        path: '/rooms_fa',
      },
    ],
  },
  {
    code: 'Facebook',
    label: {
      vi_VN: 'Facebook',
      en_US: 'Facebook',
      zh_CN: 'Facebook',
    },
    icon: 'facebook',
    path: '',
    children: [
      {
        code: 'user_fb',
        label: {
          zh_CN: 'Danh sách users',
          en_US: 'Danh sách users',
          vi_VN: 'Danh sách users',
        },
        icon: 'system',
        path: '/users_fb',
      },
      {
        code: 'posts_fb',
        label: {
          zh_CN: 'Danh sách post',
          en_US: 'Danh sách post',
          vi_VN: 'Danh sách post',
        },
        icon: 'system',
        path: '/posts_fb',
      },
      {
        code: 'comments_fb',
        label: {
          zh_CN: 'Danh sách comments',
          en_US: 'Danh sách comments',
          vi_VN: 'Danh sách comments',
        },
        icon: 'system',
        path: '/comments_fb',
      },
    ],
  },
  {
    code: 'Twitter',
    label: {
      vi_VN: 'Twitter',
      en_US: 'Twitter',
      zh_CN: 'Twitter',
    },
    icon: 'twitter',
    path: '',
    children: [
      {
        code: 'user_tw',
        label: {
          zh_CN: 'Danh sách users',
          en_US: 'Danh sách users',
          vi_VN: 'Danh sách users',
        },
        icon: 'system',
        path: '/users_tw',
      },
      {
        code: 'posts_tw',
        label: {
          zh_CN: 'Danh sách post',
          en_US: 'Danh sách post',
          vi_VN: 'Danh sách post',
        },
        icon: 'system',
        path: '/posts_tw',
      },
      {
        code: 'comments_tw',
        label: {
          zh_CN: 'Danh sách comments',
          en_US: 'Danh sách comments',
          vi_VN: 'Danh sách comments',
        },
        icon: 'system',
        path: '/comments_tw',
      },
    ],
  },
];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
