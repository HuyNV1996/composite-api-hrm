const DOMAIN_LOGIN = '/user';
const DOMAIN_USER = '/users';
const DOMAIN_POST = '/post';
const DOMAIN_ROOM = '/room';
const DOMAIN_COMMENT = '/comment';
const DOMAIN_MESSAGE = ''
export const AUTH = {
  LOGIN: `${DOMAIN_LOGIN}/login`,
};

export const USER = {
  GETLIST: `${DOMAIN_USER}`,
};

export const POST = {
  GETLIST: `${DOMAIN_POST}`,
};

export const ROOM = {
  GETLIST: `${DOMAIN_ROOM}`,
};
export const COMMENT = {
  GETLIST: `${DOMAIN_COMMENT}`,
};