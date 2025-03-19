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
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: unknown }; message?: string };
      throw new Error(
        `Failed to request trade agent signals: ${axiosError.response?.status} ${axiosError.response?.data || axiosError.message}`
      );
    }
    throw error;
  }
}

// Export types
export * from './types.js';
