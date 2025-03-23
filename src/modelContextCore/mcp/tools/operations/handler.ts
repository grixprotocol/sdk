import { GrixSDK } from 'src/index.js';
import { getOptionsDataMcp } from '../options/handler.js';
import { getSignalsDataMcp } from '../signals/handler.js';

export const handleOperation = async (
  grixSdkInstance: GrixSDK,
  name: string,
  args?: Record<string, unknown>
): Promise<{ content: { type: string; text: string }[] }> => {
  if (name === 'options') {
    if (!args) {
      throw new Error('Missing required parameters: asset, optionType, or positionType');
    }
    try {
      return await getOptionsDataMcp(grixSdkInstance, args);
    } catch (error) {
      const err = error as Error;
      return {
        content: [
          {
            type: 'text',
            text: `Failed to fetch options data. Error: ${
              err.message
            }. Args: ${JSON.stringify(args)}`,
          },
        ],
      };
    }
  } else if (name === 'generateSignals') {
    if (!args) {
      throw new Error('generateSignals: Missing required parameters');
    }
    return await getSignalsDataMcp(grixSdkInstance, args);
  }

  throw new Error(`Unknown tool: ${name}`);
};
