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
          }
        ]
      ]
    },

    getOptionPrice: {
      name: 'GET_OPTION_PRICE',
      similes: ['CHECK_OPTIONS', 'OPTION_PRICE', 'OPTION_CHECK', 'OPTIONS_DATA'],
      description: 'Get current option prices for a cryptocurrency',
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
          }
        ]
      ]
    },

    getTradingSignal: {
      name: 'GET_TRADING_SIGNAL',
      similes: ['generate signals', 'trading advice', 'options strategy', 'investment ideas'],
      description: 'Generate trading signals based on market conditions',
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

          const options = await grixSdkInstance.getOptionPrice({
            underlyingAsset: optionParams.asset,
            optionType: optionParams.optionType,
            positionType: optionParams.positionType
          });

          return {
            content: [{
              type: 'text',
              text: formatOptionsResponse(options)
            }]
          };

        case 'trading_signal':
          const signalParams = {
            asset: (args?.asset as string || 'BTC').toUpperCase(),
            budget_usd: Number(args?.budget_usd || 10000),
            risk_level: (args?.risk_level as string || 'moderate').toLowerCase(),
            strategy_focus: (args?.strategy_focus as string || 'growth').toLowerCase()
          };

          // Call the appropriate API method when implemented
          const signals = await grixSdkInstance.getTradeSignals({
            asset: signalParams.asset,
            // Map other parameters as needed
          });

          return {
            content: [{
              type: 'text',
              text: formatSignalsResponse(signals, signalParams.budget_usd)
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

  function formatOptionsResponse(options: any): string {
    // Basic formatting for now, would need to be expanded based on actual response structure
    if (!options || !options.data || options.data.length === 0) {
      return 'No options data available.';
    }

    let response = 'Available Options:\n\n';
    // Format options based on the structure returned by the SDK
    return response;
  }

  function formatSignalsResponse(signals: any, budget: number): string {
    let response = `Here are my recommended trading signals based on a budget of $${budget.toLocaleString()}:\n\n`;
    // Format signals based on the structure returned by the SDK
    return response;
  }

  return {
    getSchemas: () => schemas,
    handleOperation,
    getActions: () => actions
  };
};
