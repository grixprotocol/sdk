import axios from 'axios';
import { TradeBoardGetParams, TradeBoardGetResponse } from './type.js';

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
  try {
    const response = await axios.get<TradeBoardGetResponse>(`${config.baseUrl}/options-market-board`, {
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
      throw new Error(`Failed to get options market board: ${status} ${message}`);
    }
    throw error;
  }
}

export * from './type.js';
