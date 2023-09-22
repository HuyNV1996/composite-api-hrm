
import { getListEmployeeV2 } from '@/api/employee/employee.api';
import { CAR_REGISTRATION, CA_GAY, CERTIFICATE, GIO_TINH, HINH_THUC_NHAN_VIEN, LOAI_GIO_LAM_VIEC, MARIAL, STATUS_LEAVE, TRANG_THAI_KET_NOI } from './consts';
import { getListCompany } from '@/api/shift/company';
import { getListLeaveType } from '@/api/shift/leavetype';
import { getListDepartment } from '@/api/timekeepingList/department.api';
import { getListJob } from '@/api/employee/job.api';
import { getListWorkHour } from '@/api/employee/workHour.api';
import { getListCountry } from '@/api/employee/country.api';
import { getListCity } from '@/api/employee/city.api';
import { getListReiligion } from '@/api/employee/religion.api';
import { getListNation } from '@/api/employee/nation.api';
import { getListState } from '@/api/employee/state.api';
import { getListDistrict } from '@/api/employee/district.api';
import { getListWard } from '@/api/employee/ward.api';
import { getListContractType } from '@/api/contract/contractType.api';


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

export const caGayOptions = [
  {
    label: 'Có',
    value: CA_GAY.CO,
  },
  {
    label: 'Không',
    value: CA_GAY.KHONG,
  },
];

export const hinhThucNhanVienOptions = [
  {
    label: 'Nhân viên',
    value: HINH_THUC_NHAN_VIEN.NHANVIEN,
  },
  {
    label: 'Học sinh',
    value: HINH_THUC_NHAN_VIEN.HOCSINH,
  },
  {
    label: 'Thực tập sinh',
    value: HINH_THUC_NHAN_VIEN.THUCTAP,
  },
  {
    label: 'Người mua',
    value: HINH_THUC_NHAN_VIEN.NGUOIMUA,
  },
  {
    label: 'Tự do',
    value: HINH_THUC_NHAN_VIEN.TUDO,
  },
]

export const loaiGioLamViecOptions = [
  {
    label: 'Cố định',
    value: LOAI_GIO_LAM_VIEC.CODINH,
  },
  {
    label: 'Linh động',
    value: LOAI_GIO_LAM_VIEC.LINHDONG,
  },
]

export const giotinhOptions = [
  {
    label: 'Nam',
    value: GIO_TINH.NAM,
  },
  {
    label: 'Nữ',
    value: GIO_TINH.NU,
  },
  {
    label: 'Khác',
    value: GIO_TINH.KHAC,
  },
]

export const tinhTrangHonNhanOptions = [
  {
    label: 'Chưa kết hôn',
    value: MARIAL.CHUAKETHON,
  },
  {
    label: 'Đã kết hôn',
    value: MARIAL.DAKETHON,
  },
  {
    label: 'Góa',
    value: MARIAL.GOA,
  },
  {
    label: 'Ly hôn',
    value: MARIAL.LYHON,
  },
]
export const bangCapCaoNhatOptions = [
  {
    label: 'Khác',
    value: CERTIFICATE.KHAC,
  },
  {
    label: 'Cử nhân',
    value: CERTIFICATE.CUNHAN,
  },
  {
    label: 'Thạc sỹ',
    value: CERTIFICATE.THACSY,
  },
  {
    label: 'Tiến sỹ',
    value: CERTIFICATE.TIENSY,
  },
]
export const dangKyGuiXeOptions = [
  {
    label: 'Có',
    value: CAR_REGISTRATION.CO
  },
  {
    label: 'Không',
    value: CAR_REGISTRATION.KHONG
  }
]
export const statusLeaveOptions = [
  {
    label: 'Đã duyệt',
    value: STATUS_LEAVE.APPROVED
  },
  {
    label: 'Từ chối',
    value: STATUS_LEAVE.DENIED
  },
  {
    label: 'Chờ duyệt',
    value: STATUS_LEAVE.PENDING
  },
]
export const invalidTypeOptions = [
  {
    label: 'Về sớm',
    value: "1"
  },
  {
    label: 'Đi muộn',
    value: "2"
  },
  {
    label: 'Thiếu chấm công',
    value: "3"
  }
]
export const contractStateOptions = [
  {
    label: 'Mới',
    value: "draft"
  },
  {
    label: 'Đang chạy',
    value: 'open',
  },
  {
    label: 'Sắp hết hạn',
    value: 'almost'
  },
  {
    label: 'Đã hết hạn',
    value: 'close'
  },
  {
    label: 'Đã hủy',
    value: 'cancel'
  }
]
export const validatedOptions = [
  {
    label: 'Từ chối',
    value: "3"
  },
  {
    label: 'Đã duyệt',
    value: "2"
  },
  {
    label: 'Chưa duyệt',
    value: "1"
  }
]
export const reasonOptions = [
  {
    label: "Cá nhân",
    value: "1"
  },
  {
    label: "Công việc",
    value: "2"
  }
]

