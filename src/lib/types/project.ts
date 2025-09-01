import { IMember } from "./user";
import { ICreateAndModifiedDate } from "./created";
interface IStats {
  total?: number;
  status?: {
    new?: number;
    pending?: number;
    escalated?: number;
    closed?: number;
  };
  severity?: {
    low?: number;
    medium?: number;
    high?: number;
    critical?: number;
  };
}

type ReviewSummary = {
  [key: string]: number;
  total: number;
};
export interface IProject extends ICreateAndModifiedDate {
  members: Array<IMember>;
  review_summary?: ReviewSummary;
  violations_stats?: IStats;
  auditors: Array<any>;

  id: string;
  name: string;
  owner: string;
  status: string;
  tenant: string;
  format?: string;
  owner_id: string;
  tenant_id: string;
  framework?: string;
  description: string;
  framework_id?: string;
  notes?: string | null;
  last_completion_update: string;

  target_level: number;
  total_controls: number;
  total_policies: number;
  evidence_progress?: number;
  completion_progress: number;
  implemented_progress?: number;

  show_driver: boolean;
  auditor_enabled: boolean;
  policies_require_cc: boolean;
  can_auditor_read_comments: boolean;
  can_auditor_write_comments: boolean;
  can_auditor_read_scratchpad: boolean;
  can_auditor_write_scratchpad: boolean;
}
