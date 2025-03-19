import { AssetPriceHistoryGetParams, AssetPriceHistoryGetResponse } from './types.js';
import axios from 'axios';

export async function getAssetPriceHistory(
  params: AssetPriceHistoryGetParams,
  config: { apiKey: string; baseUrl: string }
): Promise<AssetPriceHistoryGetResponse> {
  try {
    const { assets, startTime, endTime } = params;
    const queryParams = new URLSearchParams();
    queryParams.append('start_time', startTime.toString());
    queryParams.append('end_time', endTime.toString());

    assets.forEach((asset: string) => {
      queryParams.append('assets', asset);
    });

    const response = await axios.get<AssetPriceHistoryGetResponse>(`${config.baseUrl}/asset-price-history`, {
      params: queryParams,
      headers: {
        'x-api-key': config.apiKey,
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: unknown }; message?: string };
      throw new Error(
        `Failed to get asset price history: ${axiosError.response?.status} ${axiosError.response?.data || axiosError.message}`
      );
    }
    throw error;
  }
}

export * from './types.js';
