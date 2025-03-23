import { getOptionsDataMcp } from './tools/options/handler.js';
import { getSignalsDataMcp } from './tools/signals/handler.js';
import { handleOperation } from './tools/operations/handler.js';
import { optionSchemaMcp } from './tools/options/schema.js';
import { signalSchemaMcp } from './tools/signals/schema.js';
import { GrixSDK } from '../../index.js';
import { PlatformAdapter, ToolSchema } from '../types.js';

/**
 * Create a MCP service adapter
 */
export const createMCPService = (grixSdkInstance: GrixSDK): PlatformAdapter => {
  const schemas: ToolSchema[] = [
    {
      name: 'options',
      schema: optionSchemaMcp,
      description: 'Schema for options data retrieval',
    },
    {
      name: 'signals',
      schema: signalSchemaMcp,
      description: 'Schema for trading signals generation',
    },
  ];

  return {
    getSchemas: () => schemas,
    handleOperation: (name, args) => handleOperation(grixSdkInstance, name, args)
  };
};
