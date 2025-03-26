import {
  GetAssetPricePredictionParams,
  GetAssetPricePredictionResponse,
  PriceInferenceToken,
  PriceInferenceTimeframe,
} from './types.js';
import axios from 'axios';

export async function getAssetPricePrediction(
  params: GetAssetPricePredictionParams,
  config: { apiKey: string; baseUrl: string }
): Promise<GetAssetPricePredictionResponse> {
  const { asset, timeframe } = params;

  if (!Object.values(PriceInferenceToken).includes(asset)) {
    throw new Error(
      `Invalid asset: ${asset}, valid values are ${Object.values(PriceInferenceToken).join(', ')}`
    );
  }

  if (!Object.values(PriceInferenceTimeframe).includes(timeframe)) {
    throw new Error(
      `Invalid timeframe: ${timeframe}, valid values are ${Object.values(PriceInferenceTimeframe).join(', ')}`
    );
  }

  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('asset', asset);
  queryParams.append('timeframe', timeframe);

  try {
    const response = await axios.get(`${config.baseUrl}/assetpriceprediction`, {
      params: queryParams,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to get pairs: ${error.response?.status} ${error.response?.data || error.message}`
      );
    }
    throw error;
  }
}
