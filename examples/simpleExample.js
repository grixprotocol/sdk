// This is a simple demonstration script that shows how the SDK would be used
// without actually connecting to any APIs

console.log('--- Grix SDK Usage Example ---');

console.log('\n1. Import and initialize the SDK:');
console.log(`
import { GrixSDK, UnderlyingAsset, TradeAnalysisParams } from '@grixprotocol/sdk';

const sdk = await GrixSDK.initialize({
  apiKey: 'your-api-key',
  openAIApiKey: 'your-openai-api-key'
});
`);

console.log('\n2. Fetch market data:');
console.log(`
// Get asset price history
const assetPriceHistory = await sdk.getAssetPriceHistory({
  assets: [UnderlyingAsset.BTC],
  granularityMs: 3600000, // 1 hour
  contextWindowMs: 7 * 24 * 60 * 60 * 1000 // 7 days
});

// Get option price history
const optionPriceHistory = await sdk.getOptionPriceHistory({
  optionkey: 'BTC-31JAN25-120000-C',
  limit: 168 // 7 days of hourly data
});
`);

console.log('\n3. Prepare data for analysis:');
console.log(`
const dataPoints = [
  {
    type: 'asset_price_history',
    description: 'BTC price history for the last 7 days',
    data: assetPriceHistory
  },
  {
    type: 'option_price_history',
    description: 'BTC-31JAN25-120000-C option price history',
    data: optionPriceHistory
  }
];

const params = {
  dataPoints,
  tradeConfig: {
    budget_usd: 1000,
    trade_window_ms: 7 * 24 * 60 * 60 * 1000, // 7 days
    user_prompt: 'I prefer strategies with limited downside risk.'
  }
};
`);

console.log('\n4. Generate trading signals:');
console.log(`
const result = await sdk.generateTradingSignals(params);

// Process the trading signals
if (result.signals) {
  console.log(\`Generated \${result.signals.length} trading signals\`);
  
  result.signals.forEach((signal, index) => {
    console.log(\`\nSignal \${index + 1}:\`);
    console.log(\`Action: \${signal.action_type} \${signal.position_type} position\`);
    console.log(\`Instrument: \${signal.instrument} (\${signal.instrument_type})\`);
    console.log(\`Size: \${signal.size}\`);
    console.log(\`Expected price: $\${signal.expected_instrument_price_usd.toFixed(2)}\`);
    console.log(\`Total cost: $\${signal.expected_total_price_usd.toFixed(2)}\`);
    console.log(\`Reason: \${signal.reason}\`);
  });
}
`);

console.log('\n--- End of Example ---');

// Expected output structure of the signals
console.log('\nExample signal structure:');
const exampleSignals = [
  {
    action_type: 'open',
    position_type: 'long',
    instrument: 'BTC-31JAN25-120000-C',
    instrument_type: 'option',
    target_position_id: null,
    size: 0.5,
    expected_instrument_price_usd: 1000.75,
    expected_total_price_usd: 500.38,
    reason: 'Bullish market outlook with strong momentum indicators. Max loss limited to premium paid.'
  },
  {
    action_type: 'open',
    position_type: 'long',
    instrument: 'BTC',
    instrument_type: 'asset',
    target_position_id: null,
    size: 0.0075,
    expected_instrument_price_usd: 67250.5,
    expected_total_price_usd: 504.38,
    reason: 'Accumulating BTC during healthy market pullback. RSI showing oversold conditions at 30.'
  }
];

console.log(JSON.stringify(exampleSignals, null, 2)); 