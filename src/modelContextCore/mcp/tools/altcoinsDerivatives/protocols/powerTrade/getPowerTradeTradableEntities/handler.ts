import { GrixSDK } from 'src/index.js';
import { TradableEntity } from 'src/methods/altcoinsDerivatives/protocols/powerTrade/getTradableEntities/types.js';
export const getPowerTradeTradableEntitiesMcp = async (grixSdkInstance: GrixSDK) => {
  try {
    const response = await grixSdkInstance.getPowerTradeTradableEntities();

    if (!response) {
      return {
        content: [{ type: 'text', text: 'No power trade tradable entities available' }],
      };
    }

    const formattedOutput = response
      .map(
        (entity: TradableEntity, index: number) =>
          `Entity ${index + 1}:\n` +
          `  Symbol: ${entity.symbol}\n` +
          `  Product Type: ${entity.product_type}\n` +
          `  Price Information:\n` +
          `    Last Price: ${entity.last_price ?? 'N/A'}\n` +
          `    24h Price Change: ${entity.price_change ?? 'N/A'}\n` +
          `    24h High: ${entity.high_24 ?? 'N/A'}\n` +
          `    24h Low: ${entity.low_24 ?? 'N/A'}\n` +
          `    Index Price: ${entity.index_price}\n` +
          `  Market Depth:\n` +
          `    Best Bid: ${entity.best_bid ?? 'N/A'}\n` +
          `    Best Ask: ${entity.best_ask ?? 'N/A'}\n` +
          `  Volume Statistics:\n` +
          `    Base Volume: ${entity.base_volume}\n` +
          `    Volume: ${entity.volume}\n` +
          `  Open Interest: ${entity.open_interest}\n`
      )
      .join('\n');

    return {
      content: [{ type: 'text', text: formattedOutput }],
    };
  } catch (error) {
    console.error('Error fetching power trade tradable entities:', error);
    throw error;
  }
};
