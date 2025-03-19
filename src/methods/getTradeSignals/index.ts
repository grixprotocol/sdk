import axios from 'axios';
import { GetTradeSignalsParams, GetTradeSignalsResponse } from './types.js';

/**
 * Get trade signals by agent ID or wallet address
 *
 * @param params - Query parameters (agentId or address)
 * @param config - API configuration
 * @returns List of personal and public trade agents with their signals
 */
export async function getTradeSignals(
  params: GetTradeSignalsParams,
  config: { apiKey: string; baseUrl: string }
): Promise<GetTradeSignalsResponse> {
  try {
    const response = await axios.get<GetTradeSignalsResponse>(`${config.baseUrl}/trade-signals`, {
      params,
      headers: {
        'x-api-key': config.apiKey,
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: unknown }; message?: string };
      throw new Error(
        `Failed to get trade signals: ${axiosError.response?.status} ${axiosError.response?.data || axiosError.message}`
      );
    }
    throw error;
  }
}

// Export types
export * from './types.js';
