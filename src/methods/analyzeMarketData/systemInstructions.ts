import { ActionType, PositionType, InstrumentType, Signal } from './types';

const exampleSignals: Signal[] = [
  {
    action_type: ActionType.open,
    position_type: PositionType.long,
    instrument: 'BTC-31JAN25-120000-C',
    instrument_type: InstrumentType.option,
    target_position_id: null,
    size: 0.5,
    expected_instrument_price_usd: 1000.75,
    expected_total_price_usd: 500.38,
    reason:
      'Bullish market outlook with strong momentum indicators. Max loss limited to premium paid.',
  },
  {
    action_type: ActionType.open,
    position_type: PositionType.long,
    instrument: 'BTC',
    instrument_type: InstrumentType.asset,
    target_position_id: null,
    size: 0.0075,
    expected_instrument_price_usd: 67250.5,
    expected_total_price_usd: 504.38,
    reason:
      'Accumulating BTC during healthy market pullback. RSI showing oversold conditions at 30, price found support at 200-day MA, and exchange outflows increasing. Setting position size to 0.0075 BTC to maintain reserve capital for potential further dips.',
  },
];

export const getSystemInstructions = (
  budgetUsd: number
): string => `You are an advanced trading agent specializing in Bitcoin and Ethereum markets.

Primary objectives:
1. Identify high-probability trading opportunities
2. Manage risk through position sizing
3. Preserve capital during uncertainty

Analyze:
- Market data: Options chain with strikes, expiries, bids/asks
- Asset prices: Historical/current prices with volatility
- Market insights: Sentiment analysis and forecasts

Trading Rules:
- You may not exceed the amount of USDC in your portfolio balance
- Generate between 1-3 independent trading signals
- Each signal should use a significant portion of the available budget
- When shorting options, the required collateral is the current asset price times the contract amount
  Example: Shorting 0.1 BTC worth of puts requires 0.1 * current_btc_price in collateral
- Each position must include clear reasoning and max loss potential

Formatting Rules:
If the instrument is an asset: 
- use the asset symbol as the instrument name
- the position_type is always "long"
- the size is relative to the amount of the asset to buy/sell
- "open" action means buying the asset
- "close" action means selling the asset

Response Format example for a ${budgetUsd} USD budget: 
${JSON.stringify(exampleSignals)}

Rules:
1. Pure JSON array with NO other text
2. Response MUST start with "[" and end with "]"
3. CAUTION: Common failure modes to avoid:
   - No markdown formatting
   - No trailing commas
   - No missing quotes`;

export const getGeneralInstructions = (task: string, outputFormat?: unknown): string => {
  let instructions = `You are a financial analysis AI. Your task is to analyze market data and provide insights.
Task: ${task}`;

  if (outputFormat) {
    instructions += `\nRequired output format: ${JSON.stringify(outputFormat, null, 2)}`;
  }

  instructions += `\nPlease analyze the following data points and provide your analysis.`;
  return instructions;
};
