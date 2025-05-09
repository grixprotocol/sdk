import { fetchAssetPrice } from './methods/fetchAssetPrice/index.js';
import { chatBotGetContext } from './methods/chatbotGetContext/index.js';
import { getOptionPrice } from './methods/getOptionPrice/index.js';
import { getAssetPriceHistory } from './methods/getAssetPriceHistory/index.js';
import { getOptionPriceHistory } from './methods/getOptionPriceHistory/index.js';
import { sendChatbotRequest } from './methods/sendChatbotRequest/index.js';
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
} from './methods/generateTradingSignals/types.js';
import {
  UnderlyingAsset,
  OptionType,
  PriceType,
  OrderType,
  ExpiryType,
  PaymentToken,
} from './globals/enums.js';
import { getOptionsMarketBoard } from './methods/getOptionsMarketBoard/index.js';
import type { TradeBoardData, TradeBoardGetParams } from './methods/getOptionsMarketBoard/type.js';
import { requestTradeAgentSignals } from './methods/requestTradeAgentSignals/index.js';
import type {
  TradeAgentSignalRequest,
  TradeAgentSignalResponse,
  TradeAgentSignalRequestConfig,
} from './methods/requestTradeAgentSignals/types.js';
import { createTradeAgent } from './methods/createTradeAgent/index.js';
import type {
  CreateTradeAgentRequest,
  CreateTradeAgentResponse,
  TradeAgentConfig,
} from './methods/createTradeAgent/types.js';
import { getTradeSignals } from './methods/getTradeSignals/index.js';
import type {
  GetTradeSignalsParams,
  GetTradeSignalsResponse,
} from './methods/getTradeSignals/types.js';
import { getPairs } from './methods/perps/getPairs/index.js';
import { getOpenInterestCaps } from './methods/perps/getOpenInterestCaps/index.js';
import { getAssetContexts } from './methods/perps/getAssetContexts/index.js';
import { getHistoricalFundingRates } from './methods/perps/getHistoricalFundingRates/index.js';
import { getTradingIndicators } from './methods/tradingIndicators/index.js';
import { getAssetPricePrediction } from './methods/prediction/getAssetPricePrediction/alloraNetwork/index.js';

import type { GetPairsParams, GetPairsResponse } from './methods/perps/getPairs/types.js';
import { createMCPService } from './modelContextCore/mcp/index.js';
import type { MCPService } from './modelContextCore/mcp/types/index.js';
import { createElizaService } from './modelContextCore/eliza/index.js';
import type { ElizaService } from './modelContextCore/eliza/types/index.js';
import {
  GetOpenInterestCapsRequest,
  GetOpenInterestCapsResponse,
} from './methods/perps/getOpenInterestCaps/types.js';
import {
  GetAssetContextsRequest,
  GetAssetContextsResponse,
} from './methods/perps/getAssetContexts/types.js';
import {
  GetHistoricalFundingRatesRequest,
  GetHistoricalFundingRatesResponse,
} from './methods/perps/getHistoricalFundingRates/types.js';
import {
  GetTradingIndicatorsRequest,
  GetTradingIndicatorsResponse,
} from './methods/tradingIndicators/types.js';
import {
  GetAssetPricePredictionResponse,
  GetAssetPricePredictionParams,
} from './methods/prediction/getAssetPricePrediction/alloraNetwork/types.js';
import {
  GetNextFundingRateRequest,
  HyperliquidGetNextFundingRateResponse,
  LodeGetNextFundingRateResponse,
} from './methods/perps/getNextFundingRate/types.js';
import { getNextFundingRate } from './methods/perps/getNextFundingRate/index.js';
import { GetTradingFeeRequest } from './methods/perps/getTradingFee/types.js';
import { GetTradingFeeResponse } from './methods/perps/getTradingFee/types.js';
import { getTradingFee } from './methods/perps/getTradingFee/index.js';
import { GetAssetPriceResponse } from './methods/perps/getAssetPrice/types.js';
import { GetAssetPriceRequest } from './methods/perps/getAssetPrice/types.js';
import { getAssetPrice } from './methods/perps/getAssetPrice/index.js';
import { GetCurrentFundingRateRequest } from './methods/perps/getCurrentFundingRate/types.js';
import { GetCurrentFundingRateResponse } from './methods/perps/getCurrentFundingRate/types.js';
import { getCurrentFundingRate } from './methods/perps/getCurrentFundingRate/index.js';
import { getExpiriesPerSymbol } from './methods/altcoinsDerivatives/protocols/powerTrade/options/getExpiriesPerSymbol/index.js';
import { getStrikesPerSymbol } from './methods/altcoinsDerivatives/protocols/powerTrade/options/getStrikesPerSymbol/index.js';
import { getTradableEntities } from './methods/altcoinsDerivatives/protocols/powerTrade/getTradableEntities/index.js';
import { getCurrenciesTradingStatistics } from './methods/altcoinsDerivatives/protocols/powerTrade/getCurrenciesTradingStatistics/index.js';
import { TradableEntitiesGetResponse } from './methods/altcoinsDerivatives/protocols/powerTrade/getTradableEntities/types.js';
import { ExpiriesPerSymbolGetResponse } from './methods/altcoinsDerivatives/protocols/powerTrade/options/getExpiriesPerSymbol/types.js';
import { CurrenciesTradingStatisticsGetResponse } from './methods/altcoinsDerivatives/protocols/powerTrade/getCurrenciesTradingStatistics/types.js';
import { ExpiriesPerSymbolGetParams } from './methods/altcoinsDerivatives/protocols/powerTrade/options/getExpiriesPerSymbol/types.js';
import {
  StrikesPerSymbolGetParams,
  StrikesPerSymbolGetResponse,
} from './methods/altcoinsDerivatives/protocols/powerTrade/options/getStrikesPerSymbol/types.js';

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
  GetOpenInterestCapsRequest,
  GetOpenInterestCapsResponse,
  GetAssetContextsRequest,
  GetAssetContextsResponse,
  GetHistoricalFundingRatesRequest,
  GetHistoricalFundingRatesResponse,
  GetTradingIndicatorsRequest,
  GetTradingIndicatorsResponse,
  GetAssetPricePredictionParams,
  GetAssetPricePredictionResponse,
  GetNextFundingRateRequest,
  LodeGetNextFundingRateResponse,
  HyperliquidGetNextFundingRateResponse,
  GetTradingFeeRequest,
  GetTradingFeeResponse,
  GetAssetPriceRequest,
  GetAssetPriceResponse,
  GetCurrentFundingRateRequest,
  GetCurrentFundingRateResponse,
  ExpiriesPerSymbolGetParams,
  ExpiriesPerSymbolGetResponse,
  StrikesPerSymbolGetParams,
  StrikesPerSymbolGetResponse,
  TradableEntitiesGetResponse,
  CurrenciesTradingStatisticsGetResponse,
};

