export const signalSchemaMcp = {
  name: 'generateSignals',
  description: 'Generate trading signals based on user parameters',
  inputSchema: {
    type: 'object',
    properties: {
      budget: { type: 'string', default: '5000' },
      assets: {
        type: 'array',
        items: { type: 'string', enum: ['BTC', 'ETH'] },
        default: ['BTC'],
      },
      // protocols: {
      //   type: 'array',
      //   items: {
      //     type: 'string',
      //     enum: ['derive', 'aevo', 'premia', 'moby', 'ithaca', 'zomma', 'deribit'],
      //   },
      //   description:
      //     'List of protocols to generate signals for. If not provided, all protocols will be used.',
      // },
      userPrompt: {
        type: 'string',
        default:
          'As an experienced trader, analyze current market conditions and provide actionable trading signals. Consider market trends, volatility, and risk management. Focus on identifying high-probability setups with clear entry/exit points.',
      },
    },
  },
};
