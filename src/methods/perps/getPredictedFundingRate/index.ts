import axios from 'axios';
import { GetPredictedFundingsRequest, GetPredictedFundingsResponse } from './types.js';
export async function getPredictedFundings(
  params: GetPredictedFundingsRequest,
  config: { apiKey: string; baseUrl: string }
): Promise<GetPredictedFundingsResponse> {
  const { protocol } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();

  queryParams.append('protocol', protocol);

  try {
    const response = await axios.get(`${config.baseUrl}/perps/getPredictedFundings`, {
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
        `Failed to get predicted fundings: ${error.response?.status} ${error.response?.data || error.message}`
      );
    }
    throw error;
  }
}
