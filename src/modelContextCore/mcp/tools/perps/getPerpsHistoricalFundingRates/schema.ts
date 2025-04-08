export enum PerpsHistoricalFundingRateProtocol {
  HYPERLIQUID = 'hyperliquid',
  LODE = 'lode',
}

export const getPerpsHistoricalFundingRateSchemaMcp = {
  name: 'getPerpsHistoricalFundingRate',
  description: 'Get historical funding rates for a given pair',
  inputSchema: {
    type: 'object',
    properties: {
      protocol: {
        type: 'string',
        description: 'The protocol to get historical funding rates for',
        default: PerpsHistoricalFundingRateProtocol.HYPERLIQUID,
        enum: Object.values(PerpsHistoricalFundingRateProtocol),
      },
      symbol: { type: 'string', description: 'The symbol to get historical funding rates for' },
      daysBack: {
        type: 'number',
        description: 'The number of days back to get historical funding rates for',
        default: 7,
      },
    },
    required: ['protocol', 'symbol', 'daysBack'],
  },
};
