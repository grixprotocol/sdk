import { AgentPlatformService, ToolSchema } from '../../types';

/**
 * Example format for Eliza
 */
export interface ElizaExample {
  user: string;
  content: {
    text: string;
    action?: string;
  };
}

/**
 * Action template for Eliza platform
 */
export interface ElizaAction {
  name: string;
  similes: string[];
  description: string;
  examples: ElizaExample[][];
  template?: string;
}

/**
 * Schema definition for Eliza tools
 */
export interface ElizaSchema extends ToolSchema {
  // Optional action-specific properties
  action?: ElizaAction;
}

/**
 * Eliza platform service interface
 */
export interface ElizaService extends AgentPlatformService<ElizaSchema> {
  /**
   * Get all available actions for Eliza
   */
  getActions(): Record<string, ElizaAction>;

  /**
   * Get parameter extraction templates
   */
  getTemplates(): Record<string, string>;
}
