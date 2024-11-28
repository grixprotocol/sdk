export type SendChatbotRequestParams = {
  chatbotContext: { role: string; content: string }[];
  enhancedUserMessage: string;
  systemInstructions: string;
  userContext?: any[];
  openAIKey: string;
};
