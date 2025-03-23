/**
 * Standard schema for tools across platforms
 */
export interface ToolSchema {
    name: string;
    schema: Record<string, unknown>;
    description: string;
}

/**
 * Standard response format for all agent operations
 */
export interface AgentResponse {
    content: { type: string; text: string }[];
}

/**
 * Base interface for platform adapters
 */
export interface PlatformAdapter {
    /** Get all tool schemas for this platform */
    getSchemas(): ToolSchema[];

    /** Handle an operation for this platform */
    handleOperation(name: string, args?: Record<string, unknown>): Promise<AgentResponse>;

    /** 
     * Optional methods that might be implemented by specific platforms 
     */
    [key: string]: any;
}

/**
 * Configuration for agent platforms
 */
export interface AgentPlatformConfig {
    // Add common configuration options here
} 