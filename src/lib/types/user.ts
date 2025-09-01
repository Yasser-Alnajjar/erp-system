import { ICreateAndModifiedDate } from "./created";

export interface IMember {
  id: string;
  email: string;
  access_level?: string;

  member?: boolean;
}
export interface IUser extends ICreateAndModifiedDate {
  roles?: Array<string>;
  tenants?: Array<string>;

  id: string;
  email: string;
  username: string;
  last_name: string;
  first_name: string;
}
export interface IRole {
  role_id: string;
  role_name: string;

  enabled: boolean;
}
