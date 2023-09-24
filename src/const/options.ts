import { TRANG_THAI_KET_NOI, LOAI_KHU_VUC, LOAI_MAN_HINH, LOAI_TRANG_THAI, LOAI_CAU_HOI, TRANG_THAI, LOAI_TRANSACTION, CUSTOMER_TYPE, HAS_CONTRACT, GENDER, NATIONALTYPE } from './consts';

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

export const loaiCauHoiOptions = [
  {
    label: 'Về Vietnamobile',
    value: LOAI_CAU_HOI.VIETNAMOBILE,
  },
  {
    label: 'SIM',
    value: LOAI_CAU_HOI.SIM,
  },
  {
    label: 'Mua hàng',
    value: LOAI_CAU_HOI.MUA_HANG,
  },
  {
    label: 'Giao hàng',
    value: LOAI_CAU_HOI.GIAO_HANG,
  },
  {
    label: 'Thanh toán',
    value: LOAI_CAU_HOI.THANH_TOAN,
  },
  {
    label: 'Xử lý sự cố',
    value: LOAI_CAU_HOI.XU_LY_SU_CO,
  },
];

export const TrangThaiOptions = [
  {
    label: 'Kích hoạt',
    value: TRANG_THAI.ACTIVE,
  },
  {
    label: 'Không kích hoạt',
    value: TRANG_THAI.INACTIVE,
  },
  {
    label: 'Khoá',
    value: TRANG_THAI.LOCK,
  },
];

export const TransactionOptions = [
  {
    label: 'NEW',
    value: LOAI_TRANSACTION.NEW,
  },
  {
    label: 'APPROVED',
    value: LOAI_TRANSACTION.APPROVED,
  },
  {
    label: 'REJECTED',
    value: LOAI_TRANSACTION.REJECTED,
  },
  {
    label: 'CANCELLED',
    value: LOAI_TRANSACTION.CANCELLED,
  },
];

export const CustomerTypeOptions = [
  {
    label: 'Cá nhân',
    value: CUSTOMER_TYPE.INDIVIDUAL,
  },
  {
    label: 'Doanh nghiệp',
    value: CUSTOMER_TYPE.CORPORATE,
  },
];

export const HasContractOptions = [
  {
    label: 'Đã có hợp đồng',
    value: HAS_CONTRACT.TRUE,
  },
  {
    label: 'Chưa có hợp đồng',
    value: HAS_CONTRACT.FALSE,
  },
];

export const GenderOptions = [
  {
    label: 'Nam',
    value: GENDER.MALE,
  },
  {
    label: 'Nữ',
    value: GENDER.FEMALE,
  },
];

export const NationalTypeOptions = [
  {
    label: 'Chứng minh nhân dân',
    value: NATIONALTYPE.IDCARD,
  },
  {
    label: 'Hộ chiếu',
    value: NATIONALTYPE.PASSPORT,
  },
];