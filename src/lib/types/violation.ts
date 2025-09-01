import { IComment } from "./comment";

interface IViolation {
  id: string;
  description: string;
  control_name: string;
  integration_name: string;
  status: "new" | "pending" | "escalated" | "closed";
  severity: "low" | "medium" | "high" | "critical";
  evidence: any;
  detectedAt: string;
  user_justification?: string;
  comments: Array<IComment>;
  assignedTo?: string;
}
export type { IViolation };
