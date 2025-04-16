import { GrixSDK } from 'src/index.js';
import { ExpiryDate } from 'src/methods/altcoinsDerivatives/protocols/powerTrade/options/getExpiriesPerSymbol/types.js';
export interface GetAltcoinsOptionsExpiriesPerSymbolMcpArgs {
  symbol: string;
}

export const getAltcoinsOptionsExpiriesPerSymbolMcp = async (
  grixSdkInstance: GrixSDK,
  args: GetAltcoinsOptionsExpiriesPerSymbolMcpArgs
) => {
  try {
    const response = await grixSdkInstance.getPowerTradeExpiriesPerSymbol(args);

    if (!response) {
      return {
        content: [{ type: 'text', text: 'No altcoins options expiries per symbol available' }],
      };
    }

    const formattedOutput =
      `Expiry Dates for ${args.symbol}:\n` +
      response
        .map((expiry: ExpiryDate, index: number) => {
          // Parse YYYYMMDD format
          const year = expiry.expiry.substring(0, 4);
          const month = expiry.expiry.substring(4, 6);
          const day = expiry.expiry.substring(6, 8);
          const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          return `  ${index + 1}. ${date.toLocaleDateString()} (${expiry.expiry})`;
        })
        .join('\n');

    return {
      content: [{ type: 'text', text: formattedOutput }],
    };
  } catch (error) {
    console.error('Error fetching altcoins options expiries per symbol:', error);
    throw error;
  }
};
