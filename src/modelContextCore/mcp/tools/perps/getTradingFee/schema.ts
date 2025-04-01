export const perpsTradingFeeSchemaMcp = {
  name: 'getPerpsTradingFee',
  description: 'Get perps trading fee based on protocol',
  inputSchema: {
    type: 'object',
    properties: {
      protocol: {
        type: 'string',
        description: 'The protocol to get trading fee for',
        default: 'lode',
        enum: ['lode'],
      },
    },
    required: ['protocol'],
  },
};
