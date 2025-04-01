import { GrixSDK } from 'src/index.js';

export interface GetAssetPriceParams {
  protocol: string;
  symbol: string;
}

export const getPerpsAssetPriceMcp = async (
  grixSdkInstance: GrixSDK,
  args: GetAssetPriceParams
) => {
  console.log({ grixSdkInstance, args });

  try {
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
