const DOMAIN_LOGIN = '/user';
const DOMAIN_USER = '/users';
const DOMAIN_POST = '/post';
const DOMAIN_ROOM = '/room';
const DOMAIN_COMMENT = '/comment';
export const AUTH = {
  LOGIN: `${DOMAIN_LOGIN}/login`,
};

// Fireant
export const USER_FA = {
  GETLIST: `${DOMAIN_USER}/fa`,
};

export const POST_FA = {
  GETLIST: `${DOMAIN_POST}/fa`,
  DETAIL:`${DOMAIN_POST}/fa/detail`,
};

export const ROOM = {
  GETLIST: `${DOMAIN_ROOM}`,
};
export const COMMENT_FA = {
  GETLIST: `${DOMAIN_COMMENT}/fa`,
};

//Facebook
export const USER_FB = {
  GETLIST: `${DOMAIN_USER}/fb`,
};

export const POST_FB = {
  GETLIST: `${DOMAIN_POST}/fb`,
  DETAIL:`${DOMAIN_POST}/fb/detail`,
};

export const COMMENT_FB = {
  GETLIST: `${DOMAIN_COMMENT}/fb`,
  DETAIL:`${DOMAIN_COMMENT}/fb/detail`,
};

//Twitter
export const USER_TW = {
  GETLIST: `${DOMAIN_USER}/tw`,
};

export const POST_TW = {
  GETLIST: `${DOMAIN_POST}/tw`,
  DETAIL:`${DOMAIN_POST}/tw/detail`,
};

export const COMMENT_TW = {
  GETLIST: `${DOMAIN_COMMENT}/tw`,
  DETAIL:`${DOMAIN_COMMENT}/tw/detail`
}