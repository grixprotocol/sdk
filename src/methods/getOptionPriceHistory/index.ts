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
  // Build query parameters
  const queryParams = new URLSearchParams();

  // Add all parameters to query string if they exist
  if (params.optionkey) {
    queryParams.append('optionkey', params.optionkey);
  }

  if (params.underlyingAsset) {
    queryParams.append('underlying_asset', params.underlyingAsset);
  }

  if (params.status) {
    queryParams.append('status', params.status);
  }

  if (params.strikeMin !== undefined) {
    queryParams.append('strikeMin', params.strikeMin.toString());
  }

  if (params.strikeMax !== undefined) {
    queryParams.append('strikeMax', params.strikeMax.toString());
  }

  if (params.optionType) {
    queryParams.append('option_type', params.optionType);
  }

  if (params.expiryMin !== undefined) {
    queryParams.append('expiryMin', params.expiryMin.toString());
  }

  if (params.expiryMax !== undefined) {
    queryParams.append('expiryMax', params.expiryMax.toString());
  }

  // Pagination parameters
  if (params.limit !== undefined) {
    queryParams.append('limit', params.limit.toString());
  }

  if (params.offset !== undefined) {
    queryParams.append('offset', params.offset.toString());
  }

  try {
    const response = await axios.get<OptionPriceHistoryGetResponse>(
      `${config.baseUrl}/option-price-history`,
      {
        params: queryParams,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.apiKey,
        },
      }
    );

    // Return the response data which should match OptionPriceHistoryGetResponse
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 'unknown';
      const message = error.response?.data?.message || error.message;
      throw new Error(`Failed to get option price history: ${status} ${message}`);
    }
    throw error;
  }
}

// Re-export all types from the types file
export * from './types.js';
