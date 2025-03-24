export const getPerpsOpenInterestCapsSchemaMcp = {
  name: 'getPerpsOpenInterestCaps',
  description: 'Get open interest caps for a given protocol',
  inputSchema: {
    type: 'object',
    properties: {
      protocol: { type: 'string', description: 'The protocol to get open interest caps for' },
    },
    required: ['protocol'],
  },
};
