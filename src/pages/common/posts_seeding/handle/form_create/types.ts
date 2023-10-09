export interface IFormCreateUser {
  id: string;
  username: string;
  password: string;
  name: string;
  bio: string;
  email: string;
  address: string;
  facebookLink: string;
  isExpert: boolean;
  isTeacher: boolean;
  blocked: boolean;
  totalPosts: number;
  totalLikes: number;
  followers: number;
  following: number;
  userLucky: boolean;
  site: string;
}
export interface IFormCreateCampaign {
  site: string;
  content: string;
  linkImage: string;
  createdAt: string;
  tag: string[]
}
export interface IRule {
  site: string;
  name: string;
  operator: string;
  value: string;
}

export interface ICreateCampaignParams {
  site: string;
  name: string;
  description: string;
  active: false;
  rule: IRule;
}
