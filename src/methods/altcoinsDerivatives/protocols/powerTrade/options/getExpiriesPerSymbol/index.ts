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
    const response = await axios.get<ExpiriesPerSymbolGetResponse>(
      `${config.baseUrl}/powerTrade/options/getExpiriesPerSymbol`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.apiKey,
        },
        params: queryParams,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Failed to get expiries per symbol: ${error}`);
  }
}
