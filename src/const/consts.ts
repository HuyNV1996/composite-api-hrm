import {
  FIXED_SHIFT,
  ITYPE_CONNECT,
  IHINH_THUC_NHAN_VIEN,
  ILOAIGIO_LAM_VIEC,
  ISEX,
  IMARIAL,
  ICERTIFICATE,
  ICAR_REGISTRATION,
  ISTATUS_LEAVE
} from './types';

export const TRANG_THAI_KET_NOI: Record<ITYPE_CONNECT, number> = {
  ONLINE: 1,
  OFFLINE: 2,
};
export const CA_GAY: Record<FIXED_SHIFT, boolean> = {
  CO: true,
  KHONG: false,
};

export const HINH_THUC_NHAN_VIEN: Record<IHINH_THUC_NHAN_VIEN, string> = {
  NHANVIEN: 'employee',
  HOCSINH: 'student',
  THUCTAP: 'trainee',
  NGUOIMUA:'contractor',
  TUDO:'freelance'
};
export const LOAI_GIO_LAM_VIEC: Record<ILOAIGIO_LAM_VIEC, string> = {
  LINHDONG: '2',
  CODINH: '1',
};

export const GIO_TINH: Record<ISEX, string> = {
  NAM: 'male',
  NU: 'female',
  KHAC:'other'
};

export const MARIAL: Record<IMARIAL, string> = {
  CHUAKETHON: 'single',
  DAKETHON: 'married',
  DONGIOI: 'cohabitant',
  GOA: 'widower',
  LYHON:'divorced'
}

export const CERTIFICATE: Record<ICERTIFICATE, string> = {
  KHAC: 'other',
  TOTNGHIEP:'graduate',
  CUNHAN:'bachelor',
  THACSY:'master',
  TIENSY: 'docter',
}

export const CAR_REGISTRATION: Record<ICAR_REGISTRATION, string> = {
  CO:'YES',
  KHONG:'NO'
}

export const DAY = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7','CN'];

export const STATUS_LEAVE: Record<ISTATUS_LEAVE, string> = {
  APPROVED:'validate',
  PENDING:'confirm',
  DENIED:'refuse',
}