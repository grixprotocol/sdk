import axios from 'axios';
import { TradeBoardData, TradeBoardGetParams } from './type.js';

/**
 * Get trade board data with filtering options
 * @param params - Parameters for filtering trade board
 * @param config - Configuration for API access
 * @returns Trade board data matching the filter criteria
 */
export async function getOptionsMarketBoard(
  params: TradeBoardGetParams,
  config: { apiKey: string; baseUrl: string }
): Promise<TradeBoardData[]> {
  const { asset, optionType, positionType } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('asset', asset);
  queryParams.append('optionType', optionType);
  queryParams.append('positionType', positionType);

  try {
    const response = await axios.get<TradeBoardData[]>(`${config.baseUrl}/elizatradeboard`, {
      params: queryParams,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to get trade board:', error);
    throw error;
  }
}

export * from './type.js';
