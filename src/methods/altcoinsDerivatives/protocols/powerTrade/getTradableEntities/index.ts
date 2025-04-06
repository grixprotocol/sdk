import { TradableEntitiesGetResponse } from './types.js';
import axios from 'axios';

export async function getTradableEntities(config: {
  apiKey: string;
  baseUrl: string;
}): Promise<TradableEntitiesGetResponse> {
  try {
    const response = await axios.get(`${config.baseUrl}/powerTrade/getTradableEntities`, {
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
