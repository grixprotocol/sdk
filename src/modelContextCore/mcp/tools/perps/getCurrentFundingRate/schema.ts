export enum PerpsCurrentFundingRateProtocol {
  HYPERLIQUID = 'hyperliquid',
}

export const perpsCurrentFundingRateSchemaMcp = {
  name: 'getPerpsCurrentFundingRate',
  description: 'Get perps current funding rate based on protocol and pair',
  inputSchema: {
    type: 'object',
    properties: {
      protocol: {
        type: 'string',
        description: 'The protocol to get current funding rate for',
        default: PerpsCurrentFundingRateProtocol.HYPERLIQUID,
        enum: Object.values(PerpsCurrentFundingRateProtocol),
      },
      pair: {
        type: 'string',
        description: 'The pair to get current funding rate for',
        default: 'BTC-USD',
      },
    },
    required: ['protocol', 'pair'],
  },
};
