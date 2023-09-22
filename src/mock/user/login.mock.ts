import { mock, intercepter } from '../config';
import { Role } from '@/interface/user/login';

mock.mock('/user/login', 'post', (config: any) => {
  const body: any = JSON.parse(config?.body);

  return intercepter({
    token: '123abcdefg',
    username: body?.username,
    role: body?.username as Role,
  });
});
