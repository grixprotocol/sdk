import { GrixSDK } from '../../index.js';
import { PlatformAdapter, ToolSchema, AgentResponse } from '../types.js';

/**
 * Create template platform adapter
 */
export const createTemplatePlatform = (grixSdkInstance: GrixSDK): PlatformAdapter => {
    // Define schemas
    const schemas: ToolSchema[] = [
        {
            name: 'exampleTool',
            schema: {
                type: 'object',
                properties: {
                    param1: { type: 'string' },
                    param2: { type: 'number' }
                },
                required: ['param1']
            },
            description: 'Example tool description'
        }
    ];

    // Handle operations
    const handleOperation = async (name: string, args?: Record<string, unknown>): Promise<AgentResponse> => {
        if (name === 'exampleTool') {
            const param1 = args?.param1 as string;
            const param2 = args?.param2 as number;

            try {
                // Implement tool logic
                // Use grixSdkInstance for API calls if needed

                return {
                    content: [
                        {
                            type: 'text',
                            text: `Tool executed with param1: ${param1}, param2: ${param2 || 'N/A'}`
                        }
                    ]
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Error: ${error instanceof Error ? error.message : String(error)}`
                        }
                    ]
                };
            }
        }

        throw new Error(`Unknown tool: ${name}`);
    };

    return {
        getSchemas: () => schemas,
        handleOperation
    };
}; 