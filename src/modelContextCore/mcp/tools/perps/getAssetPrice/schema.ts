export const perpsAssetPriceSchemaMcp = {
  name: 'getPerpsAssetPrice',
  description: 'Get perpetual (perps) trading asset price based on protocol and symbol',
  inputSchema: {
    type: 'object',
    properties: {
      protocol: {
        type: 'string',
        description: 'The protocol to get asset price for',
        default: 'hyperliquid',
        enum: ['hyperliquid'],
      },
      symbol: {
        type: 'string',
        description: 'The symbol to get asset price for',
        default: 'BTC-USDT',
      },
    },
    required: ['protocol', 'symbol'],
  },
};
