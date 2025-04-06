import { ExpiriesPerSymbolGetParams, ExpiriesPerSymbolGetResponse } from './types.js';
import axios from 'axios';

export async function getExpiriesPerSymbol(
  config: { apiKey: string; baseUrl: string },
  params: ExpiriesPerSymbolGetParams
): Promise<ExpiriesPerSymbolGetResponse> {
  const { symbol } = params;
  const queryParams = new URLSearchParams();
  queryParams.append('symbol', symbol);

  try {
    const response = await axios.get(`${config.baseUrl}/powerTrade/options/getExpiriesPerSymbol`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
      },
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to get expiries per symbol: ${error.response?.status} ${error.response?.data || error.message}`
      );
    }
    throw error;
  }
}
