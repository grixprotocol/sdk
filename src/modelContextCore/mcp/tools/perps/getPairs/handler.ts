import { GetPairsParams, GrixSDK } from 'src/index.js';

export const getPerpsPairsMcp = async (grixSdkInstance: GrixSDK, args: GetPairsParams) => {
  console.log({ grixSdkInstance, args });

  try {
    const response = await grixSdkInstance.getPerpsPairs(args);

    if (!response || response.pairs.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'No pairs available for the specified parameters.',
          },
        ],
      };
    }

    const formattedOutput = response.pairs
      .map((pair, index) => `Pair ${index + 1}:\n` + `  Symbol: ${pair}\n`)
      .join('\n');

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
