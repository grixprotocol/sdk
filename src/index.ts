import { fetchAssetPrice } from './methods/fetchAssetPrice/index';
import { chatBotGetContext } from './methods/chatbotGetContext/index';
import { getOptionPrice } from './methods/getOptionPrice/index';
import { getAssetPriceHistory } from './methods/getAssetPriceHistory/index';
import { getOptionPriceHistory } from './methods/getOptionPriceHistory/index';
import { sendChatbotRequest } from './methods/sendChatbotRequest/index';
import { generateTradingSignals } from './methods/generateTradingSignals/index';
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
import { requestTradeAgentSignals } from './methods/requestTradeAgentSignals';
import type {
  TradeAgentSignalRequest,
  TradeAgentSignalResponse,
  TradeAgentSignalRequestConfig,
} from './methods/requestTradeAgentSignals/types';
import { createTradeAgent } from './methods/createTradeAgent';
import type {
  CreateTradeAgentRequest,
  CreateTradeAgentResponse,
  TradeAgentConfig,
} from './methods/createTradeAgent/types';
import { getTradeSignals } from './methods/getTradeSignals';
import type {
  GetTradeSignalsParams,
  GetTradeSignalsResponse,
} from './methods/getTradeSignals/types';

import { getPairs } from './methods/perps/getPairs';
import type { GetPairsParams, GetPairsResponse } from './methods/perps/getPairs/types';

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
  TradeAgentSignalRequest,
  TradeAgentSignalResponse,
  TradeAgentSignalRequestConfig,
  CreateTradeAgentRequest,
  CreateTradeAgentResponse,
  TradeAgentConfig,
  GetTradeSignalsParams,
  GetTradeSignalsResponse,
  GetPairsParams,
  GetPairsResponse,
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
    if (!this.apiKey) {
      throw new Error(
        'API key is required for getOptionsMarketBoard. Please provide an API key when initializing the SDK.'
      );
    }
    return getOptionsMarketBoard(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  /**
   * Create a new trade agent
   *
   * @param request - Configuration for the trade agent
   * @returns Response containing the new agent's ID
   */
  async createTradeAgent(request: CreateTradeAgentRequest): Promise<CreateTradeAgentResponse> {
    return createTradeAgent(request, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }
  /**
   * Request trading signals from a specific trade agent
   *
   * @param tradeAgentId - ID of the trade agent to request signals from
   * @param request - Configuration for the signal request
   * @returns Trading signals from the trade agent
   */
  async requestTradeAgentSignals(
    tradeAgentId: number,
    request: TradeAgentSignalRequest
  ): Promise<TradeAgentSignalResponse> {
    return requestTradeAgentSignals(tradeAgentId, request, {
      apiKey: this.apiKey,
      baseUrl: this.baseUrl,
    });
  }

  /**
   * Get historical trade signals by agent ID or wallet address
   *
   * @param params - Query parameters (agentId or address)
   * @returns List of trade signals with metadata
   */
  async getTradeSignals(params: GetTradeSignalsParams): Promise<GetTradeSignalsResponse> {
    return getTradeSignals(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  /**
   * Get pairs by protocol and base asset
   *
   * @param params - Query parameters (protocol and baseAsset)
   * @returns List of pairs matching the criteria
   */
  async getPerpsPairs(params: GetPairsParams): Promise<GetPairsResponse> {
    return getPairs(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }
}
