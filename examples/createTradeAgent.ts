/**
 * Example: Using the Grix SDK to create a new trade agent
 *
 * This example demonstrates how to:
 * 1. Initialize the SDK
 * 2. Configure a new trade agent
 * 3. Create the agent and receive its ID
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

    // Configure new trade agent
    const createRequest = {
      ownerAddress: '09a5367C0b530A8q', // Example wallet address
      config: {
        agent_name: 'OS-E',
        is_simulation: true,
        signal_request_config: {
          budget_usd: '1000',
          assets: ['ETH', 'BTC'],
          context_window_ms: 604800000, // 1 week
          input_data: ['marketData', 'assetPrices'],
          protocols: ['derive', 'aevo', 'premia', 'moby', 'ithaca', 'zomma', 'deribit'],
          trade_window_ms: 2592000000, // 30 days
        },
      },
    };

    // Create the trade agent
    console.log('Creating new trade agent...');
    const result = await sdk.createTradeAgent(createRequest);

    // Process the result
    console.log(`Trade agent created successfully with ID: ${result.agentId}`);

    // Optional: Now request signals from the newly created agent
    console.log(`Requesting signals from new agent ID: ${result.agentId}...`);
    const signalRequest = {
      config: {
        ...createRequest.config.signal_request_config,
        user_prompt: 'Generate conservative trading strategies for a beginner',
      },
    };

    const signalResult = await sdk.requestTradeAgentSignals(Number(result.agentId), signalRequest);
    console.log(`Received ${signalResult.signals.length} trading signals from the new agent`);
  } catch (error) {
    console.error('Error creating trade agent:', error);
  }
}

// Run the example when this file is executed directly
main().catch(console.error);

// Export for testing or importing
export { main };
