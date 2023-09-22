import { Device } from '@/interface/layout/index.interface';
import { MenuChild } from '@/interface/layout/menu.interface';
import { Role } from './login';

export type Locale = 'en_US' | 'vi_VN';

export interface UserState {
  /** user's language */
  locale: Locale;
  /** user's device */
  device: Device;
  /** menu collapsed status */
  collapsed: boolean;
  /** menu list for init tagsView */
  menuList: MenuChild[];
  /** Is first time to view the site ? */
  newUser: boolean;
  
  isShowInfoDrawer: boolean;
  fromToWeeklyDate: string;
}

export interface LoginState {
  name: string;
  job: string;
}
