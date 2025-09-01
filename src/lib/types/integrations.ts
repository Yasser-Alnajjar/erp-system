interface ConfigSchemaProperty {
  type: string;
  description: string;
  required?: boolean;
  default?: number | string;
}

interface ConfigSchema {
  audit_commands?: Array<string>;
  host?: ConfigSchemaProperty;
  port?: ConfigSchemaProperty;
  username?: ConfigSchemaProperty;
  password?: ConfigSchemaProperty;
  enable_password?: ConfigSchemaProperty;
}

interface IIntegration {
  id: number;
  name: string;
  vendor: string;
  active: boolean;
  type: string;
  description: string;
  connection_method: string;
  logo: string;
  capabilities: string[];
  config_schema: ConfigSchema;
  created_at: string;
  updated_at: string;
}
export type { IIntegration };
