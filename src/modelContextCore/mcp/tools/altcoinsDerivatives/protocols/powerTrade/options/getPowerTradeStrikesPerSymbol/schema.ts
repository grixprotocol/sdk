export const getPowerTradeStrikesPerSymbolSchemaMcp = {
  name: 'getPowerTradeStrikesPerSymbol',
  description: 'Get power trade altcoins derivatives strikes per symbol',
  inputSchema: {
    type: 'object',
    properties: {
      symbol: { type: 'string', description: 'The symbol to get strikes for', example: 'BTC' },
    },
    required: ['symbol'],
  },
};
