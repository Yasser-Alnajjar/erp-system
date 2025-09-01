import { ICreateAndModifiedDate } from "./created";

export interface IPolicyVersion {
  version_id: string;
  last_changed: string;
  status: "draft" | "published" | string;

  version: number;

  is_latest: boolean;
  published: boolean;
}
export interface IPolicy extends ICreateAndModifiedDate {
  versions?: Array<IPolicyVersion>;

  id: string;
  name: string;
  content: string;
  template?: string;
  tenant_id?: string;
  project_id?: string;
  description: string;
  version_id?: string;
  owner?: string | null;
  ref_code: string | null;
  reviewer?: string | null;
  owner_id?: string | null;
  reviewer_id?: string | null;

  version?: number;

  visible?: boolean;
  is_published?: boolean;
}
