export const getTradingIndicatorsSchemaMcp = {
  name: 'getTradingIndicators',
  description: 'Get trading indicators for a given protocol',
  inputSchema: {
    type: 'object',
    properties: {
      exchange: { type: 'string', description: 'The exchange to get trading indicators for' },
      symbol: { type: 'string', description: 'The symbol to get trading indicators for' },
      interval: { type: 'string', description: 'The interval to get trading indicators for' },
    },
    required: ['exchange', 'symbol', 'interval'],
  },
};
