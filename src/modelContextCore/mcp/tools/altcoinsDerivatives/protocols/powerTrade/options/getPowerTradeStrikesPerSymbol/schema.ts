export const getAltcoinsOptionsStrikesPerSymbolSchemaMcp = {
  name: 'getAltcoinsOptionsStrikesPerSymbol',
  description: 'Get altcoins options strikes per symbol',
  inputSchema: {
    type: 'object',
    properties: {
      symbol: { type: 'string', description: 'The symbol to get strikes for', example: 'BTC' },
    },
    required: ['symbol'],
  },
};
