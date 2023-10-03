const DOMAIN_LOGIN = '/user';
const DOMAIN_USER = '/users';
const DOMAIN_POST = '/post';
const DOMAIN_ROOM = '/groups';
const DOMAIN_COMMENT = '/comments';
export const AUTH = {
  LOGIN: `${DOMAIN_LOGIN}/login`,
};

export const USER = {
  GETLIST: `${DOMAIN_USER}`,
};

export const POST = {
  GETLIST: `${DOMAIN_POST}`,
  DETAIL: `${DOMAIN_POST}/detail`,
};

export const ROOM = {
  GETLIST: `${DOMAIN_ROOM}`,
};
export const COMMENT = {
  GETLIST: `${DOMAIN_COMMENT}`,
};
