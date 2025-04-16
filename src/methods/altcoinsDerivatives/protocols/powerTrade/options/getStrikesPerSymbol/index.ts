import { StrikesPerSymbolGetParams, StrikesPerSymbolGetResponse } from './types.js';
import axios from 'axios';

export async function getStrikesPerSymbol(
  config: { apiKey: string; baseUrl: string },
  params: StrikesPerSymbolGetParams
): Promise<StrikesPerSymbolGetResponse> {
  const { symbol } = params;
  const queryParams = new URLSearchParams();
  queryParams.append('symbol', symbol);

  try {
    const response = await axios.get<StrikesPerSymbolGetResponse>(
      `${config.baseUrl}/powerTrade/options/getStrikesPerSymbol`,
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
    throw new Error(`Failed to get strikes per symbol: ${error}`);
  }
}
