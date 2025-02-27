import { OptionPriceGetParams, OptionPriceGetResponse } from './types';

export async function getOptionPrice(
  params: OptionPriceGetParams,
  config: { apiKey: string; baseUrl: string }
): Promise<OptionPriceGetResponse> {
  const { optionKey, positionType } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();
  queryParams.append('optionKey', optionKey);
  if (positionType) {
    queryParams.append('positionType', positionType);
  }

  const response = await fetch(`${config.baseUrl}/option-price?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to get option price: ${response.status} ${errorText}`);
  }

  return await response.json();
}
