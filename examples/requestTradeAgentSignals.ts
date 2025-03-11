/**
 * Example: Using the Grix SDK to request trading signals from a trade agent
 *
 * This example demonstrates how to:
 * 1. Initialize the SDK
 * 2. Configure a trade agent signal request
 * 3. Request signals from a specific trade agent
 * 4. Process and display the results
 */

import { GrixSDK } from '../src';

async function main() {
  try {
    console.log('Initializing Grix SDK...');
    const sdk = await GrixSDK.initialize({
      apiKey: 'YOUR_GRIX_API_KEY', // Replace with your actual API key
    });
    console.log('SDK initialized successfully');

    // Configure trade agent request
    const tradeAgentId = 28; // Example agent ID
    const signalRequest = {
      config: {
        budget_usd: '1000',
        assets: ['ETH', 'BTC'],
        context_window_ms: 604800000, // 1 week
        input_data: ['marketData', 'assetPrices'],
        protocols: ['derive', 'aevo', 'premia', 'moby', 'ithaca', 'zomma', 'deribit'],
        trade_window_ms: 2592000000, // 30 days
        user_prompt: 'Generate conservative trading strategies',
      },
    };

    // Request signals from the trade agent
    console.log(`Requesting signals from trade agent ID: ${tradeAgentId}...`);
    const result = await sdk.requestTradeAgentSignals(tradeAgentId, signalRequest);

    // Process the results
    console.log('Trade agent signal request completed successfully');

    if (result.signals && result.signals.length > 0) {
      console.log(`Received ${result.signals.length} trading signals:`);

      result.signals.forEach((signal, index) => {
        console.log(`\nSignal ${index + 1}:`);
        console.log(`Action: ${signal.action_type} a ${signal.position_type} position`);
        console.log(`Instrument: ${signal.instrument} (${signal.instrument_type})`);
        console.log(`Size: ${signal.size}`);
        console.log(`Expected Price: $${signal.expected_instrument_price_usd.toFixed(2)}`);
        console.log(`Total Cost: $${signal.expected_total_price_usd.toFixed(2)}`);
        console.log(`Reason: ${signal.reason}`);
      });

      // Calculate total allocation
      const totalAllocation = result.signals.reduce(
        (sum, signal) => sum + signal.expected_total_price_usd,
        0
      );

      console.log(`\nTotal allocated: $${totalAllocation.toFixed(2)} of $1,000 budget`);
    } else {
      console.log('No trading signals were returned.');
    }

    // Display metadata
    console.log('\nTrade agent metadata:');
    console.log(`Trade Agent ID: ${result.metadata.tradeAgentId}`);
    console.log(`Timestamp: ${result.metadata.timestamp}`);
    console.log(`Data types processed: ${result.metadata.processedDataTypes.join(', ')}`);
  } catch (error) {
    console.error('Error in trade agent signal request:', error);
  }
}

// Run the example when this file is executed directly
main().catch(console.error);

// Export for testing or importing
export { main };
