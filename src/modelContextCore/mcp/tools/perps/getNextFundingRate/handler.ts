import { GrixSDK } from 'src/index.js';

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
