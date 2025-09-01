import { IStats } from "./stats";
import { IEvidence } from "./evidence";
import { ITag } from "./tags";
import { ICreateAndModifiedDate } from "./created";

interface ISubControl extends ICreateAndModifiedDate {
  evidence: Array<IEvidence>;

  id: string;
  name: string;
  owner: string;
  context: string;
  project: string;
  ref_code: string;
  operator: string;
  framework: string;
  mitigation: string;
  project_id: string;
  description: string;
  notes: string | null;
  subcontrol_id: string;
  parent_control: string;
  owner_id: string | null;
  project_control_id: string;
  operator_id: string | null;
  completion_status: string;
  implementation_status: string;
  auditor_feedback: string | null;

  sort_id: number;
  implemented: number;
  process_maturity: number;
  progress_completed: number;

  is_complete: boolean;
  has_evidence: boolean;
  is_applicable: boolean;
}

interface IControl extends ICreateAndModifiedDate {
  tags: Array<ITag>;
  subcontrols: Array<ISubControl>;
  owners: Array<any>;
  comments: Array<any>;
  feedback: Array<any>;

  id: string;
  name: string;
  stats: IStats;
  status: string;
  ref_code: string;
  category: string;
  control_id: string;
  project_id: string;
  description: string;
  subcategory: string;
  notes: string | null;
  review_status: string;
  evidence_status: string;
  guidance: string | null;
  implemented_status: string;
  auditor_notes: string | null;

  progress_evidence: number;
  progress_completed: number;
  progress_implemented: number;

  is_custom: boolean;
  is_complete: boolean;
  system_level: boolean;
  is_applicable: boolean;
  review_complete: boolean;
}
interface IControlIntegrations {
  id: string;
  audit_source: string;
  audit_mechanism: string;
  control_id: string;
  status: boolean;
}
export type { ISubControl, IControl, IControlIntegrations };
