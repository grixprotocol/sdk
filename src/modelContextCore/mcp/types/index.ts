import { AgentPlatformService, ToolSchema, AgentResponse } from '../../types';

export interface MCPSchema extends ToolSchema {
  // Add MCP-specific schema properties if needed
}

export interface MCPService extends AgentPlatformService<MCPSchema> {
  // MCP-specific methods
  getOptionsDataMcp: (
    args: Record<string, unknown>
  ) => Promise<AgentResponse>;
  getSignalsDataMcp: (
    args: Record<string, unknown>
  ) => Promise<AgentResponse>;
  schemas: MCPSchema[];
}
