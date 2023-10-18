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
          zh_CN: 'Tạo chiến dịch',
          en_US: 'Tạo chiến dịch',
          vi_VN: 'Tạo chiến dịch',
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
      {
        code: 'post-seeding',
        label: {
          zh_CN: 'Posts seeding',
          en_US: 'Posts seeding',
          vi_VN: 'Posts seeding',
        },
        icon: 'system',
        path: '/posts-seeding',
      },
      {
        code: 'schedule',
        label: {
          zh_CN: 'Schedule',
          en_US: 'Schedule',
          vi_VN: 'Schedule',
        },
        icon: 'schedule',
        path: '/schedule',
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
    icon: 'content',
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
        path: '/users',
      },
      {
        code: 'post',
        label: {
          zh_CN: 'Danh sách post',
          en_US: 'Danh sách post',
          vi_VN: 'Danh sách post',
        },
        icon: 'system',
        path: '/posts',
      },
      {
        code: 'comments',
        label: {
          zh_CN: 'Danh sách comments',
          en_US: 'Danh sách comments',
          vi_VN: 'Danh sách comments',
        },
        icon: 'system',
        path: '/comments',
      },
      {
        code: 'rooms',
        label: {
          zh_CN: 'Danh sách nhóm',
          en_US: 'Danh sách nhóm',
          vi_VN: 'Danh sách nhóm',
        },
        icon: 'system',
        path: '/rooms',
      },
    ],
  },
  {
    code: 'report',
    label: {
      vi_VN: 'Báo cáo, phân tích',
      en_US: 'Báo cáo, phân tích',
      zh_CN: 'Báo cáo, phân tích',
    },
    icon: 'report',
    path: '',
    children: [
      {
        code: 'stockCode',
        label: {
          zh_CN: 'Mã cổ phiếu',
          en_US: 'Mã cổ phiếu',
          vi_VN: 'Mã cổ phiếu',
        },
        icon: 'system',
        path: '/stockcode',
      },
    ],
  },
];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
