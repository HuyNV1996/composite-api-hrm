import { Notice } from '@/interface/layout/notice.interface';
import { intercepter, mock } from '../config';

const mockNoticeList: Notice<'all'>[] = [
  {
    id: '000000001',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: 'Thông báo',
    datetime: '2017-08-09',
    type: 'notification',
  },
  {
    id: '000000002',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
    title: 'Thông báo',
    datetime: '2017-08-08',
    type: 'notification',
  },
  {
    id: '000000003',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
    title: 'Thông báo',
    datetime: '2017-08-07',
    read: true,
    type: 'notification',
  },
  {
    id: '000000004',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
    title: 'Thông báo',
    datetime: '2017-08-07',
    type: 'notification',
  },
  {
    id: '000000005',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: 'Thông báo',
    datetime: '2017-08-07',
    type: 'notification',
  },
  {
    id: '000000006',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: 'Thông báo',
    description: 'Description',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true,
  },
  {
    id: '000000007',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: 'Thông báo',
    description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    datetime: '2017-08-07',
    type: 'message',
    clickClose: true,
  },
  {
    id: '000000009',
    title: 'Thông báo',
    description: 'Thông báo',
    extra: 'Thông báo',
    status: 'todo',
    type: 'event',
  },

  {
    id: '000000019',
    title: 'Thông báo',
    description: 'Thông báo',
    extra: 'Thông báo',
    status: 'todo',
    type: 'event',
  },

  {
    id: '000000029',
    title: 'Thông báo',
    description: 'Thông báo',
    extra: 'Thông báo',
    status: 'todo',
    type: 'event',
  },

  {
    id: '000000039',
    title: 'Thông báo',
    description: 'Thông báo',
    extra: 'Thông báo',
    status: 'todo',
    type: 'event',
  },
];

mock.mock('/user/notice', 'get', intercepter(mockNoticeList));
