import { GrixSDK } from 'src/index.js';

export const getSignalsDataMcp = async (
  grixSdkInstance: GrixSDK,
  args: Record<string, unknown>
) => {
  try {
    const budget = (args?.budget as string) || '5000';
    const assets = (args?.assets as string[]) || ['BTC'];
    const userPrompt = (args?.userPrompt as string) || 'Generate moderate growth strategies';
    const allProtocols = ['derive', 'aevo', 'premia', 'moby', 'ithaca', 'zomma', 'deribit'];
    const protocols = (args?.protocols as string[]) || allProtocols;

    console.error(
      `Generating trading signals with budget: $${budget}, assets: ${assets.join(', ')}, protocols: ${protocols.join(', ')}`
    );

    // Create a trade agent and get signals
    const agentId = await grixSdkInstance.createTradeAgent({
      ownerAddress: 'MCP',
      config: {
        agent_name: 'GRIX-MCP',
        is_simulation: true,
        signal_request_config: {
          budget_usd: budget,
          assets: assets,
          context_window_ms: 1200000, // 20 minutes
          input_data: ['marketData', 'assetPrices'],
          protocols: protocols,
          trade_window_ms: 7 * 24 * 60 * 60 * 1000, // 7 days
        },
      },
    });

    // Request signals
    await grixSdkInstance.requestTradeAgentSignals(Number(agentId.agentId), {
      config: {
        budget_usd: budget,
        assets: assets,
        trade_window_ms: 7 * 24 * 60 * 60 * 1000,
        context_window_ms: 1200000,
        input_data: ['marketData', 'assetPrices'],
        protocols: protocols,
        user_prompt: userPrompt,
      },
    });

    // Wait for signals with retry logic
    let retries = 0;
    const maxRetries = 12;
    const retryDelay = 4000; // 2 seconds

    while (retries < maxRetries) {
      const result = await grixSdkInstance.getTradeSignals({ agentId: agentId.agentId });
      const signalRequest = result.personalAgents[0]?.signal_requests[0];

      if (signalRequest?.progress === 'completed' && signalRequest?.signals?.length > 0) {
        console.error('✅ Signals generated successfully');

        const formattedOutput = signalRequest.signals
          .map(
            (s, index) =>
              `Signal ${index + 1}:\n` +
              `  Action: ${s.signal.action_type}\n` +
              `  Position: ${s.signal.position_type}\n` +
              `  Instrument: ${s.signal.instrument}\n` +
              `  Type: ${s.signal.instrument_type}\n` +
              `  Size: ${s.signal.size}\n` +
              `  Expected Price: $${s.signal.expected_instrument_price_usd}\n` +
              `  Total Price: $${s.signal.expected_total_price_usd}\n` +
              `  Reason: ${s.signal.reason}\n` +
              `  Created: ${new Date(s.created_at).toLocaleString()}\n`
          )
          .join('\n');

        return {
          content: [
            {
              type: 'text',
              text: formattedOutput,
            },
          ],
        };
      }

      console.error(`⏳ Waiting for signals... (attempt ${retries + 1}/${maxRetries})`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      retries++;
    }

    return {
      content: [
        {
          type: 'text',
          text: 'Timeout waiting for signals after 10 attempts',
        },
      ],
    };
  } catch (error: unknown) {
    console.error('Error generating signals:', error, 'Args:', args);
    return {
      content: [
        {
          type: 'text',
          text:
            error instanceof Error
              ? `Error generating signals: ${error.message}. Args: ${JSON.stringify(args)}`
              : `Unknown error occurred while generating signals. Args: ${JSON.stringify(args)}`,
        },
      ],
    };
  }
};
