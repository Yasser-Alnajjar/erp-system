import { IComment } from "./comment";
import { ICreateAndModifiedDate } from "./created";

export interface IRisk extends ICreateAndModifiedDate {
  comments: Array<IComment>;

  tags: Array<string>;

  id: string;
  risk: string;
  title: string;
  scope: string;
  status: string;
  priority: string;
  assignee: string;
  tenant_id: string;
  created_at: string;
  description: string;
  project?: string | null;
  vendor_id: string | null;
  project_id: string | null;
  remediation: string | null;
  enabled: boolean;
}
