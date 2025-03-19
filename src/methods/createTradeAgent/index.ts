import axios from 'axios';
import { CreateTradeAgentRequest, CreateTradeAgentResponse } from './types.js';

/**
 * Create a new trade agent
 *
 * @param request - Configuration for the trade agent
 * @param config - API configuration
 * @returns Response containing the new agent's ID
 */
export async function createTradeAgent(
  params: CreateTradeAgentRequest,
  config: { apiKey: string; baseUrl: string }
): Promise<CreateTradeAgentResponse> {
  try {
    const response = await axios.post<CreateTradeAgentResponse>(`${config.baseUrl}/trade-agent/create`, params, {
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
        `Failed to create trade agent: ${axiosError.response?.status} ${axiosError.response?.data || axiosError.message}`
      );
    }
    throw error;
  }
}

// Export types
export * from './types.js';
