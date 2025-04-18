import { GetPairsParams, GetPairsResponse } from './types.js';
import axios from 'axios';

export async function getPairs(
  params: GetPairsParams,
  config: { apiKey: string; baseUrl: string }
): Promise<GetPairsResponse> {
  const { protocol, baseAsset } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();

  queryParams.append('protocol', protocol);
  if (baseAsset) {
    queryParams.append('baseAsset', baseAsset);
  }

  try {
    const response = await axios.get<GetPairsResponse>(`${config.baseUrl}/perps/getPairs`, {
      params: queryParams,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to get pairs:', error);
    throw error;
  }
}
