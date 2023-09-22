import { enUS_transaction } from './domain/transaction';
import { enUS_account } from './account';
import { enUS_avatorDropMenu } from './user/avatorDropMenu';
import { enUS_tagsViewDropMenu } from './user/tagsViewDropMenu';
import { enUS_title } from './user/title';
import { enUS_globalTips } from './global/tips';
import { enUS_permissionRole } from './permission/role';
import { enUS_guide } from './guide';
import { en_US_documentation } from './documentation';
import { enUs_store } from './domain/cuaHang';
import { enUS_common } from './common';
import { enUS_banner } from './domain/banner';
import { enUS_user } from './domain/users';
import { enUs_product } from './domain/product';
import { enUs_nap_tien_chiet_khau } from './domain/napTienChietKhau';
import { enUs_orderManagement } from './domain/donHang';
import { enUS_khachHang } from './domain/khachhang';
import { enUs_role } from './domain/role';
import { enUS_merchant } from './domain/merchant';
import { enUS_sysvar } from './domain/sysvar';
import { enUS_permission } from './domain/permission';
import { enUS_topup } from './domain/topup';
import { enUS_customer } from './domain/customer';

const en_US = {
  ...enUS_common,
  ...enUS_user,
  ...enUs_store,
  ...enUS_account,
  ...enUS_avatorDropMenu,
  ...enUS_tagsViewDropMenu,
  ...enUS_title,
  ...enUS_globalTips,
  ...enUS_permissionRole,
  ...enUS_guide,
  ...en_US_documentation,
  ...enUS_banner,
  ...enUs_product,
  ...enUs_nap_tien_chiet_khau,
  ...enUs_orderManagement,
  ...enUS_khachHang,
  ...enUs_role,
  ...enUS_merchant,
  ...enUS_customer,
  ...enUS_sysvar,
  ...enUS_permission,
  ...enUS_transaction,
  ...enUS_topup
};

export default en_US;
