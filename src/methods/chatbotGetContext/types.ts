type OptionBoardData = {
	optionId: number;
	marketName: string;
	strikePrice: string;
	expirationDate: string;
	optionType: string;
	positionType: string;
	priceType: string;
	contractPrice: string;
	asset: string;
};

export type TradeboardData = {
    expirationBoard: string[];
	strikeBoard: { [key: string]: string[] };
	optionBoard: { [key: string]: { [key: string]: OptionBoardData[] } };
};



export type ChatBotGetContextParams = {
  userMessage: string;
  tradeboardOverride?: TradeboardData;
};

export type ChatBotGetContextResponse = {
  systemInstructions: string;
  chatbotContext: { role: string; content: string }[];
  enhancedUserMessage: string;
};