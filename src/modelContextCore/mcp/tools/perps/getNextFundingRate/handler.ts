import { GrixSDK } from 'src/index.js';
import { formatNextFundingRateResponse } from './helpers.js';
import { PerpsNextFundingRateProtocol } from './schema.js';

export interface GetNextFundingRateParams {
  protocol: string;
}

export const getPerpsNextFundingRateMcp = async (
  grixSdkInstance: GrixSDK,
  args: GetNextFundingRateParams
) => {
  try {
    validatePerpsNextFundingRateArgs(args);
    const response = await grixSdkInstance.getNextFundingRate(args);

    if (!response) {
      return {
        content: [
          {
            type: 'text',
            text: 'No next funding rate available for the specified parameters.',
          },
        ],
      };
    }

    const formattedOutput = formatNextFundingRateResponse(response as unknown, args.protocol);

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

const validatePerpsNextFundingRateArgs = (args: GetNextFundingRateParams) => {
  const { protocol } = args;

  if (!protocol) {
    throw new Error('Protocol is required parameter.');
  }

  if (
    !Object.values(PerpsNextFundingRateProtocol).includes(protocol as PerpsNextFundingRateProtocol)
  ) {
    throw new Error(
      'Invalid protocol. Valid protocols are: ' +
        Object.values(PerpsNextFundingRateProtocol).join(', ')
    );
  }
};
