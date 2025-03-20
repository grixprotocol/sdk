import axios from 'axios';
import { GetHistoricalFundingRatesRequest, GetHistoricalFundingRatesResponse } from './types.js';

export async function getHistoricalFundingRates(
  params: GetHistoricalFundingRatesRequest,
  config: { apiKey: string; baseUrl: string }
): Promise<GetHistoricalFundingRatesResponse> {
  const { protocol, pair, startTime, endTime } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();

  if (protocol) {
    queryParams.append('protocol', protocol);
  }
  if (pair) {
    queryParams.append('pair', pair);
  }
  if (startTime) {
    queryParams.append('startTime', startTime.toString());
  }
  if (endTime) {
    queryParams.append('endTime', endTime.toString());
  }

  try {
    const response = await axios.get(`${config.baseUrl}/perps/getHistoricalFundingRates`, {
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
        `Failed to get historical funding rates: ${error.response?.status} ${error.response?.data || error.message}`
      );
    }
    throw error;
  }
}
