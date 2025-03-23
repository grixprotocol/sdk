import { GrixSDK } from '../../index.js';
import { PlatformAdapter, ToolSchema, AgentResponse } from '../types.js';

/**
 * Action template for Eliza platform
 */
export interface ElizaAction {
  name: string;
  similes: string[];
  description: string;
  examples: ElizaExample[][];
  template?: string;
}

/**
 * Example format for Eliza
 */
export interface ElizaExample {
  user: string;
  content: {
    text: string;
    action?: string;
  };
}

// Parameter extraction templates
const TEMPLATES = {
  assetPrice: `Extract the cryptocurrency from the user's request.
If not specified, default to BTC.

Examples of user requests and their parameters:
- "What's the current Bitcoin price?" -> {"asset": "BTC"}
- "Show me ETH price" -> {"asset": "ETH"}
- "How much is Ethereum worth?" -> {"asset": "ETH"}
- "Check BTC price" -> {"asset": "BTC"}
- "What's the price right now?" -> {"asset": "BTC"}

Look for these indicators:
- BTC/Bitcoin/btc
- ETH/Ethereum/eth

User's request: "{{recentMessages}}"

Return ONLY a JSON object with the parameter:
{
    "asset": "BTC" or "ETH"
}`,

  optionPrice: `Extract the cryptocurrency and option type from the user's request.
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
}`,

  tradingSignal: `Extract trading parameters from the user's request.
If parameters are not specified, use defaults.

The user might request trading signals in many different ways. Here are examples with their expected parameters:

- "Generate BTC trading signals with $5000 budget" -> 
  {"asset": "BTC", "budget_usd": 5000, "risk_level": "moderate", "strategy_focus": "growth"}

- "Give me conservative ETH signals for $10000" -> 
  {"asset": "ETH", "budget_usd": 10000, "risk_level": "conservative", "strategy_focus": "safety"}

- "What should I trade with $25000?" -> 
  {"asset": "BTC", "budget_usd": 25000, "risk_level": "moderate", "strategy_focus": "growth"}

- "Need safe trading ideas for BTC" -> 
  {"asset": "BTC", "budget_usd": 10000, "risk_level": "conservative", "strategy_focus": "safety"}

Look for these indicators:
- Asset: BTC/Bitcoin or ETH/Ethereum
- Budget: Dollar amounts like $5000, 10k, etc.
- Risk Level: conservative/safe, moderate/normal, aggressive/risky
- Strategy: growth/profit, safety/protection, yield/income

Defaults:
- asset: "BTC"
- budget_usd: 10000
- risk_level: "moderate"
- strategy_focus: "growth"

User's request: "{{recentMessages}}"

Return ONLY a JSON object with the parameters:
{
    "asset": "BTC" or "ETH",
    "budget_usd": number (default: 10000),
    "risk_level": "conservative" or "moderate" or "aggressive",
    "strategy_focus": "growth" or "safety" or "yield"
}`
};

/**
 * Create an Eliza service adapter
 */
