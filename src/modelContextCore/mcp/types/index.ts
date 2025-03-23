export interface MCPSchema {
  name: string;
  schema: Record<string, unknown>;
  description: string;
}

export interface MCPService {
  getOptionsDataMcp: (
    args: Record<string, unknown>
  ) => Promise<{ content: { type: string; text: string }[] }>;
  getSignalsDataMcp: (
    args: Record<string, unknown>
  ) => Promise<{ content: { type: string; text: string }[] }>;
  handleOperation: (
    name: string,
    args?: Record<string, unknown>
  ) => Promise<{ content: { type: string; text: string }[] }>;
  schemas: MCPSchema[];
}
