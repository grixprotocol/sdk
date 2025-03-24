import { GetTradingIndicatorsRequest, GrixSDK } from 'src/index.js';

export const getTradingIndicatorsMcp = async (
  grixSdkInstance: GrixSDK,
  args: GetTradingIndicatorsRequest
) => {
  console.log({ grixSdkInstance, args });

  const { exchange, symbol, interval } = args;

  if (!exchange || !symbol || !interval) {
    return {
      content: [{ type: 'text', text: 'Exchange, symbol, and interval are required parameters.' }],
    };
  }

  try {
    const response = await grixSdkInstance.getTradingIndicators(args);

    if (!response) {
      return {
        content: [
          {
            type: 'text',
            text: 'No trading indicators available for the specified parameters.',
          },
        ],
      };
    }

    const formattedOutput =
      `RSI:\n` +
      `  Value: ${response.rsi.value}\n\n` +
      `EMA:\n` +
      `  Value: ${response.ema.value}\n\n` +
      `MACD:\n` +
      `  MACD Value: ${response.macd.valueMACD}\n` +
      `  Signal Line: ${response.macd.valueMACDSignal}\n` +
      `  Histogram: ${response.macd.valueMACDHist}\n`;

    return {
      content: [
        {
          type: 'text',
          text: formattedOutput,
        },
      ],
    };
  } catch (error: unknown) {
    return {
      content: [
        {
          type: 'text',
          text: error instanceof Error ? error.message : 'Unknown error occurred',
        },
      ],
    };
  }
};
