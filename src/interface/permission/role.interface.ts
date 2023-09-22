export type RoleStatus = 'enabled' | 'disabled';
export interface Role {
  name: {
    vi_VN: string;
    en_US: string;
  };
  code: string;
  id: number;
  status: RoleStatus;
}

export type GetRoleResult = Role[];
