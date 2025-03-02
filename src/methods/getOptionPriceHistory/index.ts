import { OptionPriceHistoryGetParams, OptionPriceHistoryGetResponse } from './types';
import axios from 'axios';

export async function getOptionPriceHistory(
  params: OptionPriceHistoryGetParams,
  config: { apiKey: string; baseUrl: string }
): Promise<OptionPriceHistoryGetResponse> {
  const { optionKeys, granularityMs, contextWindowMs } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();

  // Handle multiple option keys
  optionKeys.forEach((optionKey) => {
    queryParams.append('optionKeys', optionKey);
  });

  queryParams.append('granularityMs', granularityMs.toString());
  queryParams.append('contextWindowMs', contextWindowMs.toString());

  try {
    const response = await axios.get(`${config.baseUrl}/option-price-history`, {
      params: queryParams,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
      },
    });

    // The response is already in the correct format
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to get option price history: ${error.response?.status} ${error.response?.data || error.message}`
      );
    }
    throw error;
  }
}
