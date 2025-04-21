export enum ToolCategory {
  TRADING_INDICATORS = 'trading-indicators',
  SIGNALS = 'signals',
  PERPETUAL_FUTURES = 'perpetual-futures',
  OPTIONS = 'options',
  ASSET_PRICE_PREDICTIONS = 'asset-price-predictions',
  ALTCOINS_DERIVATIVES = 'altcoins-derivatives',
}

export interface ToolExample {
  scenario: string;
  usage: string;
}

export interface ToolParameters {
  [key: string]: string;
}

export interface ToolGuide {
  name: string;
  category: ToolCategory;
  description: string;
  commonUseCases: string[];
  parameters: ToolParameters;
  relatedTools: string[];
  examples: ToolExample[];
}

export interface WorkflowStep {
  toolName: string;
  purpose: string;
}

export interface WorkflowGuide {
  name: string;
  description: string;
  steps: WorkflowStep[];
}

export enum TradingIndicatorsInterval {
  ONE_MINUTE = '1m',
  FIVE_MINUTES = '5m',
  FIFTEEN_MINUTES = '15m',
  THIRTY_MINUTES = '30m',
  ONE_HOUR = '1h',
  TWO_HOURS = '2h',
  FOUR_HOURS = '4h',
  TWELVE_HOURS = '12h',
  ONE_DAY = '1d',
  ONE_WEEK = '1w',
}
export enum TradingIndicatorsExchange {
  BINANCE = 'binance',
  BINANCE_FUTURES = 'binancefutures',
  BITSTAMP = 'bitstamp',
  WHITEBIT = 'whitebit',
  BYBIT = 'bybit',
  GATE_IO = 'gateio',
  COINBASE = 'coinbase',
  BINANCE_US = 'binanceus',
  KRAKEN = 'kraken',
}

export const toolGuides: Record<string, ToolGuide> = {
  getTradingIndicators: {
    name: 'Trading Indicators',
    category: ToolCategory.TRADING_INDICATORS,
    description:
      'Get trading indicators for a given symbol and exchange, such as RSI, EMA, MACD, and more',
    commonUseCases: [
      'Technical analysis across multiple timeframes',
      'Market timing and trend identification',
      'Entry and exit point optimization',
    ],
    parameters: {
      exchange: `one of the following: ${Object.values(TradingIndicatorsExchange).join(', ')}`,
      symbol: 'Trading pair (e.g., BTC/USDT)',
      interval: `one of the following: ${Object.values(TradingIndicatorsInterval).join(', ')}`,
    },
    relatedTools: ['generateSignals', 'getAssetPricePredictions'],
    examples: [
      {
        scenario: 'Trend Analysis',
        usage: 'Get hourly indicators for BTC/USDT on Binance to analyze market trends',
      },
    ],
  },
  generateSignals: {
    name: 'Trading Signals Generator',
    category: ToolCategory.SIGNALS,
    description: 'Generate AI-powered trading signals based on user parameters',
    commonUseCases: [
      'Automated trading signal generation',
      'Risk-aware trading recommendations',
      'Custom strategy implementation',
    ],
    parameters: {
      budget: 'Trading budget amount',
      assets: 'Array of assets to trade (BTC, ETH)',
      userPrompt: 'Custom strategy instructions',
    },
    relatedTools: ['getTradingIndicators', 'getAssetPricePredictions'],
    examples: [
      {
        scenario: 'Conservative Trading',
        usage: 'Generate moderate-risk signals for BTC with a $5000 budget',
      },
    ],
  },
  getDefiOptions: {
    name: 'DeFi Options Data',
    category: ToolCategory.OPTIONS,
    description: 'Get options trading data from Grix',
    commonUseCases: [
      'Options market analysis',
      'Strategy development for derivatives',
      'Risk/reward optimization',
    ],
    parameters: {
      asset: 'Target asset (BTC or ETH)',
      optionType: 'Call or Put option',
      positionType: 'Long or Short position',
    },
    relatedTools: ['getTradingIndicators', 'getAssetPricePredictions'],
    examples: [
      {
        scenario: 'Options Strategy',
        usage: 'Analyze BTC call options for long positions',
      },
    ],
  },
  getAssetPricePredictions: {
    name: 'Asset Price Predictions',
    category: ToolCategory.ASSET_PRICE_PREDICTIONS,
    description: 'Get AI-powered price predictions from Allora Network',
    commonUseCases: [
      'Short-term price movement analysis',
      'Medium-term trend prediction',
      'Risk management planning',
    ],
    parameters: {
      asset: 'Target asset (BTC, ETH, SOL, BNB, ARB)',
      timeframe: 'Prediction timeframe (5m or 8h)',
    },
    relatedTools: ['getTradingIndicators', 'generateSignals'],
    examples: [
      {
        scenario: 'Trading Planning',
        usage: 'Get 8-hour price predictions for BTC to plan entries/exits',
      },
    ],
  },
  // Perpetual Futures Tools
  getPerpsNextFundingRate: {
    name: 'Next Funding Rate',
    category: ToolCategory.PERPETUAL_FUTURES,
    description: 'Get the next funding rate for perpetual futures',
    commonUseCases: ['Funding rate prediction', 'Trading strategy optimization', 'Cost analysis'],
    parameters: {
      protocol: 'Trading protocol (e.g., hyperliquid, lode)',
    },
    relatedTools: ['getCurrentFundingRate', 'getPerpsHistoricalFundingRates'],
    examples: [
      {
        scenario: 'Funding Rate Analysis',
        usage: 'Check upcoming funding rates on Hyperliquid for trading strategy adjustment',
      },
    ],
  },
  getPerpsPairs: {
    name: 'Perpetual Trading Pairs',
    category: ToolCategory.PERPETUAL_FUTURES,
    description: 'Get available perpetual futures trading pairs',
    commonUseCases: ['Market discovery', 'Trading pair analysis', 'Liquidity assessment'],
    parameters: {
      protocol: 'Trading protocol',
      baseAsset: 'Base asset for pairs',
    },
    relatedTools: ['getPerpsAssetContexts', 'getPerpsAssetPrice'],
    examples: [
      {
        scenario: 'Market Exploration',
        usage: 'List all available trading pairs for BTC on Hyperliquid',
      },
    ],
  },
  getPerpsAssetContexts: {
    name: 'Asset Contexts',
    category: ToolCategory.PERPETUAL_FUTURES,
    description: 'Get detailed context for perpetual futures assets',
    commonUseCases: [
      'Market analysis',
      'Asset information gathering',
      'Trading context assessment',
    ],
    parameters: {
      protocol: 'Trading protocol',
      pair: 'Trading pair',
    },
    relatedTools: ['getPerpsPairs', 'getPerpsAssetPrice'],
    examples: [
      {
        scenario: 'Asset Analysis',
        usage: 'Get detailed information about BTC/USD perpetual on specified protocol',
      },
    ],
  },
  // Altcoins Derivatives Tools
  getAltcoinsOptionsTradableEntities: {
    name: 'Altcoins Options Entities',
    category: ToolCategory.ALTCOINS_DERIVATIVES,
    description: 'Get tradable entities for altcoins options',
    commonUseCases: [
      'Options market discovery',
      'Trading opportunities identification',
      'Market structure analysis',
    ],
    parameters: {},
    relatedTools: ['getAltcoinsOptionsExpiriesPerSymbol', 'getAltcoinsOptionsStrikesPerSymbol'],
    examples: [
      {
        scenario: 'Market Discovery',
        usage: 'List all available options trading entities across supported protocols',
      },
    ],
  },
  getAltcoinsOptionsCurrenciesTradingStatistics: {
    name: 'Altcoins Trading Stats',
    category: ToolCategory.ALTCOINS_DERIVATIVES,
    description: 'Get trading statistics for altcoins options currencies',
    commonUseCases: ['Market activity analysis', 'Volume assessment', 'Trading statistics review'],
    parameters: {},
    relatedTools: ['getAltcoinsOptionsTradableEntities'],
    examples: [
      {
        scenario: 'Market Analysis',
        usage: 'Review trading statistics for all supported altcoin options',
      },
    ],
  },
} as const;

