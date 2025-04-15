import { CurrenciesTradingStatisticsGetResponse } from './types.js';
import axios from 'axios';

export async function getCurrenciesTradingStatistics(config: {
  apiKey: string;
  baseUrl: string;
}): Promise<CurrenciesTradingStatisticsGetResponse> {
  try {
    const response = await axios.get<CurrenciesTradingStatisticsGetResponse>(
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
    throw new Error(`Failed to get currencies trading statistics: ${error}`);
  }
}
