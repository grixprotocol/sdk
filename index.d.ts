declare module "@grixprotocol/sdk" {
	// Configuration type for the SDK
	export type GrixConfig = {};

	// GrixSDK class declaration
	export class GrixSDK {
		// Private constructor to prevent direct instantiation
		private constructor(config: GrixConfig);

		// Static method to initialize the SDK
		static initialize(config: GrixConfig): Promise<GrixSDK>;

		// Method to get chatbot context
		fetchAssetPrice(asset: string): Promise<number>;
		chatBotGetContext(): Promise<string>;
		chatBotGetContext(userMessage: string, tradeboardOverride?: any): Promise<string>;
	}
}
