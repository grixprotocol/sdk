import axios from 'axios';
import { GetTradingIndicatorsRequest, GetTradingIndicatorsResponse } from './types.js';
export async function getTradingIndicators(
  params: GetTradingIndicatorsRequest,
  config: { apiKey: string; baseUrl: string }
): Promise<GetTradingIndicatorsResponse> {
  const { exchange, symbol, interval } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();

  queryParams.append('exchange', exchange);
  queryParams.append('symbol', symbol);
  queryParams.append('interval', interval);

  try {
    const response = await axios.get(`${config.baseUrl}/trading-indicators`, {
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
        `Failed to get trading indicators: ${error.response?.status} ${error.response?.data || error.message}`
      );
    }
    throw error;
  }
}
