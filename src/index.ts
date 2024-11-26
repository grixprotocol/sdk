import { chatbotContextInitHandler } from "./chatbotContextInit/chatbotContextInit";

type GrixConfig = {};

export class GrixSDK {
 
	private constructor(config: GrixConfig) {}

	// Initialize the SDK
	static async initialize(config: GrixConfig): Promise<GrixSDK> {
		return new GrixSDK(config);
	}

 
	async chatBotGetContext() {
		const chatbotContext = await chatbotContextInitHandler();
		return chatbotContext;
	}
}
