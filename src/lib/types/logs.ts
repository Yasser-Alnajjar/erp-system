interface ILog {
  action: string;
  created_at?: string;
  updated_at?: string | null;
  id: string;
  level: string;
  message: string;
  meta?: object;
  namespace: string;
  success: boolean;
  tenant_id: string | null;
  tenant_name?: string;
  user_email: string;
  user_id: string;
}
export type { ILog };
