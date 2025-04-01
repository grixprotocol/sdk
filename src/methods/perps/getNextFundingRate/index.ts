import axios from 'axios';
import { GetNextFundingRateRequest, GetNextFundingRateResponse } from './types.js';
export async function getNextFundingRate(
  params: GetNextFundingRateRequest,
  config: { apiKey: string; baseUrl: string }
): Promise<GetNextFundingRateResponse> {
  const { protocol } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();

  queryParams.append('protocol', protocol);

  try {
    const response = await axios.get<GetNextFundingRateResponse>(
      `${config.baseUrl}/perps/getNextFundingRate`,
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
    console.error('Failed to get next funding rate:', error);
    throw error;
  }
}
