import { fetchAssetPrice } from './methods/fetchAssetPrice';
import { chatBotGetContext } from './methods/chatbotGetContext';
import { sendChatbotRequest } from './methods/sendChatbotRequest';
import { getOptionPrice } from './methods/getOptionPrice';
import { getAssetPriceHistory } from './methods/getAssetPriceHistory';
import { getOptionPriceHistory } from './methods/getOptionPriceHistory';
import { SendChatbotRequestParams } from './methods/sendChatbotRequest/types';
import {
  ChatBotGetContextParams,
  ChatBotGetContextResponse,
} from './methods/chatbotGetContext/types';
import { OptionPriceGetParams, OptionPriceGetResponse } from './methods/getOptionPrice/types';
import {
  AssetPriceHistoryGetParams,
  AssetPriceHistoryGetResponse,
} from './methods/getAssetPriceHistory/types';
import {
  OptionPriceHistoryGetParams,
  OptionPriceHistoryGetResponse,
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
