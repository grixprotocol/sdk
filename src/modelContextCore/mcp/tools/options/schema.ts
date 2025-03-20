export const optionSchemaMcp = {
  name: 'options',
  description: 'Get options data from Grix',
  inputSchema: {
    type: 'object',
    properties: {
      asset: { type: 'string', enum: ['BTC', 'ETH'], default: 'BTC' },
      optionType: { type: 'string', enum: ['call', 'put'], default: 'call' },
      positionType: { type: 'string', enum: ['long', 'short'], default: 'long' },
    },
  },
};