export const createElizaService = (grixSdkInstance: GrixSDK): PlatformAdapter => {
  // Define action definitions
  const actions: Record<string, ElizaAction> = {
    getAssetPrice: {
      name: 'GET_ASSET_PRICE',
      similes: ['CHECK_PRICE', 'PRICE_CHECK', 'TOKEN_PRICE', 'CRYPTO_PRICE'],
      description: 'Get current price for a cryptocurrency',
      template: TEMPLATES.assetPrice,
      examples: [
        [
          {
            user: '{{user1}}',
            content: {
              text: 'What\'s the current Bitcoin price?',
            },
          },
          {
            user: '{{agent}}',
            content: {
              text: 'I\'ll check the current Bitcoin price for you.',
              action: 'GET_ASSET_PRICE',
            },
          },
          {
            user: '{{agent}}',
            content: {
              text: 'The current BTC price is $42,150.25',
            },
          }
        ]
      ]
    },

    getOptionPrice: {
      name: 'GET_OPTION_PRICE',
      similes: ['CHECK_OPTIONS', 'OPTION_PRICE', 'OPTION_CHECK', 'OPTIONS_DATA'],
      description: 'Get current option prices for a cryptocurrency',
      template: TEMPLATES.optionPrice,
      examples: [
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
              text: 'I\'ll check the current Bitcoin call options for you.',
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
          }
        ]
      ]
    },

    getTradingSignal: {
      name: 'GET_TRADING_SIGNAL',
      similes: ['generate signals', 'trading advice', 'options strategy', 'investment ideas'],
      description: 'Generate trading signals based on market conditions',
      template: TEMPLATES.tradingSignal,
      examples: [
        [
          {
            user: '{{user}}',
            content: {
              text: 'Generate trading signals for BTC with $25,000 budget',
            },
          },
          {
            user: '{{agent}}',
            content: {
              text: 'I\'ll generate Bitcoin trading signals for a $25,000 budget.',
              action: 'GET_TRADING_SIGNAL',
            },
          },
          {
            user: '{{agent}}',
            content: {
              text: "Here are my recommended trading signals based on a budget of $25,000:\n\n1. OPEN LONG position on BTC-30JUN23-40000-C at $1,250\n   Reason: Bullish momentum with strong support at current levels\n   Confidence: 75%\n\n2. OPEN SHORT position on BTC-30JUN23-50000-C at $420\n   Reason: Overpriced premium relative to probability of reaching strike\n   Confidence: 65%\n\nThese signals are based on current market conditions and should be considered as suggestions, not financial advice.",
            },
          }
        ]
      ]
    },

    getPerpsPairs: {
      name: 'GET_PERPS_PAIRS',
      similes: ['show perps', 'perpetual pairs', 'perp trading', 'perpetual swaps'],
      description: 'List available perpetual contract trading pairs by protocol',
      template: `Extract the protocol name from the user's request.
If not specified, return all protocols.

Examples:
- "Show me GMX perpetual pairs" -> {"protocolName": "GMX"}
- "What perps are available on DYDX?" -> {"protocolName": "DYDX"}
- "List all perpetual contracts" -> {"protocolName": "all"}

User's request: "{{recentMessages}}"

Return ONLY a JSON object with the parameters:
{
    "protocolName": "GMX" or "DYDX" or "all" (default)
}`,
      examples: [
        [
          {
            user: '{{user}}',
            content: {
              text: 'Show me the available perpetual contracts on GMX',
            },
          },
          {
            user: '{{agent}}',
            content: {
              text: 'I\'ll check the available perpetual contracts on GMX for you.',
              action: 'GET_PERPS_PAIRS',
            },
          }
        ]
      ]
    }
  };

  // Define tool schemas based on actions
  const schemas: ToolSchema[] = [
    {
      name: 'asset_price',
      schema: {
        type: 'object',
        properties: {
          asset: { type: 'string', enum: ['BTC', 'ETH'] }
        }
      },
      description: 'Get current price for a cryptocurrency'
    },
    {
      name: 'option_price',
      schema: {
        type: 'object',
        properties: {
          asset: { type: 'string', enum: ['BTC', 'ETH'] },
          optionType: { type: 'string', enum: ['call', 'put'] },
          positionType: { type: 'string', enum: ['long', 'short'] }
        }
      },
      description: 'Get current option prices for a cryptocurrency'
    },
    {
      name: 'trading_signal',
      schema: {
        type: 'object',
        properties: {
          asset: { type: 'string', enum: ['BTC', 'ETH'] },
          budget_usd: { type: 'number' },
          risk_level: { type: 'string', enum: ['conservative', 'moderate', 'aggressive'] },
          strategy_focus: { type: 'string', enum: ['growth', 'safety', 'yield'] }
        }
      },
      description: 'Generate trading signals based on market conditions'
    },
    {
      name: 'perps_pairs',
      schema: {
        type: 'object',
        properties: {
          protocolName: { type: 'string' },
          asset: { type: 'string', optional: true }
        }
      },
      description: 'List available perpetual contract trading pairs by protocol'
    }
  ];

  // Handle operations for Eliza
  const handleOperation = async (name: string, args?: Record<string, unknown>): Promise<AgentResponse> => {
    try {
      switch (name) {
        case 'asset_price':
          const asset = (args?.asset as string || 'BTC').toUpperCase();
          const assetPrice = await grixSdkInstance.fetchAssetPrice(asset);
          return {
            content: [{
              type: 'text',
              text: `The current ${asset} price is ${formatPrice(assetPrice)}`
            }]
          };

        case 'option_price':
          const optionParams = {
            asset: (args?.asset as string || 'BTC').toUpperCase(),
            optionType: (args?.optionType as string || 'call').toLowerCase(),
            positionType: (args?.positionType as string || 'long').toLowerCase()
          };

          const options = await grixSdkInstance.getOptionsMarketBoard({
            underlyingAsset: optionParams.asset,
            optionType: optionParams.optionType === 'call' ? 'CALL' : 'PUT',
            positionType: optionParams.positionType === 'long' ? 'LONG' : 'SHORT'
          });

          return {
            content: [{
              type: 'text',
              text: formatOptionsResponse(options, optionParams)
            }]
          };

        case 'trading_signal':
          const signalParams = {
            asset: (args?.asset as string || 'BTC').toUpperCase(),
            budget_usd: Number(args?.budget_usd || 10000),
            risk_level: (args?.risk_level as string || 'moderate').toLowerCase(),
            strategy_focus: (args?.strategy_focus as string || 'growth').toLowerCase()
          };

          // Use the best fit method from the SDK
          const signals = await grixSdkInstance.requestTradeAgentSignals(
            0, // Default agent ID
            {
              asset: signalParams.asset,
              budget: signalParams.budget_usd,
              config: {
                risk_profile: mapRiskLevel(signalParams.risk_level),
                strategy: mapStrategyFocus(signalParams.strategy_focus)
              }
            }
          );

          return {
            content: [{
              type: 'text',
              text: formatSignalsResponse(signals, signalParams.budget_usd)
            }]
          };

        case 'perps_pairs':
          const protocolName = (args?.protocolName as string || 'all').toUpperCase();
          const pairsAsset = args?.asset as string || undefined;

          const perpsPairs = await grixSdkInstance.getPerpsPairs({
            protocol: protocolName === 'ALL' ? undefined : protocolName,
            baseAsset: pairsAsset
          });

          return {
            content: [{
              type: 'text',
              text: formatPerpsPairsResponse(perpsPairs, protocolName)
            }]
          };

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      return {
        content: [{
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`
        }]
      };
    }
  };

  // Helper functions for formatting responses
  function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }

  function formatOptionsResponse(options: any, params: any): string {
    if (!options || options.length === 0) {
      return `No options data available for ${params.asset} ${params.optionType} options.`;
    }

    // Group by expiry
    const groupedByExpiry = options.reduce((acc: any, opt: any) => {
      if (!acc[opt.expiry]) {
        acc[opt.expiry] = [];
      }
      acc[opt.expiry].push(opt);
      return acc;
    }, {});

    let response = "Available Options:\n";

    Object.entries(groupedByExpiry).forEach(([expiry, options]: [string, any]) => {
      response += `\nExpiry: ${expiry}\n`;

      // Format each option
      (options as any[]).forEach((option) => {
        const date = new Date(option.expiry);
        const day = date.getDate().toString().padStart(2, "0");
        const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
        const year = date.getFullYear().toString().slice(-2);
        const symbol = `${params.asset}-${day}${month}${year}-${option.strike}-${option.optionType.charAt(0)}`;

        response += `\n${symbol}\n`;
        response += `Protocol: ${option.protocol}\n`;
        response += `Available: ${option.available} contracts\n`;
        response += `Price: ${formatPrice(option.price)}\n`;
        response += `------------------------\n`;
      });
    });

    return response.trim();
  }

  function formatSignalsResponse(signals: any, budget: number): string {
    let response = `Here are my recommended trading signals based on a budget of $${budget.toLocaleString()}:\n\n`;

    if (!signals || !signals.signals || signals.signals.length === 0) {
      return response + "No viable trading signals found for the current market conditions.";
    }

    signals.signals.forEach((signal: any, index: number) => {
      response += `${index + 1}. ${signal.action_type.toUpperCase()} ${signal.position_type.toUpperCase()} position on ${signal.instrument} at ${formatPrice(signal.expected_instrument_price_usd)}\n`;
      response += `   Reason: ${signal.reason}\n`;

      if (signal.confidence_score) {
        response += `   Confidence: ${Math.round(signal.confidence_score * 100)}%\n`;
      }

      response += "\n";
    });

    response += "These signals are based on current market conditions and should be considered as suggestions, not financial advice.";
    return response;
  }

  function formatPerpsPairsResponse(pairsData: any, protocolName: string): string {
    if (!pairsData || !pairsData.pairs || pairsData.pairs.length === 0) {
      return `No perpetual pairs found${protocolName !== 'ALL' ? ` for ${protocolName}` : ''}.`;
    }

    const protocolTitle = protocolName === 'ALL' ? 'All Protocols' : protocolName;
    let response = `Available Perpetual Pairs${protocolName !== 'ALL' ? ` on ${protocolTitle}` : ''}:\n\n`;

    // Group by protocol
    const byProtocol = pairsData.pairs.reduce((acc: any, pair: any) => {
      if (!acc[pair.protocol]) {
        acc[pair.protocol] = [];
      }
      acc[pair.protocol].push(pair);
      return acc;
    }, {});

    Object.entries(byProtocol).forEach(([protocol, pairs]: [string, any]) => {
      response += `${protocol}:\n`;

      (pairs as any[]).forEach((pair) => {
        response += `- ${pair.pair} (${pair.baseAsset}/${pair.quoteAsset})\n`;
        if (pair.lastPrice) {
          response += `  Last Price: ${formatPrice(pair.lastPrice)}\n`;
        }
        if (pair.volume24h) {
          response += `  24h Volume: ${formatPrice(pair.volume24h)}\n`;
        }
        response += "\n";
      });
    });

    return response.trim();
  }

  // Utility functions for mapping parameters
  function mapRiskLevel(level: string): string {
    const map: Record<string, string> = {
      'conservative': 'low',
      'moderate': 'medium',
      'aggressive': 'high'
    };
    return map[level] || 'medium';
  }

  function mapStrategyFocus(focus: string): string {
    const map: Record<string, string> = {
      'safety': 'hedging',
      'growth': 'growth',
      'yield': 'income'
    };
    return map[focus] || 'growth';
  }

  return {
    getSchemas: () => schemas,
    handleOperation,
    getActions: () => actions,
    getTemplates: () => TEMPLATES
  };
};
