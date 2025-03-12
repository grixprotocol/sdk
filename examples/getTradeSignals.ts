/**
 * Example: Using the Grix SDK to get historical trade signals
 */

import { GrixSDK } from '../src';

async function main() {
  try {
    console.log('Initializing Grix SDK...');
    const sdk = await GrixSDK.initialize({
      apiKey: 'YOUR_GRIX_API_KEY',
    });

    // Get signals by agent ID
    const signalsById = await sdk.getTradeSignals({
      agentId: '45',
    });
    console.log({ signalsById });

    // Get signals by wallet address
    const signalsByWallet = await sdk.getTradeSignals({
      address: '0xxxxxxxxxxx',
    });
    console.log({ signalsByWallet });
  } catch (error) {
    console.error('Error getting trade signals:', error);
  }
}

main().catch(console.error);
