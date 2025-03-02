import { GrixSDK, TradeAnalysisParams, MarketDataInput } from '../src';
import { UnderlyingAsset } from '../src/globals';

async function generateTradingSignals() {
  // Initialize the SDK
  const sdk = await GrixSDK.initialize({
    apiKey: 'your-api-key',
    openAIApiKey: 'your-openai-api-key',
  });

  try {
    // Step 1: Get asset price history
    const assetPriceHistory = await sdk.getAssetPriceHistory({
      assets: [UnderlyingAsset.BTC],
      granularityMs: 3600000, // 1 hour
      contextWindowMs: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Step 2: Get option price history
    const optionPriceHistory = await sdk.getOptionPriceHistory({
      optionkey: 'BTC-31JAN25-120000-C',
      limit: 168, // 7 days of hourly data
    });

    // Step 3: Create market data inputs
    const dataPoints: MarketDataInput[] = [
      {
        type: 'asset_price_history',
        description: 'BTC price history for the last 7 days with 1-hour intervals',
        data: assetPriceHistory,
      },
      {
        type: 'option_price_history',
        description: 'BTC-31JAN25-120000-C option price history',
        data: optionPriceHistory,
      },
    ];

    // Step 4: Create trade analysis parameters
    const params: TradeAnalysisParams = {
      dataPoints,
      tradeConfig: {
        budget_usd: 1000,
        trade_window_ms: 7 * 24 * 60 * 60 * 1000, // 7 days
        user_prompt:
          'I prefer strategies with limited downside risk. Please consider both long and short positions.',
      },
    };

    // Step 5: Generate trading signals
    const result = await sdk.generateTradingSignals(params);

    // Step 6: Display the generated signals
    console.log('Trading Signals:');
    if (result.signals && result.signals.length > 0) {
      result.signals.forEach((signal, index) => {
        console.log(`\nSignal ${index + 1}:`);
        console.log(`Action: ${signal.action_type} ${signal.position_type} position`);
        console.log(`Instrument: ${signal.instrument} (${signal.instrument_type})`);
        console.log(`Size: ${signal.size}`);
        console.log(`Expected price: $${signal.expected_instrument_price_usd.toFixed(2)}`);
        console.log(`Total cost: $${signal.expected_total_price_usd.toFixed(2)}`);
        console.log(`Reason: ${signal.reason}`);
      });
    } else {
      console.log('No trading signals generated.');
    }

    console.log('\nMetadata:');
    console.log(`Model used: ${result.metadata.model}`);
    console.log(`Timestamp: ${result.metadata.timestamp}`);
    console.log(`Processed data types: ${result.metadata.processedDataTypes.join(', ')}`);
  } catch (error) {
    console.error('Error generating trading signals:', error);
  }
}

// Run the example
generateTradingSignals().catch(console.error);
