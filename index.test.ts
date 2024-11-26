import { GrixSDK } from "./src/index";

describe("GrixSDK Initialization and Chatbot Context Retrieval", () => {
	// Initialize the SDK using the static method

	test("Initialize GrixSDK and retrieve chatbot context", async () => {
		const sdk = await GrixSDK.initialize({});

		const chatbotMessage = await sdk.chatBotGetContext();
		console.log("chatbotMessage", chatbotMessage);
	}, 50000);
});
