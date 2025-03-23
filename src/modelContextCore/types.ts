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
 * A simple platform adapter interface
 */
export interface PlatformAdapter {
    /** Get all tool schemas for this platform */
    getSchemas(): ToolSchema[];

    /** Handle an operation for this platform */
    handleOperation(name: string, args?: Record<string, unknown>): Promise<AgentResponse>;
}

/**
 * Configuration for agent platforms
 */
export interface AgentPlatformConfig {
    // Add common configuration options here
} 