export enum PriceInferenceToken {
  BTC = 'BTC',
  ETH = 'ETH',
  SOL = 'SOL',
  BNB = 'BNB',
  ARB = 'ARB',
}

export enum PriceInferenceTimeframe {
  FIVE_MIN = '5m',
  EIGHT_HOURS = '8h',
}

export const getAssetPricePredictionsSchemaMcp = {
  name: 'getAssetPricePredictions',
  description: 'Get asset price predictions from Allora Network',
  inputSchema: {
    type: 'object',
    properties: {
      asset: {
        type: 'string',
        enum: Object.values(PriceInferenceToken),
        description: 'The asset to get the price prediction for',
        default: PriceInferenceToken.BTC,
      },
      timeframe: {
        type: 'string',
        enum: Object.values(PriceInferenceTimeframe),
        description: 'The timeframe to get the price prediction for',
        default: PriceInferenceTimeframe.EIGHT_HOURS,
      },
    },
    required: ['asset', 'timeframe'],
  },
};
