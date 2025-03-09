import axios from 'axios';
import { TradeBoardGetParams, TradeBoardGetResponse } from './type';

/**
 * Get trade board data with filtering options
 * @param params - Parameters for filtering trade board
 * @param config - Configuration for API access
 * @returns Trade board data matching the filter criteria
 */
export async function getOptionsMarketBoard(
  params: TradeBoardGetParams,
  config: { apiKey: string; baseUrl: string }
): Promise<TradeBoardGetResponse> {
  const { asset, optionType, positionType } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('asset', asset);
  queryParams.append('optionType', optionType);
  queryParams.append('positionType', positionType);

  try {
    const response = await axios.get<TradeBoardGetResponse>(`${config.baseUrl}/elizatradeboard`, {
      params: queryParams,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 'unknown';
      const message = error.response?.data?.message || error.message;
      throw new Error(`Failed to get trade board: ${status} ${message}`);
    }
    throw error;
  }
}

export * from './type';
