export const perpsPairsSchemaMcp = {
  name: 'getPerpsPairs',
  description: 'Get perpetual (perps) trading pairs based on protocol and base asset',
  inputSchema: {
    type: 'object',
    properties: {
      protocol: {
        type: 'string',
        description: 'The protocol to get pairs for',
        default: 'hyperliquid',
        enum: ['hyperliquid', 'lode'],
      },
      baseAsset: {
        type: 'string',
        description: 'The base asset to get pairs for',
      },
    },
    required: ['protocol'],
  },
};
