import axios from 'axios';
import { CreateTradeAgentRequest, CreateTradeAgentResponse } from './types';

/**
 * Create a new trade agent
 *
 * @param request - Configuration for the trade agent
 * @param config - API configuration
 * @returns Response containing the new agent's ID
 */
export async function createTradeAgent(
  request: CreateTradeAgentRequest,
  config: { apiKey: string; baseUrl: string }
): Promise<CreateTradeAgentResponse> {
  try {
    const url = `${config.baseUrl}/trade-agents`;

    const response = await axios.post<CreateTradeAgentResponse>(url, request, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Failed to create trade agent: ${error.response?.status} ${error.response?.data || error.message}`
      );
    }
    throw error;
  }
}

// Export types
export * from './types';
