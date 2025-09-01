import { ICreateAndModifiedDate } from "./created";

interface IControl {
  id: string;
  name: string;
}
export interface IEvidence extends ICreateAndModifiedDate {
  controls: Array<IControl>;

  id: string;
  name: string;
  group: string;
  content: string;
  owner_id: string;
  tenant_id: string;
  project_id: string;
  description: string;
  collected_on: string;
  file_provider: string;
  file_name: string | null;

  control_count: number;

  has_file: boolean;
}
