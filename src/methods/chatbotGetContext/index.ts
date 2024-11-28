import { chatbotContextInitHandler, createEnhancedUserMessage, getSystemInstructions } from "./helpers/chatbotContextInit";
import { tradeboardData } from "./helpers/tradeboardData";
import { fetchAssetPrice } from "../fetchAssetPrice";
import { ChatBotGetContextResponse } from "./types";
import { ChatBotGetContextParams } from "./types";

export async function chatBotGetContext({
  userMessage,
  tradeboardOverride,
}: ChatBotGetContextParams): Promise<ChatBotGetContextResponse> {
  const tradeboard = tradeboardOverride || tradeboardData;
  const chatbotContext = await chatbotContextInitHandler();
  const unix = Math.floor(Date.now() / 1000);
  const btcAssetPrice = await fetchAssetPrice("bitcoin");

  const enhancedUserMessage = createEnhancedUserMessage(
    unix,
    tradeboard,
    btcAssetPrice,
    userMessage
  );

  const systemInstructions = getSystemInstructions();

	return { systemInstructions, chatbotContext, enhancedUserMessage };
}
