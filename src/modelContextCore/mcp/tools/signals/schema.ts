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
      userPrompt: {
        type: 'string',
        default: 'Generate moderate growth strategies',
      },
    },
  },
};
