import { ICreateAndModifiedDate } from "./created";

export interface ITag extends ICreateAndModifiedDate {
  id: string | null;
  name: string | null;
  color: string | null;
  tenant_id: string | null;
}
