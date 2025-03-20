import { ElizaAction } from '../../types/index.js';

const examples = [
  [
    {
      user: '{{user1}}',
      content: {
        text: 'Show me Bitcoin call options',
      },
    },
    {
      user: '{{agent}}',
      content: {
        text: "I'll check the current Bitcoin call options for you.",
        action: 'GET_OPTION_PRICE',
      },
    },
    {
      user: '{{agent}}',
      content: {
        text: `Available Options:

Expiry: 2023-01-1

BTC-29JAN1-50000-C
Protocol: DERIVE
Available: 10.5 contracts
Price: $1,250.50
------------------------

BTC-29JAN1-55000-C
Protocol: ZOMMA
Available: 5.2 contracts
Price: $980.25
------------------------`,
      },
    },
  ],
];

const optionPriceTemplate = `Extract the cryptocurrency and option type from the user's request.
If option type is not specified, default to "call".

Examples:
- "give me btc call options" -> {"asset": "BTC", "optionType": "call", "positionType": "long"}
- "show eth put options" -> {"asset": "ETH", "optionType": "put", "positionType": "long"}
- "check bitcoin options" -> {"asset": "BTC", "optionType": "call", "positionType": "long"}
- "give me eth options" -> {"asset": "ETH", "optionType": "call", "positionType": "long"}

User's request: "{{recentMessages}}"

Return ONLY a JSON object with the parameters:
{
    "asset": "BTC" or "ETH",
    "optionType": "call" (default) or "put",
    "positionType": "long" (default) or "short"
}`;

export const optionsAction: ElizaAction = {
  template: optionPriceTemplate,
  name: 'GET_OPTION_PRICE',
  similes: ['CHECK_OPTIONS', 'OPTION_PRICE', 'OPTION_CHECK', 'OPTIONS_DATA'],
  description: 'Get current option prices for a cryptocurrency',
  examples: examples,
};
