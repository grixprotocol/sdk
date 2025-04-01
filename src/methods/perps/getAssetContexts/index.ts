import axios from 'axios';
import { GetAssetContextsRequest, GetAssetContextsResponse } from './types.js';

export async function getAssetContexts(
  params: GetAssetContextsRequest,
  config: { apiKey: string; baseUrl: string }
): Promise<GetAssetContextsResponse> {
  const { protocol, pair } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();

  if (protocol) {
    queryParams.append('protocol', protocol);
  }
  if (pair) {
    queryParams.append('pair', pair);
  }

  try {
    const response = await axios.get<GetAssetContextsResponse>(
      `${config.baseUrl}/perps/getAssetContexts`,
      {
        params: queryParams,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.apiKey,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Failed to get asset contexts:', error);
    throw error;
  }
}
