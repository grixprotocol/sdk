import axios from 'axios';
import { GetTradingFeeResponse } from './types.js';
import { GetTradingFeeRequest } from './types.js';
export async function getTradingFee(
  params: GetTradingFeeRequest,
  config: { apiKey: string; baseUrl: string }
): Promise<GetTradingFeeResponse[]> {
  const { protocol } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();

  queryParams.append('protocol', protocol);

  try {
    const response = await axios.get(`${config.baseUrl}/perps/getTradingFees`, {
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
        `Failed to get trading fees: ${error.response?.status} ${error.response?.data || error.message}`
      );
    }
    throw error;
  }
}
