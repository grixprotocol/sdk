import { OptionPriceHistoryGetParams, OptionPriceHistoryGetResponse } from './types.js';
import axios from 'axios';

/**
 * Get option price history data with various filtering options
 * @param params - Parameters for filtering option price history
 * @param config - Configuration for API access
 * @returns Option price history data matching the filter criteria
 */
export async function getOptionPriceHistory(
  params: OptionPriceHistoryGetParams,
  config: { apiKey: string; baseUrl: string }
): Promise<OptionPriceHistoryGetResponse> {
  try {
    const response = await axios.get<OptionPriceHistoryGetResponse>(`${config.baseUrl}/option-price-history`, {
      params,
      headers: {
        'x-api-key': config.apiKey,
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: { message?: string } }; message?: string };
      const status = axiosError.response?.status || 'unknown';
      const message = axiosError.response?.data?.message || axiosError.message;
      throw new Error(`Failed to get option price history: ${status} ${message}`);
    }
    throw error;
  }
}

// Re-export all types from the types file
export * from './types.js';
