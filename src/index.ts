import { fetchAssetPrice } from './methods/fetchAssetPrice';
import { chatBotGetContext } from './methods/chatbotGetContext';
import { sendChatbotRequest } from './methods/sendChatbotRequest';
import { SendChatbotRequestParams } from './methods/sendChatbotRequest/types';
import { ChatBotGetContextParams } from './methods/chatbotGetContext/types';
import { ChatBotGetContextResponse } from './methods/chatbotGetContext/types';

export class GrixSDK {
  static async initialize(): Promise<GrixSDK> {
    return new GrixSDK();
  }

  async fetchAssetPrice(asset: string): Promise<number> {
    return fetchAssetPrice(asset);
  }

  async chatBotGetContext(params: ChatBotGetContextParams): Promise<ChatBotGetContextResponse> {
    return chatBotGetContext(params);
  }

  async sendChatbotRequest(params: SendChatbotRequestParams): Promise<string> {
    return sendChatbotRequest(params);
  }
}
