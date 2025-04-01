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
    const response = await axios.get(`${config.baseUrl}/perps/getNextFundingRate`, {
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
        `Failed to get next funding rate: ${error.response?.status} ${error.response?.data || error.message}`
      );
    }
    throw error;
  }
}
