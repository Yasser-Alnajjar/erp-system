import { ICreateAndModifiedDate } from "./created";

export interface ITenant extends ICreateAndModifiedDate {
  approved_domains?: Array<string>;

  logo_ref?: any;

  id: string;
  name: string;
  license: string;
  owner_id?: string;
  owner_email?: string;
  contact_email?: string;

  user_cap?: number;
  storage_cap?: number;
  project_cap?: number;
  ai_token_cap?: number;
  ai_token_usage?: number;

  ai_enabled?: boolean;
  is_default?: boolean;
  magic_link_login?: boolean;
}