export type InitializeConfig = {
  apiKey: string;
  baseUrl?: string;
  isMcpServerNeeded?: boolean;
  isElizaServerNeeded?: boolean;
};

export class GrixSDK {
  private apiKey: string;
  private baseUrl: string;
  private _mcp: MCPService;
  private _eliza: ElizaService;

  private constructor(config: InitializeConfig) {
    if (!config.apiKey) {
      throw new Error('API key is required when initializing the SDK');
    }
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://internal-api-dev.grix.finance';
    // Initialize services
    if (config.isMcpServerNeeded) {
      this._mcp = createMCPService(this);
    }
    if (config.isElizaServerNeeded) {
      this._eliza = createElizaService(this);
    }
  }

  /**
   * Initialize a new instance of the GrixSDK
   *
   * @param config - Configuration options for the SDK
   * @param config.apiKey - API key for Grix APIs (required)
   * @param config.baseUrl - Base URL for Grix APIs
   * @param config.isMcpServerNeeded - Whether to initialize the MCP service
   * @param config.isElizaServerNeeded - Whether to initialize the Eliza service
   * @returns A new instance of the GrixSDK
   * @throws Error if API key is not provided
   */
  static async initialize(config: InitializeConfig): Promise<GrixSDK> {
    const sdk = new GrixSDK(config);
    // Any async initialization if needed
    return sdk;
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
   * Retrieves available options quotes from multiple markets/protocols
   *
   * @param params - Parameters to filter options by asset, type, and position
   * @returns Available options quotes matching the criteria
   * @throws Error if API key is not provided
   */
  async getOptionsMarketBoard(params: TradeBoardGetParams): Promise<TradeBoardData[]> {
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

  async getPerpsOpenInterestCaps(
    params: GetOpenInterestCapsRequest
  ): Promise<GetOpenInterestCapsResponse> {
    return getOpenInterestCaps(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  async getPerpsAssetContexts(params: GetAssetContextsRequest): Promise<GetAssetContextsResponse> {
    return getAssetContexts(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  async getPerpsHistoricalFundingRates(
    params: GetHistoricalFundingRatesRequest
  ): Promise<GetHistoricalFundingRatesResponse> {
    return getHistoricalFundingRates(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  async getTradingIndicators(
    params: GetTradingIndicatorsRequest
  ): Promise<GetTradingIndicatorsResponse> {
    return getTradingIndicators(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  async getAssetPricePrediction(
    params: GetAssetPricePredictionParams
  ): Promise<GetAssetPricePredictionResponse> {
    return getAssetPricePrediction(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  async getNextFundingRate(
    params: GetNextFundingRateRequest
  ): Promise<LodeGetNextFundingRateResponse | HyperliquidGetNextFundingRateResponse> {
    return getNextFundingRate(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  async getTradingFee(params: GetTradingFeeRequest): Promise<GetTradingFeeResponse[]> {
    return getTradingFee(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  async getAssetPrice(params: GetAssetPriceRequest): Promise<GetAssetPriceResponse> {
    return getAssetPrice(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  async getCurrentFundingRate(
    params: GetCurrentFundingRateRequest
  ): Promise<GetCurrentFundingRateResponse> {
    return getCurrentFundingRate(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  async getPowerTradeExpiriesPerSymbol(
    params: ExpiriesPerSymbolGetParams
  ): Promise<ExpiriesPerSymbolGetResponse> {
    return getExpiriesPerSymbol({ apiKey: this.apiKey, baseUrl: this.baseUrl }, params);
  }

  async getPowerTradeStrikesPerSymbol(
    params: StrikesPerSymbolGetParams
  ): Promise<StrikesPerSymbolGetResponse> {
    return getStrikesPerSymbol({ apiKey: this.apiKey, baseUrl: this.baseUrl }, params);
  }

  async getPowerTradeTradableEntities(): Promise<TradableEntitiesGetResponse> {
    return getTradableEntities({ apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  async getPowerTradeCurrenciesTradingStatistics(): Promise<CurrenciesTradingStatisticsGetResponse> {
    return getCurrenciesTradingStatistics({ apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  public get mcp(): MCPService {
    return this._mcp;
  }

  public get eliza(): ElizaService {
    return this._eliza;
  }
}
