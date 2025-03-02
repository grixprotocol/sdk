import { AssetPriceHistoryGetParams, AssetPriceHistoryGetResponse } from './types';
import axios from 'axios';

export async function getAssetPriceHistory(
  params: AssetPriceHistoryGetParams,
  config: { apiKey: string; baseUrl: string }
): Promise<AssetPriceHistoryGetResponse> {
  const { assets, granularityMs, contextWindowMs } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();

  // Handle multiple assets
  assets.forEach((asset) => {
    queryParams.append('assets', asset);
  });

  queryParams.append('granularityMs', granularityMs.toString());
  queryParams.append('contextWindowMs', contextWindowMs.toString());

  try {
    const response = await axios.get(`${config.baseUrl}/asset-price-history`, {
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
        `Failed to get asset price history: ${error.response?.status} ${error.response?.data || error.message}`
      );
    }
    throw error;
  }
}
