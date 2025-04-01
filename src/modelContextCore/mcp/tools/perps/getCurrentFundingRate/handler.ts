import { GrixSDK } from 'src/index.js';

export interface GetCurrentFundingRateParams {
  protocol: string;
  pair: string;
}

export const getPerpsCurrentFundingRateMcp = async (
  grixSdkInstance: GrixSDK,
  args: GetCurrentFundingRateParams
) => {
  console.log({ grixSdkInstance, args });

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
