import axios from 'axios';
import { GetOpenInterestCapsRequest, GetOpenInterestCapsResponse } from './types.js';

export async function getOpenInterestCaps(
  params: GetOpenInterestCapsRequest,
  config: { apiKey: string; baseUrl: string }
): Promise<GetOpenInterestCapsResponse> {
  const { protocol } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();

  queryParams.append('protocol', protocol);

  try {
    const response = await axios.get(`${config.baseUrl}/perps/getOpenInterestCaps`, {
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
        `Failed to get open interest caps: ${error.response?.status} ${error.response?.data || error.message}`
      );
    }
    throw error;
  }
}
