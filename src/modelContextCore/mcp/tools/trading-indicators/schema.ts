export enum TradingIndicatorsExchange {
  BINANCE = 'binance',
  BINANCE_FUTURES = 'binancefutures',
  BITSTAMP = 'bitstamp',
  WHITEBIT = 'whitebit',
  BYBIT = 'bybit',
  GATE_IO = 'gateio',
  COINBASE = 'coinbase',
  BINANCE_US = 'binanceus',
  KRAKEN = 'kraken',
}

export enum TradingIndicatorsInterval {
  ONE_MINUTE = '1m',
  FIVE_MINUTES = '5m',
  FIFTEEN_MINUTES = '15m',
  THIRTY_MINUTES = '30m',
  ONE_HOUR = '1h',
  TWO_HOURS = '2h',
  FOUR_HOURS = '4h',
  TWELVE_HOURS = '12h',
  ONE_DAY = '1d',
  ONE_WEEK = '1w',
}

export const getTradingIndicatorsSchemaMcp = {
  name: 'getTradingIndicators',
  description:
    'Get trading indicators for a given symbol and exchange, such as RSI, EMA, MACD, and more',
  inputSchema: {
    type: 'object',
    properties: {
      exchange: {
        type: 'string',
        description: 'The exchange to get trading indicators for',
        enum: Object.values(TradingIndicatorsExchange),
        example: TradingIndicatorsExchange.BINANCE,
        default: TradingIndicatorsExchange.BINANCE,
      },
      symbol: {
        type: 'string',
        description:
          'The symbol to get trading indicators for. insert COIN/MARKET, For example: BTC/USDT',
        example: 'BTC/USDT',
        default: 'BTC/USDT',
      },
      interval: {
        type: 'string',
        description: 'The interval to get trading indicators for',
        enum: Object.values(TradingIndicatorsInterval),
        example: TradingIndicatorsInterval.ONE_HOUR,
        default: TradingIndicatorsInterval.ONE_HOUR,
      },
    },
    required: ['exchange', 'symbol', 'interval'],
  },
};
