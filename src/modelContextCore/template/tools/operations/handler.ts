import { GrixSDK } from '../../../../index.js';
import { AgentResponse } from '../../../types.js';
import { handleExampleTool } from '../example/handler.js';

/**
 * Central operation handler for all template platform tools
 * 
 * @param grixSdkInstance GrixSDK instance
 * @param name Name of the tool to execute
 * @param args Arguments for the tool
 * @returns Agent response
 */
export const handleOperation = async (
    grixSdkInstance: GrixSDK,
    name: string,
    args?: Record<string, unknown>
): Promise<AgentResponse> => {
    // Default empty arguments if none provided
    const params = args || {};

    try {
        // Route to the appropriate tool handler
        if (name === 'exampleTool') {
            return await handleExampleTool(grixSdkInstance, params);
        }

        // Unknown tool
        throw new Error(`Unknown tool: ${name}`);
    } catch (error) {
        const err = error as Error;
        return {
            content: [
                {
                    type: 'text',
                    text: `Operation failed: ${err.message}`
                }
            ]
        };
    }
}; 