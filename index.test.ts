import { GrixSDK } from "./src/index";
 describe("GrixSDK Initialization and Chatbot Interactions", () => {
	let sdk: GrixSDK;
	let timeOut = 50000;
	const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ''; // Set this in your AWS Lambda environment variables.


	// Initialize the SDK once for all tests
	beforeAll(async () => {
		sdk = await GrixSDK.initialize({ openAIKey: OPENAI_API_KEY });
	});

 	test(
		"Retrieve chatbot response for a user message",
		async () => {
			// Mock user input
			const userMessage = "What is the best offer for an option I can buy ?";

			// Retrieve chatbot context and enhanced user message
			const { systemInstructions, chatbotContext, enhancedUserMessage } =
				await sdk.chatBotGetContext(userMessage);

			// Send chatbot request
			const response = await sdk.sendChatbotRequest({
				chatbotContext,
				enhancedUserMessage,
				systemInstructions,
				userContext: [],
			});

			// Log the chatbot response for debugging
			console.log("Chatbot Response:", response);
		},
		timeOut
	);
});
