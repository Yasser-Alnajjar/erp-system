interface IAgent {
  status: "online" | "offline" | "error" | "warning" | "new";
  name: string;
  osVersion: string;
  architecture: string;
  eps: number;
  memoryUsageMB: number;
  cpuLoad: number;
  deploymentState: "Configured" | "Not Configured";
  configuration: string;
}

interface IAgentSummary {
  ok: number;
  new: number;
  error: number;
  warning: number;
  offline: number;
  all: number;
}

export type { IAgent, IAgentSummary };
