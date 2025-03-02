# Grix Protocol SDK

A TypeScript SDK for interacting with the Grix Protocol.

## Grix SDK

This SDK provides a set of utility functions to interact with Grix Finance APIs and perform market data analysis.

### Installation

```bash
pnpm add grix-sdk
```

### Usage

```typescript
import { GrixSDK } from 'grix-sdk';

const run = async () => {
  // Initialize SDK with API keys
  const sdk = await GrixSDK.initialize({
    apiKey: 'your-grix-api-key',
    openAIApiKey: 'your-openai-api-key', // Required for AI analysis features
  });

  // Use SDK methods
  const btcPrice = await sdk.fetchAssetPrice('BTC');
  console.log(`BTC price: ${btcPrice}`);
};

run().catch(console.error);
```

### SDK Methods

#### Asset and Option Price Methods

- `fetchAssetPrice(asset: string): Promise<number>`

  - Fetches the current price of a specified asset

- `getOptionPrice(params: OptionPriceGetParams): Promise<OptionPriceGetResponse>`

  - Retrieves current price information for options matching specified parameters

- `getAssetPriceHistory(params: AssetPriceHistoryGetParams): Promise<AssetPriceHistoryGetResponse>`

  - Retrieves historical price data for specified assets

- `getOptionPriceHistory(params: OptionPriceHistoryGetParams): Promise<OptionPriceHistoryGetResponse>`
  - Retrieves historical option price data

#### Chatbot Methods

- `chatBotGetContext(params: ChatBotGetContextParams): Promise<ChatBotGetContextResponse>`

  - Retrieves context information for the chatbot

- `sendChatbotRequest(params: SendChatbotRequestParams): Promise<string>`
  - Sends a request to the chatbot and returns the response

#### Market Analysis Methods

- `generateTradingSignals(params: AIAnalysisParams): Promise<AIAnalysisResponse>`

  - Analyzes market data using AI to generate insights or trading signals
  - Supports two modes:
    - Trade signal generation: generates specific trading signals with proper risk management
    - General analysis: for market insights and custom analysis

- `analyzeMarketData(params: AIAnalysisParams): Promise<AIAnalysisResponse>` (deprecated)
  - Alias for generateTradingSignals, maintained for backward compatibility

### Examples

#### Generating Trading Signals

```typescript
import { GrixSDK, TradeAnalysisParams, UnderlyingAsset } from 'grix-sdk';

async function generateTradingSignals() {
  // Initialize the SDK
  const sdk = await GrixSDK.initialize({
    apiKey: 'your-api-key',
    openAIApiKey: 'your-openai-api-key',
  });

  // Get asset price history
  const assetPriceHistory = await sdk.getAssetPriceHistory({
    assets: [UnderlyingAsset.BTC],
    granularityMs: 3600000, // 1 hour
    contextWindowMs: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // Get option price history
  const optionPriceHistory = await sdk.getOptionPriceHistory({
    optionkey: 'BTC-31JAN25-120000-C',
    limit: 168, // 7 days of hourly data
  });

  // Prepare data points for analysis
  const dataPoints = [
    {
      type: 'asset_price_history',
      description: 'BTC price history for the last 7 days',
      data: assetPriceHistory,
    },
    {
      type: 'option_price_history',
      description: 'BTC-31JAN25-120000-C option price history',
      data: optionPriceHistory,
    },
  ];

  // Create trade analysis parameters
  const params = {
    dataPoints,
    tradeConfig: {
      budget_usd: 1000,
      trade_window_ms: 7 * 24 * 60 * 60 * 1000, // 7 days
      user_prompt: 'I prefer strategies with limited downside risk.',
    },
  };

  // Generate trading signals
  const result = await sdk.generateTradingSignals(params);

  // Process the results
  if (result.signals) {
    console.log(`Generated ${result.signals.length} trading signals`);
    // Process signals...
  }
}
```

For more examples, see the `/examples` directory.
