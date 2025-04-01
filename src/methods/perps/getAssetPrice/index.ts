import axios from 'axios';
import { GetAssetPriceRequest, GetAssetPriceResponse } from './types.js';
export async function getAssetPrice(
  params: GetAssetPriceRequest,
  config: { apiKey: string; baseUrl: string }
): Promise<GetAssetPriceResponse> {
  const { protocol, symbol } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();

  queryParams.append('protocol', protocol);
  queryParams.append('symbol', symbol);
  try {
    const response = await axios.get<GetAssetPriceResponse>(
      `${config.baseUrl}/perps/getAssetPrice`,
      {
        params: queryParams,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.apiKey,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Failed to get asset price:', error);
    throw error;
  }
}
