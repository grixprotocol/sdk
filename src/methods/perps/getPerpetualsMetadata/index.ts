import axios from 'axios';
import { GetPerpetualsMetadataRequest, GetPerpetualsMetadataResponse } from './types.js';

export async function getPerpetualsMetadata(
  params: GetPerpetualsMetadataRequest,
  config: { apiKey: string; baseUrl: string }
): Promise<GetPerpetualsMetadataResponse> {
  const { protocol } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();

  queryParams.append('protocol', protocol);

  try {
    const response = await axios.get<GetPerpetualsMetadataResponse>(
      `${config.baseUrl}/perps/getMetadata`,
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
    console.error('Failed to get perpetuals metadata:', error);
    throw error;
  }
}
