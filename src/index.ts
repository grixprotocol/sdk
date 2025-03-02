import { fetchAssetPrice } from './methods/fetchAssetPrice/index.js';
import { chatBotGetContext } from './methods/chatbotGetContext/index.js';
import { getOptionPrice } from './methods/getOptionPrice/index.js';
import { getAssetPriceHistory } from './methods/getAssetPriceHistory/index.js';
import { getOptionPriceHistory } from './methods/getOptionPriceHistory/index.js';
import { sendChatbotRequest } from './methods/sendChatbotRequest/index.js';
import { analyzeMarketData } from './methods/analyzeMarketData/index.js';
import type { SendChatbotRequestParams } from './methods/sendChatbotRequest/types.js';
import type {
  ChatBotGetContextParams,
  ChatBotGetContextResponse,
} from './methods/chatbotGetContext/types.js';
import type {
  OptionPriceGetParams,
  OptionPriceGetResponse,
} from './methods/getOptionPrice/types.js';
import type {
  AssetPriceHistoryGetParams,
  AssetPriceHistoryGetResponse,
} from './methods/getAssetPriceHistory/types.js';
import type {
  OptionPriceHistoryGetParams,
  OptionPriceHistoryGetResponse,
} from './methods/getOptionPriceHistory/types.js';
import type {
  AIAnalysisParams,
  AIAnalysisResponse,
  TradeAnalysisParams,
  MarketDataInput,
  Signal,
  ActionType,
  PositionType,
  InstrumentType,
} from './methods/analyzeMarketData/types.js';
import {
  UnderlyingAsset,
  OptionType,
  PriceType,
  OrderType,
  ExpiryType,
  PaymentToken,
} from './globals/enums.js';

export {
  AIAnalysisParams,
  AIAnalysisResponse,
  TradeAnalysisParams,
  MarketDataInput,
  Signal,
  ActionType,
  PositionType,
  InstrumentType,
  UnderlyingAsset,
  OptionType,
  PriceType,
  OrderType,
  ExpiryType,
  PaymentToken,
};

export type InitializeConfig = {
  apiKey?: string;
  baseUrl?: string;
  openAIApiKey?: string;
};

export class GrixSDK {
  private apiKey: string;
  private baseUrl: string;
  private openAIApiKey: string;

  private constructor(config?: InitializeConfig) {
    this.apiKey = config?.apiKey || '';
    this.baseUrl = config?.baseUrl || 'https://internal-api-dev.grix.finance';
    this.openAIApiKey = config?.openAIApiKey || '';
  }

  /**
   * Initialize a new instance of the GrixSDK
   *
   * @param config - Configuration options for the SDK
   * @param config.apiKey - API key for Grix APIs
   * @param config.baseUrl - Base URL for Grix APIs
   * @param config.openAIApiKey - OpenAI API key for AI-powered features
   * @returns A new instance of the GrixSDK
   */
  static async initialize(config?: InitializeConfig): Promise<GrixSDK> {
    return new GrixSDK(config);
  }

  /**
   * Fetches the current price of a specified asset
   *
   * @param asset - The asset symbol (e.g., "BTC", "ETH")
   * @returns The current price of the asset
   */
  async fetchAssetPrice(asset: string): Promise<number> {
    return fetchAssetPrice(asset);
  }

  /**
   * Retrieves current price information for options matching specified parameters
   *
   * @param params - Parameters for the option price request
   * @returns Option price data
   */
  async getOptionPrice(params: OptionPriceGetParams): Promise<OptionPriceGetResponse> {
    return getOptionPrice(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  /**
   * Retrieves historical price data for specified assets
   *
   * @param params - Parameters for the asset price history request
   * @returns Historical asset price data
   */
  async getAssetPriceHistory(
    params: AssetPriceHistoryGetParams
  ): Promise<AssetPriceHistoryGetResponse> {
    return getAssetPriceHistory(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  /**
   * Retrieves historical option price data
   *
   * @param params - Parameters for the option price history request
   * @returns Historical option price data
   */
  async getOptionPriceHistory(
    params: OptionPriceHistoryGetParams
  ): Promise<OptionPriceHistoryGetResponse> {
    return getOptionPriceHistory(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  /**
   * Retrieves context information for the chatbot
   *
   * @param params - Parameters for the chatbot context request
   * @returns Chatbot context information
   */
  async chatBotGetContext(params: ChatBotGetContextParams): Promise<ChatBotGetContextResponse> {
    return chatBotGetContext(params);
  }

  /**
   * Sends a request to the chatbot and returns the response
   *
   * @param params - Parameters for the chatbot request
   * @returns The chatbot's response as a string
   */
  async sendChatbotRequest(params: SendChatbotRequestParams): Promise<string> {
    return sendChatbotRequest(params);
  }

  /**
   * Analyzes market data using AI to generate insights or trading signals
   * Supports two modes:
   * 1. Trade signal generation - Creates actionable trade recommendations
   * 2. General analysis - Provides custom analysis of market data
   *
   * @param params - Parameters for the analysis request, either TradeAnalysisParams or general AIAnalysisParams
   * @returns Analysis results, including trading signals or custom analysis
   *
   * @example
   * // Generate trading signals
   * const result = await sdk.generateTradingSignals({
   *   dataPoints: [
   *     { type: 'asset_price_history', description: 'BTC prices', data: btcPrices }
   *   ],
   *   tradeConfig: {
   *     budget_usd: 1000,
   *     trade_window_ms: 7 * 24 * 60 * 60 * 1000 // 7 days
   *   }
   * });
   */
  async generateTradingSignals(params: AIAnalysisParams): Promise<AIAnalysisResponse> {
    return analyzeMarketData(params, { apiKey: this.openAIApiKey });
  }
}
