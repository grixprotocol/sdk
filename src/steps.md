# Trade Agent Integration Guide

This guide explains how to integrate and use trade agents in your application using the Grix SDK.

## Prerequisites

1. Install the Grix SDK
2. Have a valid API key
3. Initialize the SDK
   typescript
   const sdk = await GrixSDK.initialize({
   apiKey: 'YOUR_GRIX_API_KEY'
   });

## Step 1: Create a Trade Agent

Before requesting signals, you must create a trade agent. This is a one-time setup process.
typescript
const createRequest = {
ownerAddress: "YOUR_WALLET_ADDRESS",
config: {
agent_name: "MY_TRADING_BOT",
is_simulation: true,
signal_request_config: {
budget_usd: "1000",
assets: ["ETH", "BTC"],
context_window_ms: 604800000, // 1 week
input_data: ["marketData", "assetPrices"],
protocols: ["derive", "aevo", "premia", "moby"],
trade_window_ms: 2592000000, // 30 days
}
}
};
const agent = await sdk.createTradeAgent(createRequest);
console.log(Agent created with ID: ${agent.agentId});

## Step 2: Request Trading Signals

Once you have an agent ID, you can request trading signals:
ypescript
const signalRequest = {
config: {
budget_usd: "1000",
assets: ["ETH", "BTC"],
context_window_ms: 604800000,
input_data: ["marketData", "assetPrices"],
protocols: ["derive", "aevo", "premia", "moby"],
trade_window_ms: 2592000000,
user_prompt: "Generate conservative trading strategies" // Optional
}
};
const signals = await sdk.requestTradeAgentSignals(Number(agent.agentId), signalRequest);

## Configuration Options

### Trade Agent Config

| Parameter             | Type    | Description                               |
| --------------------- | ------- | ----------------------------------------- |
| agent_name            | string  | Name of your trading agent                |
| is_simulation         | boolean | Whether this is a simulation agent        |
| signal_request_config | object  | Default configuration for signal requests |

### Signal Request Config

| Parameter         | Type     | Description                                     |
| ----------------- | -------- | ----------------------------------------------- |
| budget_usd        | string   | Trading budget in USD                           |
| assets            | string[] | Array of assets to trade (e.g., ["ETH", "BTC"]) |
| context_window_ms | number   | Historical data window in milliseconds          |
| input_data        | string[] | Types of data to analyze                        |
| protocols         | string[] | Trading protocols to consider                   |
| trade_window_ms   | number   | Future trading window in milliseconds           |
| user_prompt       | string?  | Optional custom instructions                    |

## Complete Example

Here's a complete example showing both steps together:
typescript
import { GrixSDK } from '@grixprotocol/sdk';
async function main() {
// Initialize SDK
const sdk = await GrixSDK.initialize({
apiKey: 'YOUR_GRIX_API_KEY'
});
try {
// Step 1: Create agent
const createRequest = {
ownerAddress: "0x16B9a5367C0b530A8e838C2c8bafa2F2908F784C",
config: {
agent_name: "OS-E",
is_simulation: true,
signal_request_config: {
budget_usd: "1000",
assets: ["ETH", "BTC"],
context_window_ms: 604800000,
input_data: ["marketData", "assetPrices"],
protocols: ["derive", "aevo", "premia", "moby"],
trade_window_ms: 2592000000
}
}
};
const agent = await sdk.createTradeAgent(createRequest);
console.log(Created agent with ID: ${agent.agentId});
// Step 2: Request signals
const signalRequest = {
config: {
...createRequest.config.signal_request_config,
user_prompt: "Generate conservative trading strategies"
}
};
const signals = await sdk.requestTradeAgentSignals(
Number(agent.agentId),
signalRequest
);
// Process the signals
console.log(Received ${signals.signals.length} trading signals:);
signals.signals.forEach((signal, index) => {
console.log(\nSignal ${index + 1}:);
console.log(Action: ${signal.action_type} ${signal.position_type});
console.log(Instrument: ${signal.instrument});
console.log(Expected Price: $${signal.expected_instrument_price_usd});
console.log(Reason: ${signal.reason});
});
} catch (error) {
console.error('Error:', error);
}
}
needed

## Common Issues

## Best Practices

1. **Store Agent IDs**: Save the agent ID after creation for future use
2. **Error Handling**: Always implement proper error handling
3. **Validation**: Validate signal responses before acting on them
4. **User Prompts**: Use clear and specific user prompts for better results
5. **Budget Management**: Keep track of allocated budgets across signals

## Common Issues

- Ensure the API key has sufficient permissions
- Verify the agent ID is correct when requesting signals
- Check that all required fields are provided in configurations
- Monitor rate limits and implement appropriate delays if needed
