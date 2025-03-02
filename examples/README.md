# Grix SDK Examples

This directory contains example code demonstrating how to use the Grix SDK for various tasks.

## Available Examples

### 1. Generate Trading Signals

**File:** `generateTradingSignals.ts`

This example demonstrates how to use the SDK to:

- Initialize the Grix SDK
- Fetch option price history data
- Generate trading signals based on option price data
- Process and display the results

### 2. Script Monitor

**File:** `scriptMonitor.ts`

This example shows how to create a script that can be run as a scheduled task to:

- Fetch the latest option price data
- Analyze market conditions
- Generate trading signals
- Log detailed results
- Return a formatted response

## Running the Examples

To run these examples:

1. Make sure you have the required dependencies installed:

   ```bash
   pnpm install
   ```

2. Replace the placeholder API keys in the examples with your actual API keys:

   - `YOUR_GRIX_API_KEY` - Your Grix Protocol API key
   - `YOUR_OPENAI_API_KEY` - Your OpenAI API key

3. Run the example using ts-node:

   ```bash
   npx ts-node examples/generateTradingSignals.ts
   ```

   or

   ```bash
   npx ts-node examples/scriptMonitor.ts
   ```

## Modifying the Examples

These examples can be used as starting points for your own applications. Some ideas for modifications:

- Change the options lookup parameters to match your trading interests
- Adjust the budget and trading window parameters
- Customize the user prompt to focus on specific trading strategies
- Add additional data points like asset price history or market sentiment data
- Implement your own logic to process and filter the generated signals

## Learn More

For more information about the Grix SDK, check out:

- The main [README.md](../README.md) file
- The [API documentation](https://docs.grixprotocol.com)
- The [Grix Protocol website](https://grixprotocol.com)
