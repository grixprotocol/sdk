/**
 * Example: Using the Grix SDK to generate trading signals from options price data
 *
 * This example demonstrates how to:
 * 1. Initialize the SDK
 * 2. Fetch option price history data
 * 3. Generate trading signals based on that data
 * 4. Process and display the results
 */

import { GrixSDK } from '../src';

async function main() {
  try {
    console.log('Initializing Grix SDK...');
    const sdk = await GrixSDK.initialize({
      apiKey: 'YOUR_GRIX_API_KEY', // Replace with your actual API key
      openAIApiKey: 'YOUR_OPENAI_API_KEY', // Replace with your actual OpenAI API key
    });
    console.log('SDK initialized successfully');

    // Step 1: Fetch option price history data
    console.log('Fetching option price history data...');
    const optionPriceData = await sdk.getOptionPriceHistory({
      status: 'active',
      limit: 10, // Limiting to 10 options for the example
    });
    console.log(`Retrieved ${optionPriceData.results?.length || 0} option price records`);

    // Step 2: Generate trading signals using the data
    console.log('Generating trading signals...');
    const analysisResult = await sdk.generateTradingSignals({
      // Configure for trade analysis mode
      tradeConfig: {
        budget_usd: 10000, // Trading budget of $10,000
        trade_window_ms: 7 * 24 * 60 * 60 * 1000, // 1 week trading window
        user_prompt:
          'Generate conservative options trading strategies with defined risk parameters.',
      },
      // Provide the data points for analysis
      dataPoints: [
        {
          type: 'OPTIONS_PRICE_HISTORY',
          description: 'Active options with current price data',
          data: optionPriceData,
        },
      ],
    });

    // Step 3: Process and display the results
    console.log('Trading signal generation completed successfully');

    if (analysisResult.signals && analysisResult.signals.length > 0) {
      console.log(`Generated ${analysisResult.signals.length} trading signals:`);

      analysisResult.signals.forEach((signal, index) => {
        console.log(`\nSignal ${index + 1}:`);
        console.log(`Action: ${signal.action_type} a ${signal.position_type} position`);
        console.log(`Instrument: ${signal.instrument} (${signal.instrument_type})`);
        console.log(`Size: ${signal.size}`);
        console.log(`Expected Price: $${signal.expected_instrument_price_usd.toFixed(2)}`);
        console.log(`Total Cost: $${signal.expected_total_price_usd.toFixed(2)}`);
        console.log(`Reason: ${signal.reason}`);
      });

      // Calculate total allocation
      const totalAllocation = analysisResult.signals.reduce(
        (sum, signal) => sum + signal.expected_total_price_usd,
        0
      );

      console.log(`\nTotal allocated: $${totalAllocation.toFixed(2)} of $10,000 budget`);
    } else {
      console.log('No trading signals were generated.');
    }

    // Display metadata
    console.log('\nAnalysis metadata:');
    console.log(`Model used: ${analysisResult.metadata.model}`);
    console.log(`Timestamp: ${analysisResult.metadata.timestamp}`);
    console.log(`Data types processed: ${analysisResult.metadata.processedDataTypes.join(', ')}`);
  } catch (error) {
    console.error('Error in trading signal generation:', error);
  }
}

// Run the example when this file is executed directly
// In Node.js environments, this can be run with: ts-node generateTradingSignals.ts
main().catch(console.error);

// Export for testing or importing
export { main };
