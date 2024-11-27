import {
	chatbotContextInitHandler,
	createEnhancedUserMessage,
	getSystemInstructions,
} from "./chatbotContextInit/chatbotContextInit";
import { tradeboardData } from "./chatbotContextInit/tradeboardData";
import { OPENAI_API_URL } from "./config";

export type GrixConfig = {
	openAIKey: string; 
};

export class GrixSDK {
	private openAIKey: string;

	private constructor(config: GrixConfig) {
		this.openAIKey = config.openAIKey;
	}

	// Initialize the SDK
	static async initialize(config: GrixConfig): Promise<GrixSDK> {
		return new GrixSDK(config);
	}

	// Fetch the price of a given asset (e.g., Bitcoin)
	async fetchAssetPrice(asset: string): Promise<number> {
		const response = await fetch(
			`https://api.coingecko.com/api/v3/simple/price?ids=${asset.toLowerCase()}&vs_currencies=usd`
		);
		const data = await response.json();
		return data[asset].usd;
	}

	// Get chatbot context, enhanced user message, and system instructions
	async chatBotGetContext(userMessage: string, tradeboardOverride?: any) {
		// Use the override if provided, otherwise fallback to imported tradeboard data
		const tradeboard = tradeboardOverride || tradeboardData;

		// Fetch chatbot context and asset price
		const chatbotContext = await chatbotContextInitHandler();
		const unix = Math.floor(Date.now() / 1000);
		const btcAssetPrice = await this.fetchAssetPrice("bitcoin");

		// Create enhanced user message
		const enhancedUserMessage = createEnhancedUserMessage(
			unix,
			tradeboard,
			btcAssetPrice,
			userMessage
		);

		// Retrieve system instructions
		const systemInstructions = getSystemInstructions();

		// Return the required objects
		return { systemInstructions, chatbotContext, enhancedUserMessage };
	}

	// Send chatbot request to OpenAI's API
	async sendChatbotRequest({
		chatbotContext,
		enhancedUserMessage,
		systemInstructions,
		userContext = [],
	}: {
		chatbotContext: { role: string; content: string }[];
		enhancedUserMessage: string;
		systemInstructions: string;
		userContext?: any[];
	}): Promise<any> {
		// Build the request body
		const requestBody = {
			model: "gpt-4",
			messages: [
				{
					role: "system",
					content: systemInstructions,
				},
				...chatbotContext,
				...(userContext || []),
				{ role: "user", content: enhancedUserMessage },
			],
		};

		// Send the request to OpenAI API
		const response = await fetch(OPENAI_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.openAIKey}`,
			},
			body: JSON.stringify(requestBody),
		});

		if (!response.ok) {
			throw new Error(`Error from OpenAI API: ${response}`);
		}

		const responseData = await response.json();

		const assistantResponse = responseData.choices[0].message.content;
		return assistantResponse;
	}
}
