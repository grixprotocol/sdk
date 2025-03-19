import axios from 'axios';
import { GetPairsParams, GetPairsResponse } from './types.js';

export async function getPairs(
  params: GetPairsParams,
  config: { apiKey: string; baseUrl: string }
): Promise<GetPairsResponse> {
  try {
    const response = await axios.get<GetPairsResponse>(`${config.baseUrl}/perps/pairs`, {
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
        `Failed to get pairs: ${axiosError.response?.status} ${axiosError.response?.data || axiosError.message}`
      );
    }
    throw error;
  }
}

export * from './types.js';
