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
    code: 'Content',
    label: {
      vi_VN: 'Nội dung',
      en_US: 'Nội dung',
      zh_CN: 'Nội dung',
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
];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
