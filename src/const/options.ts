import {
  TRANG_THAI_KET_NOI,
  LOAI_KHU_VUC,
  LOAI_MAN_HINH,
  LOAI_TRANG_THAI,
  SOCIAL,
} from './consts';

export const ruleOperator = [
  {
    label: '>',
    value: '>',
  },
  {
    label: '<',
    value: '<',
  },
  {
    label: '=',
    value: '=',
  },
];

export const ruleName = [
  {
    label: 'totalLikes',
    value: 'totalLikes',
  },
  {
    label: 'totalPosts',
    value: 'totalPosts',
  },
  {
    label: 'following',
    value: 'following',
  },
  {
    label: 'followers',
    value: 'followers',
  },
];
export const loaiCuaHangOptions = [
  {
    label: 'Offline',
    value: TRANG_THAI_KET_NOI.OFFLINE,
  },
  {
    label: 'Online',
    value: TRANG_THAI_KET_NOI.ONLINE,
  },
];

export const statusOptions = [
  {
    label: 'Đang mở',
    value: LOAI_TRANG_THAI.ACTIVE,
  },
  {
    label: 'Đã khóa',
    value: LOAI_TRANG_THAI.INACTIVE,
  },
];

export const loaiKhuVucOptions = [
  {
    label: 'Miền Bắc',
    value: LOAI_KHU_VUC.MIEN_BAC,
  },
  {
    label: 'Miền Trung',
    value: LOAI_KHU_VUC.MIEN_TRUNG,
  },
  {
    label: 'Miền Nam',
    value: LOAI_KHU_VUC.MIEN_NAM,
  },
];

export const loaiManHinhOptions = [
  {
    label: 'Trang Chủ',
    value: LOAI_MAN_HINH.TRANG_CHU,
  },
  {
    label: 'Tin Tức',
    value: LOAI_MAN_HINH.TIN_TUC,
  },
  {
    label: 'Đổi Điểm',
    value: LOAI_MAN_HINH.DOI_DIEM,
  },
];

export const socialOptions = [
  {
    label: 'Fireant',
    value: SOCIAL.FIREANT
  },
  {
    label: 'Facebook',
    value: SOCIAL.FACEBOOK
  },
  {
    label: 'Twitter',
    value: SOCIAL.TWITTER
  }
]