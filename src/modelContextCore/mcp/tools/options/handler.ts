import { OptionType, PositionType, UnderlyingAsset } from 'src/globals/enums.js';
import { GrixSDK } from 'src/index.js';

export const getOptionsDataMcp = async (
  grixSdkInstance: GrixSDK,
  args: Record<string, unknown>
) => {
  console.error({ grixSdkInstance, args });

  try {
    const asset = (args.asset as string) || 'BTC';
    const optionType = (args.optionType as string) || 'call';
    const positionType = (args.positionType as string) || 'long';
    const protocols = (args.protocols as string[]) || [];
    const limit = (args.limit as number) || 40;
    const offset = (args.offset as number) || 0;

    const response = await grixSdkInstance.getOptionsMarketBoard({
      asset: asset as UnderlyingAsset,
      optionType: optionType as OptionType,
      positionType: positionType as PositionType,
      protocols: protocols,
      limit,
      offset,
    });

    if (!response || response.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'No options data available for the specified parameters.',
          },
        ],
      };
    }

    const formattedOutput = response
      .map(
        (option, index) =>
          `Option ${index + 1}:\n` +
          `  Symbol: ${option.symbol}\n` +
          `  Strike: $${option.strike.toLocaleString()}\n` +
          `  Type: ${option.type}\n` +
          `  Expiry: ${new Date(option.expiry).toLocaleDateString()}\n` +
          `  Protocol: ${option.protocol.toLowerCase()}\n` +
          `  Price: ${option.contractPrice.toFixed(4)}\n` +
          `  Amount: ${option.availableAmount}\n` +
          `  Market: ${option.marketName}\n`
      )
      .join('\n');

    return {
      content: [
        {
          type: 'text',
          text: formattedOutput,
        },
      ],
    };
  } catch (error: unknown) {
    return {
      content: [
        {
          type: 'text',
          text: error instanceof Error ? error.message : 'Unknown error occurred',
        },
      ],
    };
  }
};
