import axios from 'axios';
import { GetTradeSignalsParams, GetTradeSignalsResponse } from './types';

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
    // Build query parameters
    const queryParams = new URLSearchParams();
    if (params.agentId) {
      queryParams.append('agentId', params.agentId);
    }
    if (params.address) {
      queryParams.append('address', params.address);
    }

    const url = `${config.baseUrl}/trade-agents?${queryParams.toString()}`;
    console.log({ url: url });

    const response = await axios.get<GetTradeSignalsResponse>(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to get trade signals: ${error.response?.status} ${error.response?.data || error.message}`
      );
    }
    throw error;
  }
}

// Export types
export * from './types';
