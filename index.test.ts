import { GrixSDK } from "./src/index";

describe("GrixSDK Methods", () => {
	let sdk: GrixSDK;
	const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

	beforeAll(async () => {
		sdk = await GrixSDK.initialize();
	});

	test("fetchAssetPrice should return a number", async () => {
		const assetPrice = await sdk.fetchAssetPrice("bitcoin");
		expect(typeof assetPrice).toBe("number");
	});

	test("chatBotGetContext should return the correct structure", async () => {
		const userMessage = "What is the best offer for an option I can buy ?";
		const context = await sdk.chatBotGetContext({ userMessage });
		
		expect(context).toHaveProperty("systemInstructions");
		expect(context).toHaveProperty("chatbotContext");
		expect(context).toHaveProperty("enhancedUserMessage");
	});

	test("sendChatbotRequest should return a string response", async () => {
		const userMessage = "What is the best offer for an option I can buy ?";
		const { systemInstructions, chatbotContext, enhancedUserMessage } = await sdk.chatBotGetContext({ userMessage });

		const response = await sdk.sendChatbotRequest({
			chatbotContext,
			enhancedUserMessage,
			systemInstructions,
			userContext: [],
			openAIKey: OPENAI_API_KEY,
		});
		
		expect(typeof response).toBe("string");
	});
});
