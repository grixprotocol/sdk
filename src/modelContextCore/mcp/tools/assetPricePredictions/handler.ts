import { GetAssetPricePredictionParams, GrixSDK } from 'src/index.js';

export const getAssetPricePredictionsMcp = async (
  grixSdkInstance: GrixSDK,
  args: GetAssetPricePredictionParams
) => {
  console.log({ grixSdkInstance, args });

  try {
    const response = await grixSdkInstance.getAssetPricePrediction(args);

    if (!response || !response.prediction) {
      return {
        content: [
          {
            type: 'text',
            text: 'No price prediction available for the specified parameters.',
          },
        ],
      };
    }

    const formattedOutput = `Price Prediction: ${response.prediction.prediction}\nConfidence Intervals: ${response.prediction.confidenceIntervals.join(', ')}\nTimestamp: ${new Date(response.prediction.timestamp).toISOString()}\nAsset: ${response.prediction.asset}\nTimeframe: ${response.prediction.timeframe}`;

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
