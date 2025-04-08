import { GrixSDK } from 'src/index.js';
import { PerpsCurrentFundingRateProtocol } from './schema.js';

export interface GetCurrentFundingRateParams {
  protocol: string;
  pair: string;
}

export const getPerpsCurrentFundingRateMcp = async (
  grixSdkInstance: GrixSDK,
  args: GetCurrentFundingRateParams
) => {
  validatePerpsCurrentFundingRateArgs(args);

  try {
    const response = await grixSdkInstance.getCurrentFundingRate(args);

    if (!response) {
      return {
        content: [
          {
            type: 'text',
            text: 'No current funding rate available for the specified parameters.',
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

const validatePerpsCurrentFundingRateArgs = (args: GetCurrentFundingRateParams) => {
  const { protocol, pair } = args;

  if (!protocol || !pair) {
    throw new Error('Protocol and pair are required parameters.');
  }

  if (
    !Object.values(PerpsCurrentFundingRateProtocol).includes(
      protocol as PerpsCurrentFundingRateProtocol
    )
  ) {
    throw new Error(
      'Invalid protocol. Valid protocols are: ' +
        Object.values(PerpsCurrentFundingRateProtocol).join(', ')
    );
  }

  if (pair.split('-').length !== 2) {
    throw new Error(
      'Invalid pair. Trading pair must be in the format "BASE-QUOTE" (e.g., "BTC-USD")'
    );
  }
};
