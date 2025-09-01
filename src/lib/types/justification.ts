interface IJustification {
  id: string;
  justification: string;
  policy_name: string;
  policy_description: string;
  created_at: string;
  status: "approved" | "rejected" | "pending";
}
export type { IJustification };
