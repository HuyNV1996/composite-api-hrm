import { BaseInfoDto } from '../baseDto';

export interface IUserDto extends BaseInfoDto {
  totalCount: number
  items: IUserItemDto[]
}

export interface IUserItemDto {
  tenantId: any
  userName: string
  email: string
  phoneNumber?: string
  emailConfirmed: boolean
  surname: any
  name: string
  lockoutEnd: any
  isLocked: boolean
  fullName: string
  listRoleId: any
  roles: IRole[]
  roleDtos: IRoleDto[]
  id: string
}

export interface IRole {
  tenantId: any
  userId: string
  roleId: string
}

export interface IRoleDto {
  name: string
  normalizedName: string
  description: string
  id: string
  extraProperties: IExtraProperties
}

export interface IExtraProperties {
  Description: string
}