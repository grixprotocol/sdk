import axios from 'axios';
import { TradeAgentSignalRequest, TradeAgentSignalResponse } from './types.js';

/**
 * Request trading signals from a trade agent
 *
 * @param tradeAgentId - ID of the trade agent to request signals from
 * @param requestData - Configuration for the signal request
 * @param config - API configuration
 * @returns Trading signals and metadata
 */
export async function requestTradeAgentSignals(
  tradeAgentId: number,
  requestData: TradeAgentSignalRequest,
  config: { apiKey: string; baseUrl?: string }
): Promise<TradeAgentSignalResponse> {
  try {
    const baseUrl = config.baseUrl;
    const url = `${baseUrl}/trade-agents/${tradeAgentId}/signals/request`;
    console.log('url-log', url);

    const response = await axios.post<TradeAgentSignalResponse>(url, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to request trade agent signals: ${error.response?.status} ${error.response?.data || error.message}`
      );
    }
    throw error;
  }
}

// Export types
export * from './types.js';
