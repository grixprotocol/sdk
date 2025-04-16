import axios from 'axios';
import {
  GetNextFundingRateRequest,
  LodeGetNextFundingRateResponse,
  HyperliquidGetNextFundingRateResponse,
} from './types.js';
export async function getNextFundingRate(
  params: GetNextFundingRateRequest,
  config: { apiKey: string; baseUrl: string }
): Promise<LodeGetNextFundingRateResponse | HyperliquidGetNextFundingRateResponse> {
  const { protocol } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();

  queryParams.append('protocol', protocol);

  try {
    const response = await axios.get<
      LodeGetNextFundingRateResponse | HyperliquidGetNextFundingRateResponse
    >(`${config.baseUrl}/perps/getNextFundingRate`, {
      params: queryParams,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to get next funding rate:', error);
    throw error;
  }
}
