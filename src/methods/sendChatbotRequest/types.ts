export type SendChatbotRequestParams = {
  chatbotContext: { role: string; content: string }[];
  enhancedUserMessage: string;
  systemInstructions: string;
  userContext?: { [key: string]: unknown }[];
  openAIKey: string;
};
