import { optionsAction } from './actions/options/getOptionPrice.js';
import type { ElizaService } from './types/index.js';
import { GrixSDK } from 'src/index.js';

export const createElizaService = (grixSdkInstance: GrixSDK): ElizaService => {
  console.log(grixSdkInstance);
  return {
    actions: {
      options: optionsAction,
    },
  };
};

export type { ElizaService };
