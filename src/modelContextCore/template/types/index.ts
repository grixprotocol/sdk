import { AgentPlatformService, ToolSchema } from '../../types';

/**
 * Schema definition for template platform tools
 */
export interface TemplatePlatformSchema extends ToolSchema {
    // Add any platform-specific schema properties here
}

/**
 * Service interface for template platform
 */
export interface TemplatePlatformService extends AgentPlatformService<TemplatePlatformSchema> {
    // Add any platform-specific methods here
} 