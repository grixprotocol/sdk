import { GrixSDK } from 'src/index.js';
import { StrikePrice } from 'src/methods/altcoinsDerivatives/protocols/powerTrade/options/getStrikesPerSymbol/types.js';
export interface GetAltcoinsOptionsStrikesPerSymbolMcpArgs {
  symbol: string;
}

export const getAltcoinsOptionsStrikesPerSymbolMcp = async (
  grixSdkInstance: GrixSDK,
  args: GetAltcoinsOptionsStrikesPerSymbolMcpArgs
) => {
  try {
    const response = await grixSdkInstance.getPowerTradeStrikesPerSymbol(args);

    if (!response) {
      return {
        content: [{ type: 'text', text: 'No power trade strikes per symbol available' }],
      };
    }

    const formattedOutput =
      `Strike Prices for ${args.symbol}:\n` +
      response
        .map(
          (strike: StrikePrice, index: number) =>
            `  ${index + 1}. $${parseFloat(strike.strike).toLocaleString()}`
        )
        .join('\n');

    return {
      content: [{ type: 'text', text: formattedOutput }],
    };
  } catch (error) {
    console.error('Error fetching power trade strikes per symbol:', error);
    throw error;
  }
};
