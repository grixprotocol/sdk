export const perpsNextFundingRateSchemaMcp = {
  name: 'getPerpsNextFundingRate',
  description: 'Get perps next funding rate based on protocol',
  inputSchema: {
    type: 'object',
    properties: {
      protocol: {
        type: 'string',
        description: 'The protocol to get next funding rate for',
        default: 'hyperliquid',
        enum: ['hyperliquid', 'lode'],
      },
    },
    required: ['protocol'],
  },
};
