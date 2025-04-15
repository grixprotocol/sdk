import { GetPairsParams, GrixSDK } from 'src/index.js';
import { PerpsPairsProtocol } from './schema.js';

export const getPerpsPairsMcp = async (grixSdkInstance: GrixSDK, args: GetPairsParams) => {
  try {
    validatePerpsPairsArgs(args);

    const { protocol } = args;

    const response = await grixSdkInstance.getPerpsPairs(args);

    if (!response || response.pairs.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'No pairs available for the specified parameters.',
          },
        ],
      };
    }

    let formattedOutput = '';

    if (protocol === PerpsPairsProtocol.HYPERLIQUID) {
      formattedOutput = response.pairs
        .map((pair, index) => `Pair ${index + 1}:\n` + `  Symbol: ${pair}\n`)
        .join('\n');
    } else {
      formattedOutput = `${response.pairs}`;
    }

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

const validatePerpsPairsArgs = (args: GetPairsParams) => {
  const { protocol } = args;

  if (!protocol) {
    throw new Error('Protocol is required parameter.');
  }

  if (!Object.values(PerpsPairsProtocol).includes(protocol as PerpsPairsProtocol)) {
    throw new Error(
      'Invalid protocol. Valid protocols are: ' + Object.values(PerpsPairsProtocol).join(', ')
    );
  }
};