export const workflowGuides: WorkflowGuide[] = [
  {
    name: 'Complete Market Analysis',
    description:
      'Comprehensive market analysis combining technical indicators, signals, and predictions',
    steps: [
      {
        toolName: 'getTradingIndicators',
        purpose: 'Analyze current market conditions and trends',
      },
      {
        toolName: 'getAssetPricePredictions',
        purpose: 'Get price predictions for confirmation',
      },
      {
        toolName: 'generateSignals',
        purpose: 'Generate trading signals based on analysis',
      },
    ],
  },
  {
    name: 'Options Trading Setup',
    description: 'Complete workflow for options trading analysis and execution',
    steps: [
      {
        toolName: 'getTradingIndicators',
        purpose: 'Analyze underlying asset trends',
      },
      {
        toolName: 'getAssetPricePredictions',
        purpose: 'Predict price movements for strike selection',
      },
      {
        toolName: 'getDefiOptions',
        purpose: 'Analyze options data and select positions',
      },
    ],
  },
  {
    name: 'Perpetual Futures Analysis',
    description: 'Complete analysis workflow for perpetual futures trading',
    steps: [
      {
        toolName: 'getPerpsPairs',
        purpose: 'Discover available trading pairs',
      },
      {
        toolName: 'getPerpsAssetContexts',
        purpose: 'Analyze market context for selected pairs',
      },
      {
        toolName: 'getPerpsNextFundingRate',
        purpose: 'Check upcoming funding rates',
      },
      {
        toolName: 'getTradingIndicators',
        purpose: 'Analyze technical indicators for entry/exit',
      },
    ],
  },
  {
    name: 'Altcoins Options Discovery',
    description: 'Workflow for exploring and analyzing altcoins options markets',
    steps: [
      {
        toolName: 'getAltcoinsOptionsTradableEntities',
        purpose: 'Discover available options markets',
      },
      {
        toolName: 'getAltcoinsOptionsCurrenciesTradingStatistics',
        purpose: 'Analyze market activity and statistics',
      },
      {
        toolName: 'getTradingIndicators',
        purpose: 'Review technical indicators for underlying assets',
      },
    ],
  },
];

export const usageGuideSchemaMcp = {
  name: 'getToolGuidance',
  description: 'Get guidance on using GRIX trading tools effectively',
  inputSchema: {
    type: 'object',
    properties: {
      goal: {
        type: 'string',
        description: 'The trading goal or task you want to accomplish',
        example: 'I want to analyze BTC market trends',
      },
      category: {
        type: 'string',
        enum: Object.values(ToolCategory),
        description: 'Optional: Specific category of tools to focus on',
      },
      specificTool: {
        type: 'string',
        enum: Object.keys(toolGuides),
        description: 'Optional: Get detailed guidance for a specific tool',
      },
    },
    required: ['goal'],
  },
};
