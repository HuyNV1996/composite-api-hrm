import {
  ITYPE_CONNECT,
  ILOAI_KHU_VUC,
  ILOAI_MAN_HINH,
  ILOAI_TRANG_THAI,
  ISOCIAL,
  ITYPECAMPAIGN,
} from './types';

export const TRANG_THAI_KET_NOI: Record<ITYPE_CONNECT, number> = {
  ONLINE: 1,
  OFFLINE: 2,
};

export const LOAI_TRANG_THAI: Record<ILOAI_TRANG_THAI, boolean> = {
  ACTIVE: false,
  INACTIVE: true,
};

export const LOAI_KHU_VUC: Record<ILOAI_KHU_VUC, ILOAI_KHU_VUC> = {
  MIEN_BAC: 'MIEN_BAC',
  MIEN_NAM: 'MIEN_NAM',
  MIEN_TRUNG: 'MIEN_TRUNG',
};

export const LOAI_MAN_HINH: Record<ILOAI_MAN_HINH, ILOAI_MAN_HINH> = {
  TRANG_CHU: 'TRANG_CHU',
  TIN_TUC: 'TIN_TUC',
  DOI_DIEM: 'DOI_DIEM',
};

export const SOCIAL: Record<ISOCIAL, string> = {
  FACEBOOK:'facebook',
  IWEALTHCLUB: 'iwealthclub',
  FIREANT:'fireant'
}

export const TYPECAMPAIGN: Record<ITYPECAMPAIGN, number> = {
  SEEDING_CHAT:1,
  SEEDING_POST:2,
  SEEDING_LIKE_POST:3,
  SEEDING_LIKE_COMMENT:4
}