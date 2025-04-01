import axios from 'axios';
import { GetCurrentFundingRateRequest, GetCurrentFundingRateResponse } from './types.js';
export async function getCurrentFundingRate(
  params: GetCurrentFundingRateRequest,
  config: { apiKey: string; baseUrl: string }
): Promise<GetCurrentFundingRateResponse> {
  const { protocol, pair } = params;

  if (!protocol || !pair) {
    throw new Error('Protocol and pair are required');
  }

  // Build query parameters
  const queryParams = new URLSearchParams();

  queryParams.append('protocol', protocol);
  queryParams.append('pair', pair);
  try {
    const response = await axios.get<GetCurrentFundingRateResponse>(
      `${config.baseUrl}/perps/getCurrentFundingRate`,
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
    console.error('Failed to get current funding rate:', error);
    throw error;
  }
}
