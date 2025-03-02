import { fetchAssetPrice } from './methods/fetchAssetPrice';
import { chatBotGetContext } from './methods/chatbotGetContext';
import { sendChatbotRequest } from './methods/sendChatbotRequest';
import { getOptionPrice } from './methods/getOptionPrice';
import { getAssetPriceHistory } from './methods/getAssetPriceHistory';
import { getOptionPriceHistory } from './methods/getOptionPriceHistory';

// Import types needed for class methods
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

// Export types explicitly with the 'type' keyword
export type { SendChatbotRequestParams } from './methods/sendChatbotRequest/types';
export type {
  ChatBotGetContextParams,
  ChatBotGetContextResponse,
} from './methods/chatbotGetContext/types';
export type { OptionPriceGetParams, OptionPriceGetResponse } from './methods/getOptionPrice/types';
export type {
  AssetPriceHistoryGetParams,
  AssetPriceHistoryGetResponse,
} from './methods/getAssetPriceHistory/types';
export type {
  OptionPriceHistoryGetParams,
  OptionPriceHistoryGetResponse,
  Quote,
  BidAskSnapshot,
  ProcessedBidAskSnapshot,
  ProcessedOptionPriceHistory,
} from './methods/getOptionPriceHistory/types';

export type InitializeConfig = {
  apiKey?: string;
  baseUrl?: string;
};

export class GrixSDK {
  private apiKey: string;
  private baseUrl: string;

  private constructor(config?: InitializeConfig) {
    this.apiKey = config?.apiKey || '';
    this.baseUrl = config?.baseUrl || 'https://internal-api-dev.grix.finance';
  }

  static async initialize(config?: InitializeConfig): Promise<GrixSDK> {
    return new GrixSDK(config);
  }

  // Consistent method declarations for all methods
  async fetchAssetPrice(asset: string): Promise<number> {
    return fetchAssetPrice(asset);
  }

  async getOptionPrice(params: OptionPriceGetParams): Promise<OptionPriceGetResponse> {
    return getOptionPrice(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  async getAssetPriceHistory(
    params: AssetPriceHistoryGetParams
  ): Promise<AssetPriceHistoryGetResponse> {
    return getAssetPriceHistory(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  async getOptionPriceHistory(
    params: OptionPriceHistoryGetParams
  ): Promise<OptionPriceHistoryGetResponse> {
    return getOptionPriceHistory(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  async chatBotGetContext(params: ChatBotGetContextParams): Promise<ChatBotGetContextResponse> {
    return chatBotGetContext(params);
  }

  async sendChatbotRequest(params: SendChatbotRequestParams): Promise<string> {
    return sendChatbotRequest(params);
  }
}
