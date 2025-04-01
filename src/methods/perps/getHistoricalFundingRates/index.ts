import axios from 'axios';
import { GetHistoricalFundingRatesRequest, GetHistoricalFundingRatesResponse } from './types.js';

export async function getHistoricalFundingRates(
  params: GetHistoricalFundingRatesRequest,
  config: { apiKey: string; baseUrl: string }
): Promise<GetHistoricalFundingRatesResponse> {
  const { protocol, pair, daysBack } = params;

  if (!protocol || !pair || !daysBack) {
    throw new Error('Protocol, pair and daysBack are required');
  }
  // Build query parameters
  const queryParams = new URLSearchParams();

  queryParams.append('protocol', protocol);
  queryParams.append('pair', pair);
  queryParams.append('daysBack', daysBack.toString());

  try {
    const response = await axios.get<GetHistoricalFundingRatesResponse>(
      `${config.baseUrl}/perps/getHistoricalFundingRates`,
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
    console.error('Failed to get historical funding rates:', error);
    throw error;
  }
}
