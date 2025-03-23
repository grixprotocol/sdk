import { AgentPlatformService, ToolSchema, AgentResponse } from '../../types';

export interface ElizaExample {
  user: string;
  content: {
    text: string;
    action?: string;
  };
}

export interface ElizaAction {
  template: string;
  name: string;
  similes: string[];
  description: string;
  examples: ElizaExample[][];
}

export interface ElizaSchema extends ToolSchema {
  action: ElizaAction;
}

export interface ElizaService extends AgentPlatformService<ElizaSchema> {
  actions: {
    options: ElizaAction;
    // Add more action types as needed
  };
}
