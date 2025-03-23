import { GrixSDK } from '../../../../index.js';
import { AgentResponse } from '../../../types.js';

/**
 * Handle example tool requests
 * 
 * @param grixSdkInstance GrixSDK instance
 * @param args Tool arguments
 * @returns Agent response
 */
export const handleExampleTool = async (
    grixSdkInstance: GrixSDK,
    args: Record<string, unknown>
): Promise<AgentResponse> => {
    try {
        const param1 = args.param1 as string;
        const param2 = args.param2 as number;

        // Example processing logic
        // You can use grixSdkInstance to access other SDK functionality if needed

        return {
            content: [
                {
                    type: 'text',
                    text: `Example tool processed with param1: ${param1}, param2: ${param2}`
                }
            ]
        };
    } catch (error) {
        const err = error as Error;
        return {
            content: [
                {
                    type: 'text',
                    text: `Failed to process example tool. Error: ${err.message}`
                }
            ]
        };
    }
}; 