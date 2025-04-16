import { GrixSDK } from 'src/index.js';

export const getAltcoinsOptionsCurrenciesTradingStatisticsMcp = async (
  grixSdkInstance: GrixSDK
) => {
  try {
    const response = await grixSdkInstance.getPowerTradeCurrenciesTradingStatistics();

    if (!response) {
      return {
        content: [
          { type: 'text', text: 'No altcoins options currencies trading statistics available' },
        ],
      };
    }

    const formattedOutput = response
      .map(
        (currency, index) =>
          `Currency ${index + 1}:\n` +
          `  Symbol: ${currency.symbol}\n` +
          `  24h Price Change: ${currency.price_change}\n` +
          `  24h High: ${currency.high_24}\n` +
          `  24h Low: ${currency.low_24}\n` +
          `  Index Price: ${currency.index_price}\n` +
          `  Open Interest: ${currency.open_interest}\n` +
          `  Volume Statistics:\n` +
          `    Total: ${currency.volume}\n` +
          `    Options: ${currency.volume_option}\n` +
          `    Futures: ${currency.volume_future}\n` +
          `    Perpetual: ${currency.volume_perpetual}\n` +
          `    Spot: ${currency.volume_spot}\n`
      )
      .join('\n');

    return {
      content: [{ type: 'text', text: formattedOutput }],
    };
  } catch (error) {
    console.error('Error fetching altcoins options currencies trading statistics:', error);
    throw error;
  }
};
