import {
  ITYPE_CONNECT,
  ILOAI_KHU_VUC,
  ILOAI_MAN_HINH,
  ILOAI_TRANG_THAI,
  ILOAI_CAU_HOI,
  ITRANG_THAI,
  ILOAI_TRANSACTION,
  ICUSTOMER_TYPE,
  IHAS_CONTRACT,
  IGENDER,
  INATIONALTYPE,
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

export const LOAI_CAU_HOI: Record<ILOAI_CAU_HOI, ILOAI_CAU_HOI> = {
  VIETNAMOBILE: 'VIETNAMOBILE',
  SIM: 'SIM',
  MUA_HANG: 'MUA_HANG',
  GIAO_HANG: 'GIAO_HANG',
  THANH_TOAN: 'THANH_TOAN',
  XU_LY_SU_CO: 'XU_LY_SU_CO',
};
export const TRANG_THAI: Record<ITRANG_THAI, string> = {
  ACTIVE: 'A',
  INACTIVE: 'I',
  LOCK: 'L',
};
export const LOAI_TRANSACTION: Record<ILOAI_TRANSACTION, string> = {
  NEW: 'N',
  APPROVED: 'A',
  REJECTED: 'R',
  CANCELLED: 'C',
};

export const CUSTOMER_TYPE: Record<ICUSTOMER_TYPE, string> = {
  INDIVIDUAL: 'Individual',
  CORPORATE: 'Corporate',
};

export const HAS_CONTRACT: Record<IHAS_CONTRACT, string> = {
  TRUE: 'True',
  FALSE: 'False',
};

export const GENDER: Record<IGENDER, string> = {
  MALE: 'Male',
  FEMALE: 'Female',
};

export const NATIONALTYPE: Record<INATIONALTYPE, string> = {
  IDCARD: 'Idcard',
  PASSPORT: 'Partport',
};
