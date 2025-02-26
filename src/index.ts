import { fetchAssetPrice } from './methods/fetchAssetPrice';
import { chatBotGetContext } from './methods/chatbotGetContext';
import { sendChatbotRequest } from './methods/sendChatbotRequest';
import { optionPriceGet } from './methods/optionPriceGet';
import { SendChatbotRequestParams } from './methods/sendChatbotRequest/types';
import { ChatBotGetContextParams } from './methods/chatbotGetContext/types';
import { ChatBotGetContextResponse } from './methods/chatbotGetContext/types';
import { OptionPriceGetParams, OptionPriceGetResponse } from './methods/optionPriceGet/types';

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

  async fetchAssetPrice(asset: string): Promise<number> {
    return fetchAssetPrice(asset);
  }

  async optionPriceGet(params: OptionPriceGetParams): Promise<OptionPriceGetResponse> {
    return optionPriceGet(params, { apiKey: this.apiKey, baseUrl: this.baseUrl });
  }

  async chatBotGetContext(params: ChatBotGetContextParams): Promise<ChatBotGetContextResponse> {
    return chatBotGetContext(params);
  }

  async sendChatbotRequest(params: SendChatbotRequestParams): Promise<string> {
    return sendChatbotRequest(params);
  }
}

// Export types for convenience
export {
  OptionPriceGetParams,
  OptionPriceGetResponse,
  PositionType,
} from './methods/optionPriceGet/types';
