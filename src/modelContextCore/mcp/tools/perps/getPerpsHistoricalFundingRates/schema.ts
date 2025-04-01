export const getHistoricalFundingRateSchemaMcp = {
  name: 'getHistoricalFundingRate',
  description: 'Get historical funding rates for a given pair',
  inputSchema: {
    type: 'object',
    properties: {
      protocol: { type: 'string', description: 'The protocol to get historical funding rates for' },
      pair: { type: 'string', description: 'The pair to get historical funding rates for' },
      daysBack: {
        type: 'number',
        description: 'The number of days back to get historical funding rates for',
        default: 7,
      },
    },
    required: ['protocol', 'pair'],
  },
};
