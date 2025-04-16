import { GrixSDK } from 'src/index.js';
import { PerpsTradingFeeProtocol } from './schema.js';

export interface GetTradingFeeParams {
  protocol: string;
}

export const getPerpsTradingFeeMcp = async (
  grixSdkInstance: GrixSDK,
  args: GetTradingFeeParams
) => {
  try {
    validatePerpsTradingFeeArgs(args);
    const response = await grixSdkInstance.getTradingFee(args);

    if (!response) {
      return {
        content: [
          {
            type: 'text',
            text: 'No trading fee available for the specified parameters.',
          },
        ],
      };
    }

    const formattedOutput = response.map((item) => `${item.symbol}: ${item.fee}`).join('\n');
    return {
      content: [
        {
          type: 'text',
          text: formattedOutput,
        },
      ],
    };
  } catch (error: unknown) {
    return {
      content: [
        {
          type: 'text',
          text: error instanceof Error ? error.message : 'Unknown error occurred',
        },
      ],
    };
  }
};

const validatePerpsTradingFeeArgs = (args: GetTradingFeeParams) => {
  const { protocol } = args;

  if (!protocol) {
    throw new Error('Protocol is required');
  }

  if (!Object.values(PerpsTradingFeeProtocol).includes(protocol as PerpsTradingFeeProtocol)) {
    throw new Error(
      'Invalid protocol. Valid protocols are: ' + Object.values(PerpsTradingFeeProtocol).join(', ')
    );
  }
};
