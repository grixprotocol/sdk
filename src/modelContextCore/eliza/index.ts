import { optionsAction } from './actions/options/getOptionPrice.js';
import { GrixSDK } from '../../index.js';
import { PlatformAdapter, ToolSchema, AgentResponse } from '../types.js';

/**
 * Create an Eliza service adapter
 */
export const createElizaService = (grixSdkInstance: GrixSDK): PlatformAdapter => {
  const schemas: ToolSchema[] = [
    {
      name: 'options',
      schema: {
        type: 'object',
        properties: {
          asset: { type: 'string', enum: ['BTC', 'ETH'] },
          optionType: { type: 'string', enum: ['call', 'put'] },
          positionType: { type: 'string', enum: ['long', 'short'] }
        }
      },
      description: 'Get options data'
    }
  ];

  // Handle operations for Eliza
  const handleOperation = async (name: string, args?: Record<string, unknown>): Promise<AgentResponse> => {
    if (name === 'options') {
      // Implement options handler using grixSdkInstance
      return {
        content: [{ type: 'text', text: 'Options data processed' }]
      };
    }
    throw new Error(`Unknown tool: ${name}`);
  };

  return {
    getSchemas: () => schemas,
    handleOperation
  };
};
