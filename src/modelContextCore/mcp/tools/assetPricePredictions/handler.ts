import { GetAssetPricePredictionParams, GrixSDK } from 'src/index.js';
import { PriceInferenceToken, PriceInferenceTimeframe } from './schema.js';

export const getAssetPricePredictionsMcp = async (
  grixSdkInstance: GrixSDK,
  args: GetAssetPricePredictionParams
) => {
  try {
    validateAssetPricePredictionArgs(args);
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

const validateAssetPricePredictionArgs = (args: GetAssetPricePredictionParams) => {
  const { asset, timeframe } = args;

  if (!asset || !timeframe) {
    throw new Error('Asset and timeframe are required');
  }

  if (!Object.values(PriceInferenceToken).includes(asset as PriceInferenceToken)) {
    throw new Error(
      'Invalid asset. Valid assets are: ' + Object.values(PriceInferenceToken).join(', ')
    );
  }

  if (!Object.values(PriceInferenceTimeframe).includes(timeframe as PriceInferenceTimeframe)) {
    throw new Error(
      'Invalid timeframe. Valid timeframes are: ' +
        Object.values(PriceInferenceTimeframe).join(', ')
    );
  }
};
