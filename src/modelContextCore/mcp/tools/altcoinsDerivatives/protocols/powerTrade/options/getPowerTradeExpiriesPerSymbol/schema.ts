export const getAltcoinsOptionsExpiriesPerSymbolSchemaMcp = {
  name: 'getAltcoinsOptionsExpiriesPerSymbol',
  description: 'Get altcoins options expiries per symbol',
  inputSchema: {
    type: 'object',
    properties: {
      symbol: { type: 'string', description: 'The symbol to get expiries for', example: 'BTC' },
    },
    required: ['symbol'],
  },
};