export const companyOptions = async () => {
  const listcomp = await getListCompany();
  let objarr = [];
  for (let item of listcomp.result) {
    objarr.push({
      label: item.name,
      value: item.id,
    })
  }
  return objarr;
};
export const departmentOptions = async () => {
  const listDepartment = await getListDepartment();
  let objarr = [];
  for (let item of listDepartment.result) {
    objarr.push({
      label: item.name,
      value: item.id,
    })
  }
  return objarr;
}

export const contractTypeOptions = async () => {
  const listContractType = await getListContractType();
  let objarr = [];
  for (let item of listContractType.result) {
    objarr.push({
      label: item.name,
      value: item.id,
    })
  }
  return objarr;
}

export const employeeOptions = async () => {
  const listEmployee = await getListEmployeeV2();
  console.log(listEmployee)
  let objarr = [];
  if (listEmployee) {
    for (let item of listEmployee.result.result) {
      objarr.push({
        label: item.name,
        value: item.id,
      })
    }
    return objarr;
  }
  return [];
};
export const jobOptions = async () => {
  const listJob = await getListJob();
  let objarr = [];
  if (listJob) {
    for (let item of listJob.result) {
      objarr.push({
        label: item.name,
        value: item.id,
      })
    }
    return objarr;
  }
  return [];
};
export const workHourOptions = async () => {
  const listWorkHour = await getListWorkHour();
  let objarr = [];
  if (listWorkHour) {
    for (let item of listWorkHour.result) {
      objarr.push({
        label: item.name,
        value: item.id,
      })
    }
    return objarr;
  }
  return [];
};

export const countryOptions = async () => {
  const listCountry = await getListCountry();
  let objarr = [];
  if (listCountry) {
    for (let item of listCountry.result) {
      objarr.push({
        label: item.name,
        value: item.id,
      })
    }
    return objarr;
  }
  return [];
};

export const cityOptions = async () => {
  const listCity = await getListCity();
  let objarr = [];
  if (listCity) {
    for (let item of listCity.result) {
      objarr.push({
        label: item.name,
        value: item.id,
      })
    }
    return objarr;
  }
  return [];
};
export const religionOptions = async () => {
  const listReligion = await getListReiligion();
  let objarr = [];
  if (listReligion) {
    for (let item of listReligion.result) {
      objarr.push({
        label: item.name,
        value: item.id,
      })
    }
    return objarr;
  }
  return [];
};
export const nationOptions = async () => {
  const listNation = await getListNation();
  let objarr = [];
  if (listNation) {
    for (let item of listNation.result) {
      objarr.push({
        label: item.name,
        value: item.id,
      })
    }
    return objarr;
  }
  return [];
}
export const stateOptions = async () => {
  const listState = await getListState();
  let objarr = [];
  if (listState) {
    for (let item of listState.result) {
      objarr.push({
        label: item.name,
        value: item.id,
        country_id: item.country_id.id,
      })
    }
    return objarr;
  }
  return [];
}
export const districtOptions = async () => {
  const listDistrict = await getListDistrict();
  let objarr = [];
  if (listDistrict) {
    for (let item of listDistrict.result) {
      objarr.push({
        label: item.name,
        value: item.id,
        state_id: item.state_id.id,
      })
    }
    return objarr;
  }
  return [];
}
export const wardOptions = async () => {
  const listWard = await getListWard();
  let objarr = [];
  if (listWard) {
    for (let item of listWard.result) {
      objarr.push({
        label: item.name,
        value: item.id,
        district_id: item.district_id.id,
      })
    }
    return objarr;
  }
  return [];
}
export const leaveTypeOptions = async () => {
  const listleavetype = await getListLeaveType();
  let objarr = [];
  for (let item of listleavetype.result) {
    objarr.push({
      label: item.name,
      value: item.id,
    })
  }

  return objarr;


}

export const departmentNameOptions = async () => {
  const listleavetype = await getListDepartment();
  let objarr = [];
  for (let item of listleavetype.result) {
    objarr.push({
      label: item.name,
      value: item.name,
    })
  }

  return objarr;

}
