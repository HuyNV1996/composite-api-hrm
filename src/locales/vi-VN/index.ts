import { viVN_account } from './account';
import { viVN_avatorDropMenu } from './user/avatorDropMenu';
import { enUS_tagsViewDropMenu } from './user/tagsViewDropMenu';
import { enUS_title } from './user/title';
import { enUS_globalTips } from './global/tips';
import { enUS_permissionRole } from './permission/role';
import { enUS_guide } from './guide';
import { en_US_documentation } from './documentation';
import { viVN_cuaHang } from './domain/cuaHang';
import { viVN_common } from './common';
import { viVN_banner } from './domain/banner';
import { viVN_user } from './domain/users';
import { viVN_product } from './domain/product';
import { viVN_nap_tien_chiet_khau } from './domain/napTienChietKhau';
import { viVN_orderManagement } from './domain/donHang';
import { viVN_khachHang } from './domain/khachHang';
import { viVN_role } from './domain/role';
import { viVN_merchant } from './domain/merchant';
import { viVN_sysvar } from './domain/sysvar';
import { viVN_permission } from './domain/permission';
import { viVN_transaction } from './domain/transaction';
import { viVN_topup } from './domain/topup';
import { viVN_customer } from './domain/customer';

const vi_VN = {
  ...viVN_account,
  ...viVN_common,
  ...viVN_user,
  ...viVN_cuaHang,
  ...viVN_avatorDropMenu,
  ...enUS_tagsViewDropMenu,
  ...enUS_title,
  ...enUS_globalTips,
  ...enUS_permissionRole,
  ...enUS_guide,
  ...en_US_documentation,
  ...viVN_banner,
  ...viVN_product,
  ...viVN_nap_tien_chiet_khau,
  ...viVN_orderManagement,
  ...viVN_khachHang,
  ...viVN_role,
  ...viVN_merchant,
  ...viVN_customer,
  ...viVN_sysvar,
  ...viVN_permission,
  ...viVN_transaction,
  ...viVN_topup
};

export default vi_VN;
