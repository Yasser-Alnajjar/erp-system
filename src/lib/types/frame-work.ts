import { ICreateAndModifiedDate } from "./created";

export interface IFrameWork extends ICreateAndModifiedDate {
  id: string;
  name: string;
  tenant_id: string;
  description: string;
  guidance: string | null;
  reference_link: string | null;

  controls: number;

  feature_evidence: boolean;
}
