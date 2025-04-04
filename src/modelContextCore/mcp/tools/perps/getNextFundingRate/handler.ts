import { GrixSDK } from 'src/index.js';
import { formatNextFundingRateResponse } from './helpers.js';

export interface GetNextFundingRateParams {
  protocol: string;
}

export const getPerpsNextFundingRateMcp = async (
  grixSdkInstance: GrixSDK,
  args: GetNextFundingRateParams
) => {
  console.log({ grixSdkInstance, args });

  try {
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
