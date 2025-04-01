import { GrixSDK } from 'src/index.js';

export interface GetTradingFeeParams {
  protocol: string;
}

export const getPerpsTradingFeeMcp = async (
  grixSdkInstance: GrixSDK,
  args: GetTradingFeeParams
) => {
  console.log({ grixSdkInstance, args });

  try {
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
