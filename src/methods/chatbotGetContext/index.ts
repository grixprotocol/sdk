import {
  chatbotContextInitHandler,
  createEnhancedUserMessage,
  getSystemInstructions,
} from './helpers/chatbotContextInit.js';
import { ChatBotGetContextResponse } from './types.js';
import { ChatBotGetContextParams } from './types.js';

export async function chatBotGetContext({
  userMessage,
  marketData,
  underlyingAsset,
  underlyingAssetUsdPrice,
  appPageContext,
}: ChatBotGetContextParams): Promise<ChatBotGetContextResponse> {
  const systemInstructions = getSystemInstructions();
  const chatbotContext = await chatbotContextInitHandler();
  const unix = Math.floor(Date.now() / 1000);

  const enhancedUserMessage = createEnhancedUserMessage(
    unix,
    marketData,
    underlyingAsset,
    underlyingAssetUsdPrice,
    userMessage,
    appPageContext
  );

  return { systemInstructions, chatbotContext, enhancedUserMessage };
}
