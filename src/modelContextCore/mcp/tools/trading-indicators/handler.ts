import { GetTradingIndicatorsRequest, GrixSDK } from 'src/index.js';

export const getTradingIndicatorsMcp = async (
  grixSdkInstance: GrixSDK,
  args: GetTradingIndicatorsRequest
) => {
  const { exchange, symbol, interval } = args;

  if (!exchange || !symbol || !interval) {
    return {
      content: [{ type: 'text', text: 'Exchange, symbol, and interval are required parameters.' }],
    };
  }

  try {
    validateTradingIndicatorsArgs(args);
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

const validateTradingIndicatorsArgs = (args: GetTradingIndicatorsRequest) => {
  const { exchange, symbol, interval } = args;

  if (!exchange || !symbol || !interval) {
    throw new Error('Exchange, symbol, and interval are required parameters.');
  }

  // Validate symbol format
  const symbolRegex = /^[A-Z]+\/[A-Z]+$/;
  if (!symbolRegex.test(symbol)) {
    throw new Error(
      'Invalid symbol format. Symbol must be in uppercase COIN/MARKET format (e.g., BTC/USDT, LTC/BTC)'
    );
  }

  if (
    interval !== '1m' &&
    interval !== '5m' &&
    interval !== '15m' &&
    interval !== '30m' &&
    interval !== '1h' &&
    interval !== '2h' &&
    interval !== '4h' &&
    interval !== '12h' &&
    interval !== '1d' &&
    interval !== '1w'
  ) {
    throw new Error(
      'Invalid interval. Valid intervals are: 1m, 5m, 15m, 30m, 1h, 2h, 4h, 12h, 1d, 1w'
    );
  }

  if (
    exchange !== 'binance' &&
    exchange !== 'binancefutures' &&
    exchange !== 'bitstamp' &&
    exchange !== 'whitebit' &&
    exchange !== 'bybit' &&
    exchange !== 'gateio' &&
    exchange !== 'coinbase' &&
    exchange !== 'binanceus' &&
    exchange !== 'kraken'
  ) {
    throw new Error(
      'Invalid exchange. Valid exchanges are: binance, binancefutures, bitstamp, whitebit, bybit, gateio, coinbase, binanceus, kraken'
    );
  }
};
