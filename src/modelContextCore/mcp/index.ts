import { getOptionsDataMcp } from './tools/options/handler.js';
import { getSignalsDataMcp } from './tools/signals/handler.js';
import { handleOperation } from './tools/operations/handler.js';
import { optionSchemaMcp } from './tools/options/schema.js';
import { signalSchemaMcp } from './tools/signals/schema.js';
import type { MCPService, MCPSchema } from './types/index.js';
import { GrixSDK } from 'src/index.js';

export const createMCPService = (grixSdkInstance: GrixSDK): MCPService => ({
  getOptionsDataMcp: (args) => getOptionsDataMcp(grixSdkInstance, args),
  getSignalsDataMcp: (args) => getSignalsDataMcp(grixSdkInstance, args),
  handleOperation: (name, args) => handleOperation(grixSdkInstance, name, args),
  schemas: [
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
  ],
});

export type { MCPService, MCPSchema };
