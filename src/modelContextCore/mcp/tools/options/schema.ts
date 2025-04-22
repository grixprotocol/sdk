export const optionSchemaMcp = {
  name: 'getDefiOptions',
  description: 'Get options data from Grix',
  inputSchema: {
    type: 'object',
    properties: {
      asset: { type: 'string', enum: ['BTC', 'ETH'], default: 'BTC' },
      optionType: { type: 'string', enum: ['call', 'put'], default: 'call' },
      positionType: { type: 'string', enum: ['long', 'short'], default: 'long' },
      limit: { type: 'number', default: 40, minimum: 1, maximum: 100 },
      offset: { type: 'number', default: 0, minimum: 0 },
    },
    required: ['asset', 'optionType', 'positionType', 'limit', 'offset'],
  },
};
