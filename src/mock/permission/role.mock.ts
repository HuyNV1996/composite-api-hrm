import { mock, intercepter } from '../config';
import { Role } from '@/interface/permission/role.interface';

const roles: Role[] = [
  {
    name: {
      vi_VN: 'Khách',
      en_US: 'Guest',
    },
    code: 'role_guest',
    id: 0,
    status: 'enabled',
  },
  {
    name: {
      vi_VN: 'Admin',
      en_US: 'Admin',
    },
    code: 'role_admin',
    id: 1,
    status: 'enabled',
  },
];

mock.mock('/permission/role', 'get', intercepter(roles));
