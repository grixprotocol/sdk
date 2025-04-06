import { CurrenciesTradingStatisticsGetResponse } from './types.js';
import axios from 'axios';

export async function getCurrenciesTradingStatistics(config: {
  apiKey: string;
  baseUrl: string;
}): Promise<CurrenciesTradingStatisticsGetResponse> {
  try {
    const response = await axios.get(
      `${config.baseUrl}/powerTrade/getCurrenciesTradingStatistics`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.apiKey,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to get currencies trading statistics: ${error.response?.status} ${error.response?.data || error.message}`
      );
    }
    throw error;
  }
}
