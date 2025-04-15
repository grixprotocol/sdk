import { GrixSDK } from 'src/index.js';
import { PerpsAssetPriceProtocol } from './schema.js';

export interface GetAssetPriceParams {
  protocol: string;
  symbol: string;
}

export const getPerpsAssetPriceMcp = async (
  grixSdkInstance: GrixSDK,
  args: GetAssetPriceParams
) => {
  try {
    validatePerpsAssetPriceArgs(args);
    const response = await grixSdkInstance.getAssetPrice(args);

    if (!response) {
      return {
        content: [
          {
            type: 'text',
            text: 'No asset price available for the specified parameters.',
          },
        ],
      };
    }

    const formattedOutput = response;
    return {
      content: [
        {
          type: 'text',
          text: formattedOutput.toString(),
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

const validatePerpsAssetPriceArgs = (args: GetAssetPriceParams) => {
  const { protocol, symbol } = args;

  if (!protocol || !symbol) {
    throw new Error('Protocol and symbol are required parameters.');
  }

  if (!Object.values(PerpsAssetPriceProtocol).includes(protocol as PerpsAssetPriceProtocol)) {
    throw new Error(
      'Invalid protocol. Valid protocols are: ' + Object.values(PerpsAssetPriceProtocol).join(', ')
    );
  }

  if (symbol.split('-').length !== 2) {
    throw new Error('Invalid symbol. Symbol must be in the format of COIN-MARKET (e.g., BTC-USDT)');
  }
};
