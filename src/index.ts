import { fetchAssetPrice } from './methods/fetchAssetPrice';
import { chatBotGetContext } from './methods/chatbotGetContext';
import { getOptionPrice } from './methods/getOptionPrice';
import { getAssetPriceHistory } from './methods/getAssetPriceHistory';
import { getOptionPriceHistory } from './methods/getOptionPriceHistory';
import { sendChatbotRequest } from './methods/sendChatbotRequest';
import { generateTradingSignals } from './methods/generateTradingSignals';
import type { SendChatbotRequestParams } from './methods/sendChatbotRequest/types';
import type {
  ChatBotGetContextParams,
  ChatBotGetContextResponse,
} from './methods/chatbotGetContext/types';
import type { OptionPriceGetParams, OptionPriceGetResponse } from './methods/getOptionPrice/types';
import type {
  AssetPriceHistoryGetParams,
  AssetPriceHistoryGetResponse,
} from './methods/getAssetPriceHistory/types';
import type {
  OptionPriceHistoryGetParams,
  OptionPriceHistoryGetResponse,
} from './methods/getOptionPriceHistory/types';
import type {
  AIAnalysisParams,
  AIAnalysisResponse,
  TradeAnalysisParams,
  MarketDataInput,
  Signal,
  ActionType,
  PositionType,
  InstrumentType,
} from './methods/generateTradingSignals/types';
import {
  UnderlyingAsset,
  OptionType,
  PriceType,
  OrderType,
  ExpiryType,
  PaymentToken,
} from './globals/enums.js';
import {
  getOptionsMarketBoard,
  TradeBoardGetParams,
  TradeBoardGetResponse,
} from './methods/getOptionsMarketBoard';

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
   * Generate trading signals based on market data analysis
   *
   * @param params - The analysis parameters (either trade analysis or general analysis)
   * @returns Trade signals or analysis results with metadata
   */
  async generateTradingSignals(params: AIAnalysisParams): Promise<AIAnalysisResponse> {
    return generateTradingSignals(params, { apiKey: this.openAIApiKey });
  }

  /**
   * @deprecated Use generateTradingSignals instead
   */
  async analyzeMarketData(params: AIAnalysisParams): Promise<AIAnalysisResponse> {
    return this.generateTradingSignals(params);
  }

  /**
   * Retrieves available options quotes from multiple markets/protocols
   *
   * @param params - Parameters to filter options by asset, type, and position
   * @returns Available options quotes matching the criteria
   * @throws Error if API key is not provided
   */
  async getOptionsMarketBoard(params: TradeBoardGetParams): Promise<TradeBoardGetResponse> {
    if (this.apiKey) {
      throw new Error(
        'API key is required for getOptionsMarketBoard. Please provide an API key when initializing the SDK.'
      );
    }
    return getOptionsMarketBoard(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }
}
