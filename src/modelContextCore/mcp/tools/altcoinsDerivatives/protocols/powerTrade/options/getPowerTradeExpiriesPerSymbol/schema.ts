export const getPowerTradeExpiriesPerSymbolSchemaMcp = {
  name: 'getPowerTradeExpiriesPerSymbol',
  description: 'Get power trade altcoins derivatives expiries per symbol',
  inputSchema: {
    type: 'object',
    properties: {
      symbol: { type: 'string', description: 'The symbol to get expiries for', example: 'BTC' },
    },
    required: ['symbol'],
  },
};
