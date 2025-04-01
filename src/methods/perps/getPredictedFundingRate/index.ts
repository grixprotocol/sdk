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
    const response = await axios.get<GetPredictedFundingsResponse>(
      `${config.baseUrl}/perps/getPredictedFundings`,
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
    console.error('Failed to get predicted fundings:', error);
    throw error;
  }
}
