import { TradableEntitiesGetResponse, TradableEntitiesApiResponse } from './types.js';
import axios from 'axios';

export async function getTradableEntities(config: {
  apiKey: string;
  baseUrl: string;
}): Promise<TradableEntitiesGetResponse> {
  try {
    const response = await axios.get<TradableEntitiesApiResponse>(
      `${config.baseUrl}/powerTrade/getTradableEntities`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.apiKey,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to get tradable entities: ${error}`);
  }
}
