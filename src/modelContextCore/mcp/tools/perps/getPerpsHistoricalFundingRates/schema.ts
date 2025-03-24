export const getHistoricalFundingRateSchemaMcp = {
  name: 'getHistoricalFundingRate',
  description: 'Get historical funding rates for a given pair',
  inputSchema: {
    type: 'object',
    properties: {
      protocol: { type: 'string', description: 'The protocol to get historical funding rates for' },
      pair: { type: 'string', description: 'The pair to get historical funding rates for' },
      startTime: {
        type: 'number',
        description: 'The start time to get historical funding rates for',
      },
      endTime: { type: 'number', description: 'The end time to get historical funding rates for' },
    },
    required: ['protocol', 'pair', 'startTime', 'endTime'],
  },
};
