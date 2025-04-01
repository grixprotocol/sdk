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
    console.error('Failed to create trade agent:', error);
    throw error;
  }
}

// Export types
export * from './types.js';
