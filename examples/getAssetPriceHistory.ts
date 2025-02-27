import { GrixSDK } from '../src';
import { UnderlyingAsset } from '../src/globals';

async function main() {
  // Initialize the SDK
  const sdk = await GrixSDK.initialize({
    apiKey: 'YOUR_API_KEY',
    baseUrl: 'https://internal-api-dev.grix.finance',
  });

  try {
    // Get price history for BTC with daily granularity for the past week
    const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const oneWeek = 7 * oneDay; // 1 week in milliseconds

    const assetPriceHistory = await sdk.getAssetPriceHistory({
      asset: UnderlyingAsset.BTC,
      granularityMs: oneDay,
      contextWindowMs: oneWeek,
    });

    console.log('Asset Price History:');
    console.log(JSON.stringify(assetPriceHistory, null, 2));
  } catch (error) {
    console.error('Error fetching asset price history:', error);
  }
}

main();
