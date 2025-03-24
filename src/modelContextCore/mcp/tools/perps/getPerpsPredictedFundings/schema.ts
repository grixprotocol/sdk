export const getPerpsPredictedFundingsSchemaMcp = {
  name: 'getPerpsPredictedFundings',
  description: 'Get predicted fundings for a given protocol',
  inputSchema: {
    type: 'object',
    properties: {
      protocol: {
        type: 'string',
        enum: ['hyperliquid'],
        default: 'hyperliquid',
        description: 'The protocol to get predicted fundings for',
      },
    },
    required: ['protocol'],
  },
};
