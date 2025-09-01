import { ICreateAndModifiedDate } from "./created";

export interface IComment extends ICreateAndModifiedDate {
  id: string;
  message: string;
  owner_id: string;
  risk_id?: string;
  tenant_id?: string;
  project_id?: string;
  control_id?: string;
  author_email: string;
}
