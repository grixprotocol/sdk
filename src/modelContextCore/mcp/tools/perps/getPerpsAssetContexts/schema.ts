export const getPerpsAssetContextsSchemaMcp = {
  name: 'getPerpsAssetContexts',
  description: 'Get perpetual (perps) asset contexts for a given protocol and pair',
  inputSchema: {
    type: 'object',
    properties: {
      protocol: { type: 'string', description: 'The protocol to get asset contexts for' },
      pair: { type: 'string', description: 'The pair to get asset contexts for' },
    },
    required: ['protocol', 'pair'],
  },
};
